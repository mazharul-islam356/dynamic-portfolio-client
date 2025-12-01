"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import Header from "./Header";
import DarkVeil from "./FloatingLines";
import GlassButtonDemo from "./GlassButton";

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Load images
    const img1 = "/Screenshot 2025-11-29 132501.png";
    const img2 = "/celtel.png";
    const img3 = "/mks.png";
    const img4 = "/gadcheap.png";
    const img5 = "/applenewtn.png";
    const img6 = "/maxcart.png";

    const textureLoader = new THREE.TextureLoader();
    let textures = [img1, img2, img3, img4, img5, img6, img1, img2, img3, img4, img5, img6,].map((url) =>
      textureLoader.load(url)
    );

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();

    // Geometry
    const geometry = new THREE.PlaneGeometry(2.4, 1.6, 40, 1);

    // Slider setup
    const numVisible = 8;
    const radius = 4.2;
    const arcSpread = 1.4 * Math.PI;
    const angleStep = arcSpread / (numVisible - 1);
    const numMeshes = 30;
    const centerIndex = Math.floor(numMeshes / 3);
    const meshes = [];

    // Create curved meshes
    for (let i = 0; i < numMeshes; i++) {
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: textures[i % 4] },
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
            vec3 curvedPosition = vec3(
              uRadius * s,
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

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas,
      alpha: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Drag mechanics
    const mouse = { prevX: 0, isDown: false };
    let targetX = 0;
    let currentX = 0;
    let ease = 0.075;

    const onDown = (x) => {
      mouse.isDown = true;
      mouse.prevX = x;
    };

    const onUp = () => {
      mouse.isDown = false;
    };

    const onMove = (x) => {
      if (!mouse.isDown) return;
      const delta = x - mouse.prevX;
      targetX += delta * 0.01;
      mouse.prevX = x;
    };

    window.addEventListener("mousedown", (e) => onDown(e.clientX));
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", (e) => onMove(e.clientX));

    window.addEventListener("touchstart", (e) => onDown(e.touches[0].clientX));
    window.addEventListener("touchend", onUp);
    window.addEventListener("touchmove", (e) =>
      onMove(e.touches[0].clientX)
    );

    // Resize
    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    });

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Auto-slide infinite
      if (!mouse.isDown) {
        targetX += 0.005;
        if (targetX > numMeshes) targetX = 0;
      }

      currentX += (targetX - currentX) * ease;

      // Arc positioning
      for (let i = 0; i < meshes.length; i++) {
        const mesh = meshes[i];
        const offset = i - centerIndex + currentX;
        const angle = offset * angleStep;

        if (Math.abs(offset) > numVisible / 2) {
          mesh.visible = false;
          continue;
        }

        mesh.visible = true;

        mesh.position.x = radius * Math.sin(angle);
        mesh.position.z = radius * (1 - Math.cos(angle));
        mesh.lookAt(camera.position.x, 0, camera.position.z);
      }

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden relative">

      {/* HEADER */}
      <div className="absolute top-0 left-0 w-full z-30">
        <Header />
      </div>

      {/* STATIC TOP TEXT */}
      <div className="absolute top-[120px] w-full text-center z-30">
        <h2 className="borel text-white">Hello There —</h2>
        <h2 className="text-white text-4xl font-bold tracking-wide bruno">
          You’ve Entered a Creative Dimension
        </h2>
        <GlassButtonDemo></GlassButtonDemo>
        {/* <p className="text-white text-base poppins text-center mt-3">Welcome to the portfolio of Mazharul Islam — enjoy the experience.</p> */}
      </div>

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <DarkVeil scanlineFrequency={1} scanlineIntensity={0.15} />
      </div>

      {/* SLIDER CANVAS */}
      <canvas ref={canvasRef} className="absolute top-7 inset-0 z-10 webgl" />

      {/* STATIC BOTTOM TEXT */}
      <div className="absolute md:bottom-[100px] bottom-10 w-full text-center z-30">
        <h2 className="text-white text-3xl opacity-90 dm-serif">
        Introducing myself — I am <span className="autowide text-lg">Mazharul Islam</span> <br /> Frontend Developer 
        </h2>
      </div>
    </div>
  );
}
