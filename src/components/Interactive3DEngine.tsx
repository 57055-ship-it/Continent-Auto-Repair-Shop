"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Eye, RotateCcw, Volume2, Cpu, Activity, Play, Pause } from "lucide-react";
import { playSound } from "@/utils/sound";

interface Interactive3DEngineProps {
  audioEnabled: boolean;
}

export default function Interactive3DEngine({ audioEnabled }: Interactive3DEngineProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [rpm, setRpm] = useState<number>(3200);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3, 7);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Engine Block Group
    const engineGroup = new THREE.Group();

    // Main Engine Block Mesh (Box + Metallic material)
    const blockGeo = new THREE.BoxGeometry(2.4, 1.6, 2);
    const blockMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: false,
    });
    const mainBlock = new THREE.Mesh(blockGeo, blockMat);
    engineGroup.add(mainBlock);

    // Cylinders / Pistons
    const cylinderGeo = new THREE.CylinderGeometry(0.35, 0.35, 1.8, 24);
    const pistonMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      metalness: 0.9,
      roughness: 0.1,
    });

    const pistons: THREE.Mesh[] = [];
    const positions = [-0.7, 0.7];
    positions.forEach((xPos) => {
      const cyl = new THREE.Mesh(cylinderGeo, pistonMat);
      cyl.position.set(xPos, 0.2, 0);
      engineGroup.add(cyl);
      pistons.push(cyl);
    });

    // Exhaust Manifold Pipes
    const pipeGeo = new THREE.TorusGeometry(0.6, 0.1, 16, 32, Math.PI);
    const pipeMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      metalness: 0.9,
      roughness: 0.3,
    });
    const manifold1 = new THREE.Mesh(pipeGeo, pipeMat);
    manifold1.rotation.x = Math.PI / 2;
    manifold1.position.set(0, 0.8, 1);
    engineGroup.add(manifold1);

    scene.add(engineGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xef4444, 2);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 2);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // Animation Loop
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (isRotating) {
        engineGroup.rotation.y += 0.008;
      }

      // Animate piston stroke
      pistons.forEach((piston, idx) => {
        piston.position.y = Math.sin(elapsedTime * 6 + idx * Math.PI) * 0.35 + 0.1;
      });

      // Update material wireframe state dynamically
      blockMat.wireframe = wireframe;
      pistonMat.wireframe = wireframe;
      pipeMat.wireframe = wireframe;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [wireframe, isRotating]);

  // Handle RPM rev burst
  const handleRevEngine = () => {
    if (audioEnabled) playSound("rev");
    setRpm(7200);
    setTimeout(() => setRpm(3200), 1500);
  };

  return (
    <section id="3d-viewer" className="py-24 relative bg-slate-950 overflow-hidden border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono-cyber text-cyan-400 tracking-widest uppercase mb-2">
              [ 02 // WEBGL INTERACTIVE CANVAS ]
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-neoclassic font-extrabold text-primary">
              3D Powertrain Telemetry
            </h2>
            <p className="mt-3 text-secondary font-sans-swiss text-sm sm:text-base max-w-xl">
              Rotate, inspect, and toggle wireframe CAD diagnostics of our high-precision engine rebuild standards.
            </p>
          </div>

          {/* Interactive controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setWireframe(!wireframe)}
              className={`px-4 py-2.5 rounded-xl border font-mono-cyber text-xs flex items-center gap-2 transition-all ${
                wireframe
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                  : "glass-panel border-white/10 text-secondary hover:text-white"
              }`}
            >
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>{wireframe ? "Wireframe CAD: ON" : "Wireframe CAD: OFF"}</span>
            </button>

            <button
              onClick={() => setIsRotating(!isRotating)}
              className="px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-secondary hover:text-white font-mono-cyber text-xs flex items-center gap-2"
            >
              {isRotating ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
              <span>{isRotating ? "Pause Orbit" : "Play Orbit"}</span>
            </button>

            <button
              onClick={handleRevEngine}
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono-cyber text-xs font-bold transition-all shadow-lg shadow-red-600/30 flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>REV ENGINE (7,200 RPM)</span>
            </button>
          </div>
        </div>

        {/* 3D Viewport Box */}
        <div className="relative rounded-3xl glass-panel border border-white/15 overflow-hidden h-[450px] sm:h-[500px] bg-slate-900/90 shadow-2xl flex items-center justify-center">
          
          {/* Canvas Mount */}
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Floating Telemetry Overlay (Top Left) */}
          <div className="absolute top-4 left-4 glass-panel p-3.5 rounded-xl border border-white/10 text-xs font-mono-cyber space-y-1.5 backdrop-blur-md bg-black/60">
            <div className="text-muted text-[10px]">DIAGNOSTIC TELEMETRY</div>
            <div className="flex items-center gap-2 text-cyan-400">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>RPM: {rpm} / MIN</span>
            </div>
            <div className="text-secondary">TEMP: 88°C (OPTIMAL)</div>
            <div className="text-emerald-400">COMPRESSION: 10.5:1</div>
          </div>

          {/* Floating Instructions (Bottom Right) */}
          <div className="absolute bottom-4 right-4 glass-panel px-3.5 py-2 rounded-xl border border-white/10 text-[11px] font-mono-cyber text-muted bg-black/60">
            [ DRAG TO ROTATE 360° ENGINE ]
          </div>

        </div>

      </div>
    </section>
  );
}
