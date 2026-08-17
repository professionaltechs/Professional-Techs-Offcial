"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface FloatingShapeProps {
  position: [number, number, number];
  color: string;
  geometry: "icosahedron" | "torus" | "sphere" | "octahedron";
  scale?: number;
  speed?: number;
}

export default function FloatingShape({
  position,
  color,
  geometry,
  scale = 1,
  speed = 1,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed;
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.y = t * 0.4;
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.4;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
      {geometry === "torus" && <torusGeometry args={[0.7, 0.28, 32, 100]} />}
      {geometry === "sphere" && <sphereGeometry args={[1, 32, 32]} />}
      {geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
      <MeshDistortMaterial
        color={color}
        speed={2}
        distort={0.25}
        roughness={0.15}
        metalness={0.6}
      />
    </mesh>
  );
}
