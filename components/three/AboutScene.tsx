"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import FloatingShape from "./FloatingShape";

export default function AboutScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#22D3EE" />

        <FloatingShape position={[3.2, 0.8, -1]} color="#7C3AED" geometry="torus" scale={0.9} speed={0.9} />
        <FloatingShape position={[-3, -0.6, -1.5]} color="#4F5DFF" geometry="icosahedron" scale={0.7} speed={0.7} />
        <FloatingShape position={[2, -1.4, -2]} color="#22D3EE" geometry="octahedron" scale={0.5} speed={1.1} />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
