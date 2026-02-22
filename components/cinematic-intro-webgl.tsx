"use client"

import { useEffect, useState, Suspense, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, PresentationControls, RoundedBox, Html, Sparkles, Stars } from "@react-three/drei"
import * as THREE from "three"
import { Fingerprint, Lock, Unlock, ChevronRight } from "lucide-react"
import { Globe } from "./globe"

// ─── CAMERA CONTROLLER ──────────────────────────────────────────────────
function CameraController({ phase }: { phase: string }) {
    const vec = new THREE.Vector3()
    const target = new THREE.Vector3(0, 1.05, -1.05)

    useFrame((state) => {
        const camera = state.camera as THREE.PerspectiveCamera
        const t = state.clock.getElapsedTime()

        if (phase === "loading" || phase === "intro") {
            camera.position.lerp(vec.set(Math.sin(t * 0.4) * 5, 1.8 + Math.sin(t * 0.15) * 0.3, Math.cos(t * 0.4) * 5), 0.04)
            camera.lookAt(0, 0.2, 0)
        } else if (phase === "lidOpening" || phase === "booting" || phase === "ready") {
            camera.position.lerp(vec.set(0, 1.0, 4.8), 0.025)
            camera.lookAt(0, 0.5, 0)
            camera.fov = THREE.MathUtils.lerp(camera.fov, 40, 0.03)
            camera.updateProjectionMatrix()
        } else if (phase === "diving") {
            camera.position.lerp(vec.set(0, 1.05, -0.2), 0.04)
            camera.lookAt(target)
        }
    })

    return null
}

// ─── AMBIENT RING — single, elegant, slow ───────────────────────────────
function AmbientRing() {
    const ref = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.getElapsedTime()
            ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.1) * 0.05
            ref.current.rotation.z = t * 0.02
        }
    })

    return (
        <mesh ref={ref as any} position={[0, 0, -1.5]}>
            <torusGeometry args={[6, 0.008, 16, 64]} />
            <meshBasicMaterial color="#4f46e5" transparent opacity={0.12} />
        </mesh>
    )
}

