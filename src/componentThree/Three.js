
import { angleToRadians } from "../utils/angle";
import { PerspectiveCamera, OrbitControls, Environment, useTexture } from '@react-three/drei'
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { MeshStandardMaterial } from "three";
import * as THREE from "three"
import gsap from "gsap"
import { Car } from "./car";
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import pavingStoneImage from './PavingStones092_1K-JPG_Displacement.jpg';

export default function Three() {
    const colorTextures = useLoader(TextureLoader, pavingStoneImage)
    const meshPoll = new MeshStandardMaterial({ color: 'gray', metalness: 0.9, roughness: 0.1 })
    const florMaterial = new THREE.MeshPhongMaterial({ color: 'red', map: colorTextures })
    const enviro = new THREE.MeshBasicMaterial({ color: 'white', side: THREE.BackSide })
    const OrbitControlsRef = useRef(null)
    const ballRef = useRef(null)
    const myMesh = useRef(null)
    useFrame((state) => {
        const { x, y } = state.mouse
        if (!!OrbitControlsRef.current) {
            OrbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45))
            OrbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(90 - 30))
            OrbitControlsRef.current.update()
        }

    })
    useEffect(() => {
        if (OrbitControlsRef.current)
            console.log(OrbitControlsRef)
    }, [OrbitControlsRef.current])
    useEffect(() => {
        if (!!ballRef.current) {
            console.log(ballRef.current)
        }
        //to move ball from left to right
        gsap.to(ballRef.current.position, {
            x: -2,
            duration: 2,
            ease: "power2.out"
        })
        //to move ball from top to down
        gsap.to(ballRef.current.position, {
            y: 1.25,
            duration: 0.75,
            ease: "power2.in"


        })
    }, [ballRef.current])
    const [active, setActive] = useState(false)
    return (
        <>
            {/* /////////////////////////////////////// */}
            <PerspectiveCamera position={[0, 1, 5]} />
            <OrbitControls ref={OrbitControlsRef} minPolarAngle={angleToRadians(60)} maxPolarAngle={angleToRadians(80)} />
            {/* poll */}
            <mesh position={[-2, 2.5, 0]} castShadow ref={ballRef} onPointerDown={(e) => console.log('down')} onClick={(e) => console.log('click')}
            >
                <sphereGeometry args={[1.25, 32, 32]} />
                <primitive object={meshPoll} attach='material' />

            </mesh>
            <Car />
            <mesh scale={active ? 1.5 : 1} onClick={() => setActive(!active)} ref={myMesh}>
                <boxGeometry />
                <meshPhongMaterial color="royalblue" />
            </mesh>


            {/* floor */}
            <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
                <planeGeometry args={[50, 50]} />
                <primitive object={florMaterial} attach='material' />

            </mesh>

            <ambientLight args={['#ffffff', 0.50]} />
            {/* حددنا نوع الضو وكثافته بالارقز وحددنا مكانه بالبوزشن */}

            <spotLight args={['#ffffff', 31, 51, angleToRadians(45), 0.2]} position={[-4, 4, -1]} castShadow />

            {/* Environment */}

            <Environment background>
                <mesh>
                    <sphereGeometry args={[10, 10, 10]} />
                    <primitive object={enviro} attach='material' />
                </mesh>

            </Environment>
            {/* <primitive object={gltf.scene} /> */}

        </>
    )

}
