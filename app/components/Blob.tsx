// @ts-nocheck

import * as THREE from "three";
import vertexShader from "../shaders/blob/vertex.glsl";
import fragmentShader from "../shaders/blob/fragment.glsl";
import CustomShaderMaterial from "three-custom-shader-material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
const Blob = () => {
  const blob = useRef();
  const blobMat = useRef();
  const blobGeometry = useRef();

  let hoverActive = false;
  let channelOne = 0;

  useEffect(() => {
    blobGeometry.current = mergeVertices(blobGeometry.current);
    blobGeometry.current.computeTangents();
    console.log(blobGeometry);
  }, []);

  const onHover = () => {
    hoverActive = true;
    console.log(hoverActive);
  };

  const onLeave = () => {
    hoverActive = false;
    console.log(hoverActive);
  };

  const uniforms = useMemo(
    () => ({
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
        value: 1.5,
      },
      uWarpTimeFrequency: {
        value: 0.6,
      },
      uWarpStrength: {
        value: 0.25,
      },
      uColorChannelOne: {
        value: 1.0,
      },
      uMousePosition: {
        value: new THREE.Vector2(0, 0),
      },
    }),
    []
  );

  useFrame((state, delta) => {
    blobMat.current.uniforms.uTime.value += delta;
    blobMat.current.uniforms.uMousePosition.value.x = state.mouse.x;
    blobMat.current.uniforms.uMousePosition.value.y = state.mouse.y;

    if (hoverActive && blobMat.current.uniforms.uColorChannelOne.value > 0) {
      blobMat.current.uniforms.uColorChannelOne.value -= 0.005;
    }

    if (!hoverActive && blobMat.current.uniforms.uColorChannelOne.value < 1) {
      blobMat.current.uniforms.uColorChannelOne.value += 0.005;
    }
  });

  return (
    <>
      <mesh
        ref={blob}
        position={[0, 0, 0]}
        onPointerEnter={onHover}
        onPointerLeave={onLeave}
        receiveShadow
        castShadow
      >
        <icosahedronGeometry args={[1, 32]} ref={blobGeometry} />

        <CustomShaderMaterial
          ref={blobMat}
          baseMaterial={THREE.MeshPhysicalMaterial}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          silent
          uniforms={uniforms}
          metalness={0.2}
          roughness={0}
          ior={1.5}
          flatShading={true}
        />
      </mesh>
    </>
  );
};

export default Blob;
