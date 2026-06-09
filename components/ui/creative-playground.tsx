"use client"

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Sphere, Float, Stars, Environment, TorusKnot } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedShape() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
        }
    })

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            {/* Core liquid sphere */}
            <Sphere args={[1.2, 64, 64]}>
                <MeshDistortMaterial 
                    color="#c8f550" 
                    attach="material" 
                    distort={0.4} 
                    speed={2} 
                    roughness={0.1}
                    metalness={0.8}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </Sphere>
            
            {/* Outer wireframe TorusKnot for technical aesthetic */}
            <TorusKnot ref={meshRef} args={[1.8, 0.1, 128, 16]} position={[0, 0, 0]}>
                <meshStandardMaterial 
                    color="#60a5fa" 
                    wireframe 
                    transparent 
                    opacity={0.3}
                    roughness={0.2}
                    metalness={1}
                />
            </TorusKnot>
        </Float>
    )
}

export function CreativePlayground() {
    return (
        <div className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
                <directionalLight position={[-10, 10, -10]} intensity={1} color="#c8f550" />
                <directionalLight position={[0, -10, 0]} intensity={0.5} color="#60a5fa" />
                
                <AnimatedShape />
                
                {/* Immersive space background */}
                <Stars radius={15} depth={50} count={3000} factor={4} saturation={0} fade speed={1.5} />
                
                {/* Controls */}
                <OrbitControls 
                    enableZoom={false} 
                    enablePan={false} 
                    autoRotate 
                    autoRotateSpeed={1.5}
                    rotateSpeed={0.8}
                    makeDefault
                />
                
                <Environment preset="city" />
            </Canvas>
        </div>
    )
}
