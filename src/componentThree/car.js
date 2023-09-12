
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
export function Car(props) {
  const { nodes, materials } = useGLTF("./model/car/scene.glb");
  const meshCar=new MeshStandardMaterial({color:'blue'})
  return (
    <group {...props} dispose={null} scale={0.03} position={[5,0,0]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.car_noname1_large_car_body_mat_0.geometry}
          material={materials.large_car_body_mat}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.car_noname1_large_car_glass_mat_0.geometry}
          material={materials.large_car_glass_mat}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.car_noname1_large_car_wheels_mat_0.geometry}
          material={materials.large_car_wheels_mat}
        />
      </group>
    </group>
  );
}

useGLTF.preload("./model/car/scene.glb");