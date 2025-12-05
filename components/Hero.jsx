"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import Header from "./Header";
import DarkVeil from "./FloatingLines";
import GlassButtonDemo from "./GlassButton";

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Image list
    const imagePaths = [
      "/Screenshot 2025-11-29 132501.png",
      "/celtel.png",
      "/mks.png",
      "/gadcheap.png",
      "/applenewtn.png",
      "/maxcart.png",
    ];

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const textures = imagePaths.map((url) => textureLoader.load(url));

    const canvas = canvasRef.current;

    // Scene
    const scene = new THREE.Scene();

    // ============================
    // ⭐ RESPONSIVE SETTINGS
    // ============================
    let numVisible;
    let radius;
    let arcSpread;
    let planeWidth;
    let planeHeight;
    let centerScale;

    if (window.innerWidth < 768) {
      // ⭐ MOBILE VERSION
      numVisible = 5;
      radius = 2.8;
      arcSpread = 1.0 * Math.PI;
      planeWidth = 1.9;
      planeHeight = 1.05;
      centerScale = 0.95; // ছোট center image
    } else {
      // ⭐ DESKTOP VERSION
      numVisible = 8;
      radius = 4.6;
      arcSpread = 1.4 * Math.PI;
      planeWidth = 2.5;
      planeHeight = 1.55;
      centerScale = 0.85; // ডেস্কটপেও একটু ছোট center
    }

    // Plane geometry
    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 40, 1);

    // Mesh count
    const numMeshes = 30;
    const centerIndex = Math.floor(numMeshes / 2);

    const meshes = [];

    // Create curved meshes
    for (let i = 0; i < numMeshes; i++) {
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: textures[i % textures.length] },
          uRadius: { value: radius },
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

            // Slight gap fix with multiplier
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
          void main() {
            gl_FragColor = texture2D(uTexture, vUv);
          }
        `,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      meshes.push(mesh);
    }

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Camera
    const camera = new THREE.PerspectiveCamera(
      70,
      sizes.width / sizes.height,
      0.01,
      20
    );
    camera.position.z = 5.5;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    renderer.setClearColor(0x000000, 0);

    // Drag Logic
    let mouseDown = false;
    let prevX = 0;
    let targetX = 0;
    let currentX = 0;
    let ease = 0.075;

    const onMouseDown = (e) => {
      mouseDown = true;
      prevX = e.clientX;
    };

    const onMouseUp = () => (mouseDown = false);

    const onMouseMove = (e) => {
      if (!mouseDown) return;
      targetX += (e.clientX - prevX) * 0.01;
      prevX = e.clientX;
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    const onTouchStart = (e) => {
      mouseDown = true;
      prevX = e.touches[0].clientX;
    };
    const onTouchEnd = () => (mouseDown = false);
    const onTouchMove = (e) => {
      if (!mouseDown) return;
      targetX += (e.touches[0].clientX - prevX) * 0.01;
      prevX = e.touches[0].clientX;
    };

    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchmove", onTouchMove);

    // Resize
    const onResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    };

    window.addEventListener("resize", onResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (!mouseDown) {
        targetX += 0.005;
        if (targetX > numMeshes) targetX = 0;
      }

      currentX += (targetX - currentX) * ease;

      for (let i = 0; i < numMeshes; i++) {
        const mesh = meshes[i];
        const offset = i - centerIndex + currentX;
        const angle = offset * (arcSpread / (numVisible - 1));

        // Only show within visible range
        mesh.visible = Math.abs(offset) <= numVisible / 2;

        if (!mesh.visible) continue;

        mesh.position.x = radius * Math.sin(angle);
        mesh.position.z = radius * (1 - Math.cos(angle));

        // 🔥 CENTER IMAGE SMALLER
        if (Math.abs(offset) < 0.1) {
          mesh.scale.set(1, 1, 1);
        } else {
          mesh.scale.set(1, 1, 1);
        }

        mesh.lookAt(camera.position.x, 0, camera.position.z);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);

      renderer.dispose();
      geometry.dispose();
      meshes.forEach((m) => m.material.dispose());
    };
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full z-30">
        <Header />
      </div>

      <div className="absolute md:top-[120px] top-36 w-full text-center z-30">
        <h2 className="borel md:text-base text-sm text-white">Hello There —</h2>
        <h2 className="text-white xl:text-4xl lg:text-3xl md:text-2xl text-xl font-bold tracking-wide bruno">
          You’ve Entered a Creative Dimension
        </h2>
        <GlassButtonDemo />
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <DarkVeil scanlineFrequency={1} scanlineIntensity={0.15} />
      </div>

      <canvas ref={canvasRef} className="absolute md:top-7 top-10 inset-0 z-10 webgl" />

      <div className="absolute md:bottom-[100px] bottom-32 w-full text-center z-30">
        <h2 className="text-white md:text-3xl text-2xl opacity-90 dm-serif">
          Introducing myself — I am{" "}
          <span className="autowide md:text-lg text-base">Mazharul Islam</span>
          <br /> Frontend Developer
        </h2>
      </div>
    </div>
  );
}
