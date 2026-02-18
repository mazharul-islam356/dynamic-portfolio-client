"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export const useCarouselScene = ({
  canvasRef,
  imagePaths,
  isMobile,
  onProgress,
  onLoaded,
}) => {
  const meshesRef = useRef([]);
  const texturesRef = useRef([]);
  const animationRef = useRef(null);
  const rendererRef = useRef(null);
  const geometryRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // ----- Responsive parameters -----
    let numVisible, radius, arcSpread, planeWidth, planeHeight;

    if (isMobile) {
      numVisible = 5;
      radius = 2.8;
      arcSpread = 1.0 * Math.PI;
      planeWidth = 1.9;
      planeHeight = 1.05;
    } else {
      numVisible = 8;
      radius = 4.6;
      arcSpread = 1.4 * Math.PI;
      planeWidth = 2.5;
      planeHeight = 1.55;
    }

    const numMeshes = Math.min(imagePaths.length * 2, 16);
    const centerIndex = Math.floor(numMeshes / 2);
    const widthSegments = isMobile ? 8 : 20;

    // ----- Scene / Camera / Renderer -----
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const camera = new THREE.PerspectiveCamera(
      70,
      sizes.width / sizes.height,
      0.01,
      20,
    );
    camera.position.z = 5.5;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(isMobile ? 1 : 2, window.devicePixelRatio));
    renderer.setClearColor(0x000000, 0);

    rendererRef.current = renderer;

    const geometry = new THREE.PlaneGeometry(
      planeWidth,
      planeHeight,
      widthSegments,
      1,
    );
    geometryRef.current = geometry;

    // ----- Drag / control state -----
    let mouseDown = false;
    let prevX = 0;
    let targetX = 0;
    let currentX = 0;
    const ease = 0.075;

    const onPointerDown = (clientX) => {
      mouseDown = true;
      prevX = clientX;
    };

    const onPointerMove = (clientX) => {
      if (!mouseDown) return;
      targetX -= (clientX - prevX) * 0.01;
      prevX = clientX;
    };

    const onPointerUp = () => {
      mouseDown = false;
    };

    const onMouseDown = (e) => onPointerDown(e.clientX);
    const onMouseMove = (e) => onPointerMove(e.clientX);
    const onMouseUp = () => onPointerUp();

    const onTouchStart = (e) => {
      if (!e.touches[0]) return;
      onPointerDown(e.touches[0].clientX);
    };

    const onTouchMove = (e) => {
      if (!e.touches[0]) return;
      onPointerMove(e.touches[0].clientX);
    };

    const onTouchEnd = () => onPointerUp();

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const onResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    };

    window.addEventListener("resize", onResize);

    const wrap = (v, max) => ((v % max) + max) % max;

    const textureLoader = new THREE.TextureLoader();
    let isInitialized = false;

    const loadTexture = (url, index, total) => {
      return new Promise((resolve) => {
        textureLoader.load(
          url,
          (tex) => {
            try {
              tex.anisotropy = Math.min(
                4,
                renderer.capabilities.getMaxAnisotropy(),
              );
              tex.minFilter = THREE.LinearFilter;
              tex.magFilter = THREE.LinearFilter;
              tex.generateMipmaps = false;

              if (onProgress) {
                onProgress(((index + 1) / total) * 100);
              }

              resolve(tex);
            } catch (err) {
              console.error(`Error processing texture ${url}:`, err);
              resolve(null);
            }
          },
          undefined,
          (err) => {
            console.error(`Failed to load ${url}:`, err);
            resolve(null);
          },
        );
      });
    };

    const initMeshes = (validTextures) => {
      if (!validTextures || validTextures.length === 0) {
        console.error("No valid textures");
        return false;
      }

      meshesRef.current = [];

      for (let i = 0; i < numMeshes; i++) {
        const material = new THREE.ShaderMaterial({
          uniforms: {
            uTexture: { value: validTextures[i % validTextures.length] },
            uRadius: { value: radius },
            uOpacity: { value: 0 },
          },
          vertexShader: `
            varying vec2 vUv;
            uniform float uRadius;
            void main() {
              vUv = uv;
              vec3 p = position;
              float theta = p.x / uRadius;
              float c = cos(theta);
              float s = sin(theta);
              vec3 curvedPosition = vec3(
                (uRadius * s) * 0.985,
                p.y,
                uRadius * (1.0 - c)
              );
              gl_Position = projectionMatrix * modelViewMatrix * vec4(curvedPosition, 1.0);
            }
          `,
          fragmentShader: `
            varying vec2 vUv;
            uniform sampler2D uTexture;
            uniform float uOpacity;
            void main() {
              vec4 tex = texture2D(uTexture, vUv);
              gl_FragColor = vec4(tex.rgb, tex.a * uOpacity);
            }
          `,
          transparent: true,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        meshesRef.current.push(mesh);
      }

      meshesRef.current.forEach((mesh, i) => {
        const delay = i * 50;

        setTimeout(() => {
          const fadeIn = () => {
            const mat = mesh.material;

            if (mat?.uniforms?.uOpacity && mat.uniforms.uOpacity.value < 1) {
              mat.uniforms.uOpacity.value += 0.05;
              requestAnimationFrame(fadeIn);
            }
          };

          fadeIn();
        }, delay);
      });

      return true;
    };

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      if (!isInitialized) return;

      const meshes = meshesRef.current;
      if (!meshes || meshes.length === 0) return;

      if (!mouseDown) {
        targetX -= 0.005;
      }

      currentX += (targetX - currentX) * ease;

      for (let i = 0; i < meshes.length; i++) {
        const mesh = meshes[i];
        if (!mesh) continue;

        const raw = i - currentX;
        const w = wrap(raw + centerIndex, numMeshes) - centerIndex;
        const angle = w * (arcSpread / (numVisible - 1));

        mesh.visible = Math.abs(w) <= numVisible / 2;
        if (!mesh.visible) continue;

        mesh.position.x = radius * Math.sin(angle);
        mesh.position.z = radius * (1 - Math.cos(angle));
        mesh.scale.set(1, 1, 1);
        mesh.lookAt(camera.position.x, 0, camera.position.z);
      }

      renderer.render(scene, camera);
    };

    const init = async () => {
      try {
        const loadedTextures = [];

        for (let i = 0; i < imagePaths.length; i++) {
          const tex = await loadTexture(imagePaths[i], i, imagePaths.length);
          if (tex) loadedTextures.push(tex);
        }

        texturesRef.current = loadedTextures;

        if (loadedTextures.length > 0) {
          isInitialized = initMeshes(loadedTextures);
          if (isInitialized) animate();
        }

        if (onLoaded) {
          setTimeout(onLoaded, 300);
        }
      } catch (e) {
        console.error("Failed to initialize:", e);
        if (onLoaded) onLoaded();
      }
    };

    init();

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);

      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }

      if (geometryRef.current) {
        geometryRef.current.dispose();
        geometryRef.current = null;
      }

      meshesRef.current.forEach((m) => {
        if (m.material && m.material.dispose) {
          m.material.dispose();
        }
      });

      meshesRef.current = [];

      texturesRef.current.forEach((t) => t.dispose());
      texturesRef.current = [];
    };
  }, [canvasRef, imagePaths, isMobile, onProgress, onLoaded]);
};
