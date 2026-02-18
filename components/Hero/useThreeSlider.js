import { useEffect, useRef } from "react";
import * as THREE from "three";
import { IMAGE_PATHS } from "./constants";

export default function useThreeSlider(
  canvasRef,
  isMobile,
  setProgress,
  setLoading,
) {
  const animationRef = useRef();
  const rendererRef = useRef();
  const meshesRef = useRef([]);
  const texturesRef = useRef([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const canvas = canvasRef.current;

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
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // =======================
    // Responsive Config
    // =======================

    const config = isMobile
      ? { visible: 5, radius: 2.8, arc: Math.PI, w: 1.9, h: 1.05 }
      : { visible: 8, radius: 4.6, arc: 1.4 * Math.PI, w: 2.5, h: 1.55 };

    const geometry = new THREE.PlaneGeometry(
      config.w,
      config.h,
      isMobile ? 8 : 20,
      1,
    );

    const numMeshes = Math.min(IMAGE_PATHS.length * 2, 16);
    const centerIndex = Math.floor(numMeshes / 2);
    const arcStep = config.arc / (config.visible - 1);

    // =======================
    // Interaction State
    // =======================

    let mouseDown = false;
    let prevX = 0;
    let targetX = 0;
    let currentX = 0;

    const wrap = (v, max) => ((v % max) + max) % max;

    // =======================
    // Texture Loading
    // =======================

    const loader = new THREE.TextureLoader();

    const loadTextures = async () => {
      const loaded = [];

      for (let i = 0; i < IMAGE_PATHS.length; i++) {
        const texture = await new Promise((resolve) => {
          loader.load(
            IMAGE_PATHS[i],
            (tex) => {
              tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
              tex.generateMipmaps = false;
              setProgress(((i + 1) / IMAGE_PATHS.length) * 100);
              resolve(tex);
            },
            undefined,
            () => resolve(null),
          );
        });

        if (texture) loaded.push(texture);
      }

      texturesRef.current = loaded;
      return loaded;
    };

    // =======================
    // Mesh Creation
    // =======================

    const createMeshes = (textures) => {
      for (let i = 0; i < numMeshes; i++) {
        const material = new THREE.ShaderMaterial({
          uniforms: {
            uTexture: { value: textures[i % textures.length] },
            uRadius: { value: config.radius },
            uOpacity: { value: 0 },
          },
          vertexShader: `
            varying vec2 vUv;
            uniform float uRadius;
            void main(){
              vUv = uv;
              vec3 p = position;
              float theta = p.x / uRadius;
              float c = cos(theta);
              float s = sin(theta);
              vec3 curved = vec3(
                (uRadius * s) * 0.985,
                p.y,
                uRadius * (1.0 - c)
              );
              gl_Position = projectionMatrix * modelViewMatrix * vec4(curved,1.0);
            }
          `,
          fragmentShader: `
            varying vec2 vUv;
            uniform sampler2D uTexture;
            uniform float uOpacity;
            void main(){
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
    };

    // =======================
    // Animation Loop
    // =======================

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (!mouseDown) targetX -= 0.005;
      currentX += (targetX - currentX) * 0.075;

      meshesRef.current.forEach((mesh, i) => {
        const raw = i - currentX;
        const w = wrap(raw + centerIndex, numMeshes) - centerIndex;
        const angle = w * arcStep;

        mesh.visible = Math.abs(w) <= config.visible / 2;
        if (!mesh.visible) return;

        mesh.position.x = config.radius * Math.sin(angle);
        mesh.position.z = config.radius * (1 - Math.cos(angle));
        mesh.lookAt(camera.position);

        // Smooth fade
        mesh.material.uniforms.uOpacity.value = Math.min(
          mesh.material.uniforms.uOpacity.value + 0.02,
          1,
        );
      });

      renderer.render(scene, camera);
    };

    // =======================
    // Events
    // =======================

    const onMove = (x) => {
      targetX -= x * 0.01;
    };

    const mouseMove = (e) => {
      if (!mouseDown) return;
      onMove(e.movementX);
    };

    window.addEventListener("mousedown", () => (mouseDown = true));
    window.addEventListener("mouseup", () => (mouseDown = false));
    window.addEventListener("mousemove", mouseMove);

    const init = async () => {
      const textures = await loadTextures();
      if (!textures.length) return;
      createMeshes(textures);
      animate();
      setTimeout(() => setLoading(false), 400);
    };

    init();

    return () => {
      cancelAnimationFrame(animationRef.current);
      renderer.dispose();
      geometry.dispose();
      meshesRef.current.forEach((m) => m.material.dispose());
      texturesRef.current.forEach((t) => t.dispose());
    };
  }, [isMobile]);
}
