"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Header from "../Header";
import LoadingScreen from "../Loader";
import GlassButtonDemo from "../GlassButton";
import DarkVeil from "../DarkVeil";

export default function Home() {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [darkVeilReady, setDarkVeilReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Use refs to store mutable values
  const meshesRef = useRef([]);
  const texturesRef = useRef([]);
  const animationRef = useRef(null);
  const rendererRef = useRef(null);
  const geometryRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const imagePaths = [
      "/celtel.png",
      "/mks.png",
      "/taibamart-home.png",
      "/gadcheap.png",
      "/applenewtn.png",
      "/maxcart.png",
      "/voterkotha-home.png",
      "/saki-home.png",
    ];

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();

    // Responsive settings
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

    const geometry = new THREE.PlaneGeometry(
      planeWidth,
      planeHeight,
      widthSegments,
      1,
    );
    geometryRef.current = geometry;

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

    // Drag controls
    let mouseDown = false;
    let prevX = 0;
    let targetX = 0;
    let currentX = 0;
    const ease = 0.075;

    const onMouseDown = (e) => {
      mouseDown = true;
      prevX = e.clientX;
    };
    const onMouseUp = () => {
      mouseDown = false;
    };
    const onMouseMove = (e) => {
      if (!mouseDown) return;
      targetX -= (e.clientX - prevX) * 0.01;
      prevX = e.clientX;
    };
    const onTouchStart = (e) => {
      mouseDown = true;
      prevX = e.touches[0].clientX;
    };
    const onTouchEnd = () => {
      mouseDown = false;
    };
    const onTouchMove = (e) => {
      if (!mouseDown) return;
      targetX -= (e.touches[0].clientX - prevX) * 0.01;
      prevX = e.touches[0].clientX;
    };

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

    let isInitialized = false;
    const textureLoader = new THREE.TextureLoader();

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
              setLoadProgress(((index + 1) / total) * 100);
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

      // Fade in animation using for loop
      for (let i = 0; i < meshesRef.current.length; i++) {
        const mesh = meshesRef.current[i];
        if (!mesh || !mesh.material || !mesh.material.uniforms) continue;

        ((m, delay) => {
          setTimeout(() => {
            const fadeIn = () => {
              if (
                m &&
                m.material &&
                m.material.uniforms &&
                m.material.uniforms.uOpacity &&
                m.material.uniforms.uOpacity.value < 1
              ) {
                m.material.uniforms.uOpacity.value += 0.05;
                requestAnimationFrame(fadeIn);
              }
            };
            fadeIn();
          }, delay);
        })(mesh, i * 50);
      }

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
          if (tex) {
            loadedTextures.push(tex);
          }
        }

        texturesRef.current = loadedTextures;

        if (loadedTextures.length > 0) {
          isInitialized = initMeshes(loadedTextures);
          if (isInitialized) {
            animate();
          }
        }

        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (e) {
        console.error("Failed to initialize:", e);
        setIsLoading(false);
      }
    };

    init();

    // Cleanup function
    return () => {
      // Cancel animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      // Remove event listeners
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);

      // Dispose renderer
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }

      // Dispose geometry
      if (geometryRef.current) {
        geometryRef.current.dispose();
        geometryRef.current = null;
      }

      // Dispose meshes using for loop
      const meshes = meshesRef.current;
      if (meshes && meshes.length > 0) {
        for (let i = 0; i < meshes.length; i++) {
          const m = meshes[i];
          if (m && m.material && typeof m.material.dispose === "function") {
            m.material.dispose();
          }
        }
      }
      meshesRef.current = [];

      // Dispose textures using for loop
      const textures = texturesRef.current;
      if (textures && textures.length > 0) {
        for (let i = 0; i < textures.length; i++) {
          const t = textures[i];
          if (t && typeof t.dispose === "function") {
            t.dispose();
          }
        }
      }
      texturesRef.current = [];
    };
  }, [isMobile]);

  // Delay DarkVeil
  useEffect(() => {
    const timer = setTimeout(() => {
      setDarkVeilReady(true);
    });
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-[90vh] overflow-hidden relative">
      {isLoading && <LoadingScreen progress={loadProgress} />}

      <div className="absolute top-0 left-0 w-full z-30">
        <Header />
      </div>

      <div className="absolute md:top-36 top-40 w-full text-center md:z-30 z-10">
        <h2 className="borel md:text-base text-sm text-white">Hello There —</h2>
        <h2 className="text-white xl:text-4xl lg:text-3xl md:text-2xl text-xl font-bold tracking-wide bruno">
          You've Entered a Creative Dimension
        </h2>
        <GlassButtonDemo />
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none bg-gray-900"></div>

      {darkVeilReady && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <DarkVeil scanlineFrequency={5} scanlineIntensity={0.2} />
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="absolute md:top-14 top-10 inset-0 z-10 webgl"
      />

      <div className="absolute md:bottom-10 bottom-20 w-full text-center md:z-30 z-10">
        <h2 className="text-white md:text-3xl text-2xl opacity-90 dm-serif">
          Introducing myself — I am{" "}
          <span className="autowide md:text-lg text-base">Mazharul Islam</span>
          <br /> Frontend Developer
        </h2>
      </div>
    </div>
  );
}
