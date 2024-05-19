// @ts-nocheck

import * as THREE from "three";
import vertexShader from "../shaders/blob/vertex.glsl";
import fragmentShader from "../shaders/blob/fragment.glsl";
import CustomShaderMaterial from "three-custom-shader-material";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
const Blob = () => {
  const blob = useRef();
  const blobMat = useRef();
  console.log(blob);

  const uniforms = useMemo(() => ({
    uTime: {
      value: 0,
    },
    uTimeFrequency: {
      value: 0.4,
    },
    uStrength: {
      value: 0.3,
    },
    uPositionFrequency: {
      value: 0.5,
    },
    uWarpPositionFrequency: {
      value: 1,
    },
    uWarpTimeFrequency: {
      value: 0.6,
    },
    uWarpStrength: {
      value: 0.25,
    },
  }));

  useFrame((state, delta) => {
    blobMat.current.uniforms.uTime.value += delta;
  });
  return (
    <>
      <mesh ref={blob} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1, 32]} computeTangents={true} />

        <CustomShaderMaterial
          ref={blobMat}
          baseMaterial={THREE.MeshPhysicalMaterial}
          vertexShader={vertexShader}
          //   fragmentShader={fragmentShader}
          silent
          color={0xffffff}
          uniforms={uniforms}
          metalness={0.2}
          roughness={0}
          ior={1.5}
        />
      </mesh>
    </>
  );
};

export default Blob;
