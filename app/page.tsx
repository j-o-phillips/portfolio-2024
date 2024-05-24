"use client";

import { Canvas } from "@react-three/fiber";

import Blob from "./components/Blob";
import { Environment, OrbitControls } from "@react-three/drei";
import LandingOverlay from "./components/LandingOverlay";

export default function Home() {
  return (
    <>
      <div className="h-screen">
        <LandingOverlay />
        <Canvas
          camera={{
            position: [0, 0, 7],
            fov: 35,
            near: 0.1,
            far: 100,
          }}
        >
          <ambientLight intensity={1} />
          <directionalLight
            position={[0, 1, 2]}
            castShadow
            shadow-mapSize={[1024, 1024]}
            intensity={2}
            shadow-camera-far={15}
            shadow-normalBias={0.05}
          />
          <Environment files="/quarry.hdr" />
          <OrbitControls />

          <Blob />
        </Canvas>
      </div>
    </>
  );
}
