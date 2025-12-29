"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Float, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

const technologies = [
    { name: "React", color: "#61DAFB" },
    { name: "Next.js", color: "#ffffff" },
    { name: "Python", color: "#3776AB" },
    { name: "Node.js", color: "#339933" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "MongoDB", color: "#47A248" },
    { name: "TensorFlow", color: "#FF6F00" },
    { name: "Docker", color: "#2496ED" },
    { name: "AWS", color: "#FF9900" },
    { name: "Git", color: "#F05032" },
    { name: "SQL", color: "#4479A1" },
    { name: "Pandas", color: "#150458" },
]

function TechLabel({ position, name, color }: { position: [number, number, number]; name: string; color: string }) {
    const ref = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (ref.current) {
            ref.current.lookAt(state.camera.position)
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={ref} position={position}>
                <mesh>
                    <boxGeometry args={[0.1, 0.1, 0.1]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
                </mesh>
                <Text
                    position={[0.2, 0, 0]}
                    fontSize={0.15}
                    color={color}
                    anchorX="left"
                    anchorY="middle"
                    font="/fonts/MonaSans-Variable.woff2"
                >
                    {name}
                </Text>
            </group>
        </Float>
    )
}

function RotatingGlobe() {
    const groupRef = useRef<THREE.Group>(null)
    const sphereRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
        }
    })

    // Position technologies in a sphere
    const positions = useMemo(() => {
        return technologies.map((_, i) => {
            const phi = Math.acos(-1 + (2 * i + 1) / technologies.length)
            const theta = Math.sqrt(technologies.length * Math.PI) * phi
            const radius = 2.5
            return [
                radius * Math.cos(theta) * Math.sin(phi),
                radius * Math.sin(theta) * Math.sin(phi),
                radius * Math.cos(phi),
            ] as [number, number, number]
        })
    }, [])

    return (
        <group ref={groupRef}>
            {/* Core sphere */}
            <mesh ref={sphereRef}>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial
                    color="#c8f550"
                    transparent
                    opacity={0.1}
                    wireframe
                />
            </mesh>

            {/* Inner glow */}
            <mesh>
                <sphereGeometry args={[1.4, 32, 32]} />
                <meshStandardMaterial
                    color="#c8f550"
                    transparent
                    opacity={0.05}
                    emissive="#c8f550"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Connection lines */}
            {positions.map((pos, i) => (
                <line key={`line-${i}`}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={2}
                            array={new Float32Array([0, 0, 0, ...pos])}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color="#c8f550" opacity={0.2} transparent />
                </line>
            ))}

            {/* Tech labels */}
            {technologies.map((tech, i) => (
                <TechLabel
                    key={tech.name}
                    position={positions[i]}
                    name={tech.name}
                    color={tech.color}
                />
            ))}
        </group>
    )
}

export default function TechGlobe() {
    return (
        <div className="w-full h-[500px] md:h-[600px]">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} color="#c8f550" intensity={0.5} />

                <Suspense fallback={null}>
                    <RotatingGlobe />
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>
        </div>
    )
}
