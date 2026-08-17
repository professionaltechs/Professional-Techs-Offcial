"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import FloatingShape from "./FloatingShape";

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#22D3EE" />

        <FloatingShape position={[-2.6, 0.6, 0]} color="#4F5DFF" geometry="icosahedron" scale={1.1} speed={0.8} />
        <FloatingShape position={[2.8, -0.4, -1]} color="#7C3AED" geometry="torus" scale={1} speed={1} />
        <FloatingShape position={[0.6, 1.6, -2]} color="#22D3EE" geometry="octahedron" scale={0.7} speed={1.2} />
        <FloatingShape position={[-1.2, -1.6, -1.5]} color="#4F5DFF" geometry="sphere" scale={0.5} speed={0.6} />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