// ─── MACBOOK COMPONENT ──────────────────────────────────────────────────
function Macbook({ phase, onUnlock }: { phase: "loading" | "intro" | "lidOpening" | "booting" | "ready" | "diving", onUnlock: () => void }) {
    const lidRef = useRef<THREE.Group>(null)
    const isOpen = phase !== "loading" && phase !== "intro"
    const targetLidRotation = isOpen ? Math.PI * 0.15 : Math.PI
    const [unlocked, setUnlocked] = useState(false)

    const handleBiometricClick = () => {
        if (phase !== "ready" || unlocked) return
        setUnlocked(true)
        setTimeout(() => { onUnlock() }, 1000)
    }

    useFrame(() => {
        if (lidRef.current) {
            lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, targetLidRotation, 0.06)
        }
    })

    const chassisMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#3a3a3c", roughness: 0.18, metalness: 0.85 }), [])
    const screenBezelMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#0a0a0a", roughness: 0.05, metalness: 0.9 }), [])
    const keyboardBaseMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1e1e20", roughness: 0.55, metalness: 0.3 }), [])
    const trackpadMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2a2a2c", roughness: 0.12, metalness: 0.75 }), [])

    return (
        <group position={[0, -0.5, 0]}>
            {/* ─── BASE CHASSIS ─── */}
            <group>
                <RoundedBox args={[3.2, 0.1, 2.2]} radius={0.05} smoothness={2} material={chassisMaterial} />
                <mesh position={[0, 0.051, -0.3]}>
                    <boxGeometry args={[2.8, 0.01, 1.1]} />
                    <primitive object={keyboardBaseMaterial} attach="material" />
                </mesh>
                <mesh position={[0, 0.052, 0.6]}>
                    <planeGeometry args={[1.1, 0.6]} />
                    <primitive object={trackpadMaterial} attach="material" />
                </mesh>
            </group>

            {/* ─── SCREEN LID ─── */}
            <group ref={lidRef as any} position={[0, 0.05, -1.05]} rotation-x={Math.PI}>
                <group position={[0, 1.05, 0]} rotation-x={-Math.PI / 2}>
                    <RoundedBox args={[3.2, 0.08, 2.2]} radius={0.05} smoothness={2} material={chassisMaterial} />
                    <mesh position={[0, 0.041, 0]}>
                        <boxGeometry args={[3.1, 0.01, 2.1]} />
                        <primitive object={screenBezelMaterial} attach="material" />
                    </mesh>

                    {/* Screen display — shows a subtle gradient when ready */}
                    <mesh position={[0, 0.047, 0]}>
                        <planeGeometry args={[3.0, 2.0]} />
                        <meshBasicMaterial
                            color={phase === "diving" ? "#ffffff" : (phase === "ready" ? "#050508" : "#000000")}
                            transparent opacity={1}
                        />
                    </mesh>

                    {/* Faint screen-glow on the display when ready */}
                    {(phase === "ready" || phase === "booting") && (
                        <pointLight position={[0, 0.25, 0]} color="#6366f1" intensity={0.6} distance={2.5} decay={2} />
                    )}
                </group>
            </group>

            {/* ─── FLOATING BIOMETRIC CARD ─── */}
            {(phase === "booting" || phase === "ready" || phase === "diving") && (
                <Html
                    transform
                    center
                    distanceFactor={1.17}
                    position={[0, 1.25, -0.6]}
                    rotation={[-0.12, 0, 0]}
                >
                    <motion.div
                        className={`relative w-[320px] h-[420px] rounded-[28px] border border-white/[0.08] flex flex-col overflow-hidden cursor-pointer group z-10 transition-all duration-[1200ms]
                            ${phase === "diving" ? "scale-[25] opacity-0" : "scale-100 opacity-100"}
                        `}
                        style={{
                            background: "linear-gradient(145deg, rgba(18,18,28,0.95) 0%, rgba(12,12,18,0.98) 100%)",
                            boxShadow: unlocked
                                ? "0 0 80px rgba(16,185,129,0.2), 0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
                                : "0 0 80px rgba(99,102,241,0.12), 0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
                        }}
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{
                            opacity: phase === "ready" || phase === "diving" ? 1 : 0,
                            scale: phase === "diving" ? 25 : 1,
                            y: phase === "ready" || phase === "diving" ? 0 : 30,
                        }}
                        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                        onClick={handleBiometricClick}
                    >
                        <div className="h-full w-full p-7 flex flex-col justify-between relative z-20">
                            {/* Header */}
                            <div className="flex justify-between items-start">
                                <div className="space-y-0.5 text-left">
                                    <h3 className="text-white/30 text-[10px] font-medium uppercase tracking-[0.25em]">Security Level</h3>
                                    <p className="text-white/90 font-semibold text-xl tracking-tight">Class A</p>
                                </div>
                                <div className={`p-2.5 rounded-2xl border transition-all duration-700 ${unlocked ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/[0.03] border-white/[0.06] text-white/25 group-hover:text-white/40 group-hover:border-white/10'}`}>
                                    {unlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                                </div>
                            </div>

                            {/* Central Fingerprint */}
                            <div className="flex-1 flex items-center justify-center relative">
                                {/* Soft radial glow behind fingerprint */}
                                <div className={`absolute w-32 h-32 rounded-full transition-all duration-1000 ${unlocked ? 'bg-emerald-500/10 blur-[40px]' : 'bg-indigo-500/5 blur-[50px] group-hover:bg-indigo-500/10'}`} />
                                <Fingerprint
                                    className={`w-28 h-28 transition-all duration-700 relative z-10 ${unlocked
                                        ? 'text-emerald-400 scale-105 drop-shadow-[0_0_20px_rgba(16,185,129,0.6)]'
                                        : 'text-indigo-400/50 group-hover:text-indigo-300/70 group-hover:scale-[1.03] drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                                        }`}
                                    strokeWidth={1}
                                />
                                {/* Scan line */}
                                {!unlocked && (
                                    <motion.div
                                        className="absolute w-32 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent"
                                        animate={{ y: [-50, 50, -50] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                )}
                            </div>

                            {/* Footer */}
                            <div className="space-y-5">
                                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white/20 text-[9px] tracking-[0.3em] uppercase font-medium">Biometric</p>
                                        <p className={`text-[15px] font-medium mt-0.5 tracking-tight transition-colors duration-700 ${unlocked ? 'text-emerald-400' : 'text-white/70'}`}>
                                            {unlocked ? "Access Granted" : "Touch to Authorize"}
                                        </p>
                                    </div>
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-700 ${unlocked
                                        ? 'bg-emerald-500/15 border-emerald-500/30'
                                        : 'bg-white/[0.02] border-white/[0.06] group-hover:bg-white/[0.04] group-hover:border-white/10'
                                        }`}>
                                        <ChevronRight className={`w-4 h-4 transition-colors duration-700 ${unlocked ? 'text-emerald-400' : 'text-white/25 group-hover:text-white/40'}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </Html>
            )}
        </group>
    )
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────
export default function CinematicIntro3D({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<"loading" | "intro" | "lidOpening" | "booting" | "ready" | "diving">("loading")

    useEffect(() => {
        const runSequence = async () => {
            await new Promise((r) => setTimeout(r, 1200))
            setPhase("intro")
            await new Promise((r) => setTimeout(r, 2000))
            setPhase("lidOpening")
            await new Promise((r) => setTimeout(r, 1500))
            setPhase("booting")
            await new Promise((r) => setTimeout(r, 1000))
            setPhase("ready")
        }
        runSequence()
    }, [])

    const handleEnter = () => {
        setPhase("diving")
        setTimeout(() => { onComplete() }, 1500)
    }

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[100] bg-[#06060a] overflow-hidden font-sans antialiased text-white"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 1 } }}
            >
                {/* Globe — visible but not dominant */}
                <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.22] pointer-events-none">
                    <Globe className="w-full h-full max-w-[1200px]" />
                </div>

                {/* Subtle radial gradient vignette */}
                <div className="absolute inset-0 z-[1] pointer-events-none" style={{
                    // @ts-ignore
                    background: "radial-gradient(ellipse at 50% 40%, transparent 40%, rgba(6,6,10,0.6) 75%, rgba(6,6,10,0.95) 100%)"
                }} />

                {/* 3D Canvas */}
                <motion.div
                    className="absolute inset-0 z-[2]"
                    animate={{ opacity: phase === "diving" ? 0 : 1 }}
                    transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                >
                    <Canvas camera={{ position: [0, 0, 7], fov: 35 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
                        <CameraController phase={phase} />
                        <Suspense fallback={null}>
                            {/* Lighting — soft, natural, product-photography style */}
                            <Environment preset="studio" />
                            <ambientLight intensity={0.25} color="#e2e8f0" />

                            {/* Hero key light — cool indigo from upper-left */}
                            <spotLight
                                position={[-5, 8, 5]}
                                angle={0.3}
                                penumbra={1}
                                intensity={3}
                                color="#e2e8f0"
                            />
                            {/* Subtle fill from right */}
                            <spotLight
                                position={[5, 5, 4]}
                                angle={0.4}
                                penumbra={1}
                                intensity={1.5}
                                color="#c7d2fe"
                            />
                            {/* Rim/back light — gives the laptop a cinematic edge glow */}
                            <spotLight
                                position={[0, 3, -5]}
                                angle={0.5}
                                penumbra={0.8}
                                intensity={2}
                                color="#818cf8"
                            />

                            {/* Star field — enough for depth */}
                            <Stars radius={120} depth={60} count={2500} factor={3} saturation={0.2} fade speed={0.5} />

                            {/* Ambient dust particles */}
                            <Sparkles count={250} scale={22} size={1} speed={0.12} opacity={0.15} color="#a5b4fc" />
                            <Sparkles count={100} scale={15} size={0.5} speed={0.2} opacity={0.1} color="#e2e8f0" />

                            {/* Single elegant ambient ring — like a gravitational orbit */}
                            <AmbientRing />

                            {/* The Main Stage */}
                            <PresentationControls
                                global
                                enabled={phase === "ready"}
                                rotation={[0, 0, 0]}
                                polar={[-0.08, 0.08]}
                                azimuth={[-0.15, 0.15]}
                            >
                                <Float rotationIntensity={0.1} floatIntensity={0.2} speed={1.2}>
                                    <Macbook phase={phase} onUnlock={handleEnter} />

                                    {/* Pedestal */}
                                    <mesh position={[0, -0.62, 0]}>
                                        <cylinderGeometry args={[2.2, 2.8, 0.05, 32]} />
                                        <meshStandardMaterial color="#0e0e14" roughness={0.12} metalness={0.9} />
                                    </mesh>
                                    {/* Inner glow ring */}
                                    <mesh position={[0, -0.58, 0]} rotation={[Math.PI / 2, 0, 0]}>
                                        <ringGeometry args={[2.15, 2.2, 64]} />
                                        <meshBasicMaterial color="#6366f1" transparent opacity={0.15} />
                                    </mesh>
                                    {/* Outer edge ring */}
                                    <mesh position={[0, -0.64, 0]} rotation={[Math.PI / 2, 0, 0]}>
                                        <ringGeometry args={[2.75, 2.8, 64]} />
                                        <meshBasicMaterial color="#4f46e5" transparent opacity={0.12} />
                                    </mesh>
                                </Float>
                            </PresentationControls>
                        </Suspense>
                    </Canvas>
                </motion.div>

                {/* ─── CINEMATIC FLASH ─── */}
                <motion.div
                    className="absolute inset-0 bg-white pointer-events-none z-[110]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase === "diving" ? 1 : 0 }}
                    transition={{ delay: 0.7, duration: 0.8, ease: "easeIn" }}
                />

                {/* ─── HUD — whisper-quiet metadata ─── */}
                <motion.div
                    className="absolute top-8 left-8 z-30 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase === "ready" ? 1 : 0 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                >
                    <div className="flex items-center gap-2 font-mono text-[8px] text-white/15 tracking-[0.4em] uppercase">
                        <div className="w-[3px] h-[3px] rounded-full bg-indigo-500/60" />
                        Secure Session
                    </div>
                </motion.div>

                <motion.div
                    className="absolute bottom-8 left-8 z-30 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase === "ready" ? 1 : 0 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                >
                    <p className="font-mono text-[7px] text-white/10 tracking-[0.3em]">ANAMAY // PORTFOLIO v2.0</p>
                </motion.div>

                <motion.div
                    className="absolute bottom-8 right-8 z-30 pointer-events-none text-right"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase === "ready" ? 1 : 0 }}
                    transition={{ duration: 1.5, delay: 1.0 }}
                >
                    <p className="font-mono text-[7px] text-white/10 tracking-[0.3em]">28.6139°N 77.2090°E</p>
                </motion.div>

                {/* ─── INTRO TEXT ─── */}
                <motion.div
                    className="absolute bottom-[18%] left-1/2 -translate-x-1/2 text-center z-30 pointer-events-none"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: phase === "intro" ? 1 : 0, y: phase === "intro" ? 0 : 15 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="font-brier text-2xl md:text-4xl uppercase tracking-[0.4em] text-white/80 mb-3">Anamay</h1>
                    <p className="font-sans font-light text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/20">Portfolio Experience</p>
                </motion.div>

                {/* Skip Button */}
                <button
                    onClick={onComplete}
                    className="absolute top-8 right-8 z-50 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.3em] text-white/15 hover:text-white/50 transition-colors duration-500"
                >
                    Skip Intro
                </button>
            </motion.div>
        </AnimatePresence>
    )
}
