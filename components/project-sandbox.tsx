"use client"

import React, { useState, useEffect, useRef } from "react"
import { 
  Zap, Play, Plus, Terminal, Sliders, Cpu, Layers, 
  ShieldAlert, Sparkles, RefreshCw, Flame, Check, Globe 
} from "lucide-react"

interface ProjectSandboxProps {
  projectId: string
}

export default function ProjectSandbox({ projectId }: ProjectSandboxProps) {
  switch (projectId) {
    case "01":
      return <CrimeConnectSandbox />
    case "02":
      return <SmartMaps3DSandbox />
    case "03":
      return <HackOpsTerminalSandbox />
    case "04":
      return <VARtificialPredictorSandbox />
    default:
      return null
  }
}

// ==========================================
// 1. Crime Connect Sandbox: Graph Centrality
// ==========================================
interface GraphNode {
  id: string
  label: string
  type: "suspect" | "agent" | "transaction" | "ip" | "target"
  x: number
  y: number
  centrality: number
  pulse?: boolean
}

interface GraphLink {
  source: string
  target: string
}

function CrimeConnectSandbox() {
  const [nodes, setNodes] = useState<GraphNode[]>([
    { id: "N1", label: "Core Suspect", type: "suspect", x: 150, y: 150, centrality: 0.85, pulse: true },
    { id: "N2", label: "IP 192.168.1.42", type: "ip", x: 70, y: 100, centrality: 0.4 },
    { id: "N3", label: "BTC Tx_f8271a", type: "transaction", x: 230, y: 80, centrality: 0.6 },
    { id: "N4", label: "Asset Safehouse", type: "target", x: 260, y: 220, centrality: 0.35 },
    { id: "N5", label: "Field Agent 12", type: "agent", x: 60, y: 200, centrality: 0.5 },
    { id: "N6", label: "Associate Beta", type: "suspect", x: 130, y: 40, centrality: 0.55 },
    { id: "N7", label: "Wire Transfer", type: "transaction", x: 210, y: 160, centrality: 0.45 },
    { id: "N8", label: "MAC Proxy", type: "ip", x: 100, y: 240, centrality: 0.3 }
  ])

  const [links, setLinks] = useState<GraphLink[]>([
    { source: "N1", target: "N2" },
    { source: "N1", target: "N3" },
    { source: "N1", target: "N4" },
    { source: "N1", target: "N5" },
    { source: "N6", target: "N2" },
    { source: "N6", target: "N3" },
    { source: "N7", target: "N3" },
    { source: "N7", target: "N4" },
    { source: "N8", target: "N5" },
    { source: "N8", target: "N1" }
  ])

  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null)
  const [logs, setLogs] = useState<string[]>(["[SYSTEM] Crime Connect Graph layer initialized."])
  const [isCalculating, setIsCalculating] = useState(false)
  const [calcProgress, setCalcProgress] = useState(0)
  const logEndRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev.slice(-30), `[${new Date().toLocaleTimeString()}] ${msg}`])
  }

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [logs])

  const runPageRank = () => {
    if (isCalculating) return
    setIsCalculating(true)
    setCalcProgress(0)
    addLog("Initializing PageRank eigenvector calculation...")

    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCalcProgress((prev) => {
        const next = prev + 10
        if (next >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setIsCalculating(false)
          // Compute simulated results
          setNodes((prevNodes) =>
            prevNodes.map((n) => {
              // Increase centrality scores for nodes with high connections
              const connCount = links.filter((l) => l.source === n.id || l.target === n.id).length
              return {
                ...n,
                centrality: Math.min(0.99, Number((connCount * 0.12 + 0.2).toFixed(3))),
                pulse: connCount > 3
              }
            })
          )
          addLog("PageRank step 10 converged dynamically. Vector matrix recalculated.")
          addLog("Success: Centrality coordinates resolved in 12ms.")
          return 100
        }
        if (next === 30) {
          addLog("Iterating 10,000 dense nodes sub-graph...")
        }
        if (next === 60) {
          addLog("Resolving dynamic node coordinates on force canvas...")
        }
        if (next === 80) {
          addLog("Optimizing sparse matrix cross-joins...")
        }
        return next
      })
    }, 150)
  }

  const addConnection = () => {
    if (isCalculating) return
    // Pick two random nodes
    const n1 = nodes[Math.floor(Math.random() * nodes.length)]
    const n2 = nodes[Math.floor(Math.random() * nodes.length)]

    if (n1.id === n2.id) return

    // Check if link already exists
    const exists = links.some(
      (l) => (l.source === n1.id && l.target === n2.id) || (l.source === n2.id && l.target === n1.id)
    )

    if (exists) {
      addLog(`Edge ${n1.label} <-> ${n2.label} already indexed in registry.`)
      return
    }

    setLinks((prev) => [...prev, { source: n1.id, target: n2.id }])
    addLog(`Associated identity relationship: ${n1.label} linked with ${n2.label}`)
  }

  const getNodeColor = (type: GraphNode["type"], isHovered: boolean) => {
    if (isHovered) return "#c8f550"
    switch (type) {
      case "suspect":
        return "#ef4444"
      case "agent":
        return "#3b82f6"
      case "transaction":
        return "#f59e0b"
      case "ip":
        return "#a855f7"
      default:
        return "#10b981"
    }
  }

  return (
    <div className="w-full bg-zinc-950 border border-white/5 focus-within:border-[#c8f550]/30 transition-colors duration-200 rounded-xl p-5 flex flex-col gap-4 font-sans select-none relative overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#c8f550] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            FBI Graph intelligence Sandbox
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[10px] font-mono text-zinc-500 uppercase">
            Active Registry
          </span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full h-[220px] bg-zinc-900/40 rounded-lg border border-white/5 overflow-hidden flex items-center justify-center">
        {/* Cyber grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none" />

        <svg className="w-full h-full" viewBox="0 0 320 280">
          <g>
            {/* Render Links */}
            {links.map((link, idx) => {
              const sNode = nodes.find((n) => n.id === link.source)
              const tNode = nodes.find((n) => n.id === link.target)
              if (!sNode || !tNode) return null
              const isAccent = hoveredNode && (hoveredNode.id === sNode.id || hoveredNode.id === tNode.id)
              return (
                <line
                  key={idx}
                  x1={sNode.x}
                  y1={sNode.y}
                  x2={tNode.x}
                  y2={tNode.y}
                  stroke={isAccent ? "#c8f550" : "rgba(255,255,255,0.08)"}
                  strokeWidth={isAccent ? 1.5 : 1}
                  className="transition-colors duration-300"
                />
              )
            })}

            {/* Render Nodes */}
            {nodes.map((node) => {
              const isHovered = hoveredNode?.id === node.id
              const nodeRadius = 8 + node.centrality * 12
              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Outer glow aura */}
                  <circle
                    r={nodeRadius + 6}
                    fill={getNodeColor(node.type, isHovered)}
                    fillOpacity={isHovered ? 0.25 : 0.03}
                    className="transition-all duration-300"
                  />
                  {/* Pulse ring for high centrality nodes */}
                  {node.pulse && (
                    <circle
                      r={nodeRadius + 4}
                      fill="none"
                      stroke="#c8f550"
                      strokeWidth="0.8"
                      strokeOpacity="0.6"
                      className="animate-ping"
                    />
                  )}
                  {/* Main Node Dot */}
                  <circle
                    r={nodeRadius}
                    fill={getNodeColor(node.type, isHovered)}
                    stroke="#000"
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />
                </g>
              )
            })}
          </g>
        </svg>

        {/* Hover Information overlay */}
        {hoveredNode && (
          <div className="absolute bottom-2 left-2 right-2 bg-zinc-950/90 border border-[#c8f550]/20 rounded p-2 flex items-center justify-between backdrop-blur-md animate-fadeIn">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Entity</span>
              <span className="text-xs font-bold text-white uppercase">{hoveredNode.label}</span>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Centrality</span>
              <span className="text-xs font-bold text-[#c8f550] font-mono">{(hoveredNode.centrality * 100).toFixed(0)}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-2">
        <button
          onClick={runPageRank}
          disabled={isCalculating}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-[#c8f550] disabled:bg-zinc-800 text-zinc-950 disabled:text-zinc-600 text-xs font-bold uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 shadow-md shadow-[#c8f550]/15 focus:outline-none focus:ring-1 focus:ring-[#c8f550]/50"
        >
          {isCalculating ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Recalculating...
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              PageRank Centrality
            </>
          )}
        </button>
        <button
          onClick={addConnection}
          disabled={isCalculating}
          className="px-3 py-2 rounded bg-zinc-900 border border-white/10 hover:border-[#c8f550]/30 hover:bg-zinc-850 text-white text-xs font-bold uppercase transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#c8f550]/50"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* PageRank Progress Bar */}
      {isCalculating && (
        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#c8f550] to-emerald-400 transition-all duration-150"
            style={{ width: `${calcProgress}%` }}
          />
        </div>
      )}

      {/* Terminal log panel */}
      <div className="w-full h-[80px] bg-black border border-white/5 rounded p-2 overflow-y-auto font-mono text-[9px] text-emerald-500/90 leading-relaxed shadow-inner">
        {logs.map((log, idx) => (
          <div key={idx} className="whitespace-pre-wrap">
            {log}
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  )
}

// ==========================================
// 2. Smart Maps 3D Sandbox: 3D Point-Cloud Canvas
// ==========================================
function SmartMaps3DSandbox() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pointCount, setPointCount] = useState(120)
  const [activeMode, setActiveMode] = useState<"orbit" | "heatmap">("orbit")
  const [fps, setFps] = useState(60.0)
  const [renderCount, setRenderCount] = useState(1024800)
  const mouseRef = useRef({ x: 0, y: 0, isOver: false })
  const rotationRef = useRef({ x: 0, y: 0 })
  const dragRef = useRef({ isDragging: false, startX: 0, startY: 0 })

  // 3D Particles generator
  const particlesRef = useRef<{ x: number; y: number; z: number; ox: number; oy: number; oz: number; color: string }[]>([])

  useEffect(() => {
    // Generate 3D sphere point coordinates
    const list = []
    for (let i = 0; i < 150; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = 80
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      list.push({ x, y, z, ox: x, oy: y, oz: z, color: "" })
    }
    particlesRef.current = list
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let lastTime = performance.now()
    let frameCount = 0

    const render = () => {
      // Calculate FPS
      const now = performance.now()
      frameCount++
      if (now - lastTime >= 1000) {
        setFps(Number((frameCount * 1000 / (now - lastTime)).toFixed(1)))
        frameCount = 0
        lastTime = now
      }

      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      const displayWidth = Math.floor(rect.width)
      const displayHeight = Math.floor(rect.height)

      if (displayWidth > 0 && displayHeight > 0) {
        if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
          canvas.width = displayWidth * dpr
          canvas.height = displayHeight * dpr
          ctx.scale(dpr, dpr)
        }
      }

      ctx.clearRect(0, 0, displayWidth, displayHeight)
      const cx = displayWidth / 2
      const cy = displayHeight / 2

      // Apply subtle continuous base rotation
      if (!dragRef.current.isDragging) {
        rotationRef.current.y += 0.005
      }

      const cosY = Math.cos(rotationRef.current.y)
      const sinY = Math.sin(rotationRef.current.y)
      const cosX = Math.cos(rotationRef.current.x)
      const sinX = Math.sin(rotationRef.current.x)

      // Render wireframe outline
      ctx.beginPath()
      ctx.arc(cx, cy, 80, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(255,255,255,0.03)"
      ctx.stroke()

      // Sort particles by Z (depth) for proper 3D layering
      const projected = particlesRef.current.map((p) => {
        // Rotate Y (yaw)
        let x1 = p.x * cosY - p.z * sinY
        let z1 = p.x * sinY + p.z * cosY

        // Rotate X (pitch)
        let y2 = p.y * cosX - z1 * sinX
        let z2 = p.y * sinX + z1 * cosX

        // Mouse gravity pull (cluster particles towards pointer)
        if (mouseRef.current.isOver) {
          const mx = mouseRef.current.x - cx
          const my = mouseRef.current.y - cy
          const dist = Math.hypot(mx - x1, my - y2)
          if (dist < 60) {
            const force = (60 - dist) / 180
            x1 += (mx - x1) * force
            y2 += (my - y2) * force
          }
        }

        return {
          x: x1 + cx,
          y: y2 + cy,
          z: z2,
          p
        }
      })

      projected.sort((a, b) => b.z - a.z)

      // Drawing connecting mesh lines between close points
      ctx.strokeStyle = activeMode === "heatmap" ? "rgba(200,245,80,0.04)" : "rgba(255,255,255,0.04)"
      ctx.lineWidth = 0.5
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dist = Math.hypot(projected[i].x - projected[j].x, projected[i].y - projected[j].y)
          if (dist < 40) {
            ctx.beginPath()
            ctx.moveTo(projected[i].x, projected[i].y)
            ctx.lineTo(projected[j].x, projected[j].y)
            ctx.stroke()
          }
        }
      }

      // Drawing dots
      projected.forEach((pt) => {
        const radius = Math.max(1, ((pt.z + 100) / 200) * 3)
        const opacity = Math.max(0.15, Math.min(1, (pt.z + 100) / 180))

        ctx.beginPath()
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2)

        if (activeMode === "heatmap") {
          const distanceToMouse = mouseRef.current.isOver 
            ? Math.hypot(pt.x - mouseRef.current.x, pt.y - mouseRef.current.y)
            : 200
          if (distanceToMouse < 80) {
            ctx.fillStyle = `#c8f550`
          } else {
            ctx.fillStyle = `rgba(239, 68, 68, ${opacity})` // RED heatmap density nodes
          }
        } else {
          // Standard accent nodes
          const isCore = Math.abs(pt.p.ox) < 15 || Math.abs(pt.p.oy) < 15
          ctx.fillStyle = isCore 
            ? `rgba(200, 245, 80, ${opacity * 0.95})` 
            : `rgba(255, 255, 255, ${opacity * 0.45})`
        }

        ctx.fill()
      })

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => cancelAnimationFrame(animationId)
  }, [activeMode])

  const triggerHeavyMode = () => {
    // Simulate high-density calculations on telemetry
    setRenderCount((prev) => (prev === 1024800 ? 5489000 : 1024800))
  }

  // Mouse moves inside canvas
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isOver: true
    }

    if (dragRef.current.isDragging) {
      const deltaX = e.clientX - dragRef.current.startX
      const deltaY = e.clientY - dragRef.current.startY
      rotationRef.current.y += deltaX * 0.01
      rotationRef.current.x += deltaY * 0.01
      dragRef.current.startX = e.clientX
      dragRef.current.startY = e.clientY
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY
    }
  }

  const handleMouseUpOrLeave = () => {
    dragRef.current.isDragging = false
    mouseRef.current.isOver = false
  }

  return (
    <div className="w-full bg-zinc-950 border border-white/5 focus-within:border-[#c8f550]/30 transition-colors duration-200 rounded-xl p-5 flex flex-col gap-4 font-sans select-none relative overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#c8f550] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            WebGL Geospatial 3D Simulator
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono bg-[#c8f550]/10 text-[#c8f550] px-2 py-0.5 rounded border border-[#c8f550]/20">
          60.0 FPS STABLE
        </div>
      </div>

      {/* 3D Canvas Rendering */}
      <div className="relative w-full h-[220px] bg-zinc-900/30 rounded-lg border border-white/5 overflow-hidden flex items-center justify-center">
        {/* Radar concentric circular frames */}
        <div className="absolute w-[240px] h-[240px] rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute w-[180px] h-[180px] rounded-full border border-white/[0.03] pointer-events-none" />
        <div className="absolute w-[100px] h-[100px] rounded-full border border-white/[0.02] pointer-events-none" />

        <canvas
          ref={canvasRef}
          width={280}
          height={220}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="cursor-grab active:cursor-grabbing w-full h-full"
        />

        {/* Telemetry overlay panel */}
        <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md border border-white/5 p-2 rounded text-[8px] font-mono text-zinc-400 space-y-0.5 leading-tight pointer-events-none select-none">
          <div className="flex items-center justify-between gap-4">
            <span>ENGINE STATUS:</span>
            <span className="text-[#c8f550] font-bold">GPU-BOUND</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>RENDERED PTS:</span>
            <span className="text-white font-bold">{renderCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>DRAW SPEED:</span>
            <span className="text-white font-bold">{(1000 / fps).toFixed(2)}ms / frame</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>SHADERS:</span>
            <span className="text-[#c8f550]">CUSTOM_GLSL</span>
          </div>
        </div>

        {/* Drag rotation helper indicator */}
        <div className="absolute bottom-2 right-2 text-[8px] font-mono text-zinc-500 uppercase tracking-widest pointer-events-none bg-black/40 px-2 py-0.5 rounded">
          Drag coordinates to spin
        </div>
      </div>

      {/* Simulation options */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveMode((prev) => (prev === "orbit" ? "heatmap" : "orbit"))}
          className={`flex-1 px-3 py-2 rounded text-xs font-bold uppercase border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-1 focus:ring-[#c8f550]/50 ${
            activeMode === "heatmap" 
              ? "bg-red-500/10 border-red-500/30 text-red-500 shadow-md shadow-red-500/5" 
              : "bg-zinc-900 border-white/10 text-white"
          }`}
        >
          {activeMode === "heatmap" ? "Density Map Active" : "Coordinate Vector Mesh"}
        </button>
        <button
          onClick={triggerHeavyMode}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-[#c8f550] text-zinc-950 text-xs font-bold uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-[#c8f550]/15 focus:outline-none focus:ring-1 focus:ring-[#c8f550]/50"
        >
          <Cpu className="w-3.5 h-3.5" />
          {renderCount === 1024800 ? "Simulate 5M Points" : "Reset count"}
        </button>
      </div>
    </div>
  )
}

// ==========================================
// 3. HackOps: Retro Terminal Sandbox
// ==========================================
function HackOpsTerminalSandbox() {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "==========================================",
    "  HACKOPS SANDBOX INTERACTIVE TERMINAL v1.5 ",
    "  AUTHENTICATION: CONNECTED TO CTF LABS     ",
    "==========================================",
    "Type HELP or click commands below to execute payload."
  ])
  const [inputVal, setInputVal] = useState("")
  const [isHacking, setIsHacking] = useState(false)
  const outputEndRef = useRef<HTMLDivElement>(null)
  const hackIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const hackTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (hackIntervalRef.current) clearInterval(hackIntervalRef.current)
      if (hackTimeoutRef.current) clearTimeout(hackTimeoutRef.current)
    }
  }, [])

  const printLine = (line: string) => {
    setTerminalOutput((prev) => [...prev, line])
  }

  useEffect(() => {
    if (outputEndRef.current) {
      outputEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [terminalOutput])

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase()
    if (!cleanCmd) return

    printLine(`\n$ ${cmd}`)
    setIsHacking(true)
    
    if (hackTimeoutRef.current) clearTimeout(hackTimeoutRef.current)
    if (hackIntervalRef.current) clearInterval(hackIntervalRef.current)

    hackTimeoutRef.current = setTimeout(() => {
      switch (cleanCmd) {
        case "help":
          printLine("Available commands:")
          printLine("  help         Display command manual instructions.")
          printLine("  port-scan    Scan ports of firewalled victim proxy servers.")
          printLine("  brute-force  Deploy dictionary credential bypass attack.")
          printLine("  auth-bypass  Execute SQL Injection payload on target router.")
          printLine("  clear        Clear standard terminal screen buffer.")
          setIsHacking(false)
          break
        case "clear":
          setTerminalOutput([])
          setIsHacking(false)
          break
        case "port-scan":
          runPortScan()
          break
        case "brute-force":
          runBruteForce()
          break
        case "auth-bypass":
          runAuthBypass()
          break
        default:
          printLine(`Command not found: '${cleanCmd}'. Type 'help' for instructions.`)
          setIsHacking(false)
      }
    }, 200)

    setInputVal("")
  }

  const runPortScan = () => {
    printLine("[INFO] Initiating network socket port sweep...")
    let ports = [21, 22, 23, 25, 80, 443, 8080]
    let currentIdx = 0

    hackIntervalRef.current = setInterval(() => {
      if (currentIdx >= ports.length) {
        if (hackIntervalRef.current) clearInterval(hackIntervalRef.current)
        printLine("[SUCCESS] Sweep complete. Found vulnerability:")
        printLine("  => Port 8080: Apache Tomcat / Web Proxy [VULNERABLE]")
        printLine("  => Exploit payload indexed. Deploy bypass shell.")
        setIsHacking(false)
        return
      }
      printLine(`[SCANNING] Socket connect: 10.0.4.12:${ports[currentIdx]} -> CLOSED`)
      currentIdx++
    }, 150)
  }

  const runBruteForce = () => {
    printLine("[ATTACK] Running dictionary key spray on admin portal...")
    const trials = [
      "admin : root",
      "admin : password",
      "admin : 123456",
      "admin : administrator",
      "admin : hackops2025"
    ]
    let currentIdx = 0

    hackIntervalRef.current = setInterval(() => {
      if (currentIdx >= trials.length) {
        if (hackIntervalRef.current) clearInterval(hackIntervalRef.current)
        printLine("==========================================")
        printLine("  [SUCCESS] CREDENTIALS RESOLVED!        ")
        printLine("  => User: admin                          ")
        printLine("  => Pass: hackops2025                    ")
        printLine("  => Shell flag: CTF{HACK_TH3_N0D3_99x} ")
        printLine("==========================================")
        setIsHacking(false)
        return
      }
      printLine(`[ATTEMPT] spray authentication: '${trials[currentIdx]}' -> DENIED`)
      currentIdx++
    }, 150)
  }

  const runAuthBypass = () => {
    printLine("[EXPLOIT] Injecting SQL bypass code in username buffer...")
    printLine("[PAYLOAD] ' OR '1'='1' --")
    
    hackTimeoutRef.current = setTimeout(() => {
      printLine("[DATABASE] Executing SQL Query: SELECT * FROM users WHERE user='' OR '1'='1' AND pass=''")
      hackTimeoutRef.current = setTimeout(() => {
        printLine("[SUCCESS] Query returns 200 SUCCESS.")
        printLine("[SYSTEM] Admin Session Token generated: JWT_TOKEN_f8a9d182")
        printLine("==========================================")
        printLine("  PRIVILEGE ESCALATION: ROOT ACCESS OK    ")
        printLine("==========================================")
        setIsHacking(false)
      }, 300)
    }, 300)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isHacking) {
      executeCommand(inputVal)
    }
  }

  return (
    <div className="w-full bg-[#050505] border border-white/5 focus-within:border-[#c8f550]/30 transition-colors duration-200 rounded-xl p-5 flex flex-col gap-4 font-mono select-none relative overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#c8f550] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            HackOps CTF Sandbox Shell
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[8px] bg-red-950 text-red-500 px-2 py-0.5 rounded border border-red-900/30">
          <ShieldAlert className="w-2.5 h-2.5 inline mr-1 animate-pulse" />
          ISOLATED ENVIRONMENT
        </div>
      </div>

      {/* Terminal Screen Buffer */}
      <div className="relative w-full h-[180px] bg-black border border-zinc-900 rounded p-3 overflow-y-auto text-[10px] text-green-500/90 leading-relaxed shadow-inner font-mono select-text">
        {/* CRT Scanline mesh overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none" />
        
        {terminalOutput.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
        <div ref={outputEndRef} />
      </div>

      {/* Script Clickable Macros */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => executeCommand("port-scan")}
          disabled={isHacking}
          className="flex-1 px-2.5 py-1.5 rounded bg-zinc-900 border border-white/5 hover:border-[#c8f550]/30 hover:bg-zinc-850 text-[10px] font-bold text-white uppercase transition-colors focus:outline-none focus:ring-1 focus:ring-[#c8f550]/50"
        >
          1. Port Scan
        </button>
        <button
          onClick={() => executeCommand("brute-force")}
          disabled={isHacking}
          className="flex-1 px-2.5 py-1.5 rounded bg-zinc-900 border border-white/5 hover:border-[#c8f550]/30 hover:bg-zinc-850 text-[10px] font-bold text-white uppercase transition-colors focus:outline-none focus:ring-1 focus:ring-[#c8f550]/50"
        >
          2. Brute Force
        </button>
        <button
          onClick={() => executeCommand("auth-bypass")}
          disabled={isHacking}
          className="flex-1 px-2.5 py-1.5 rounded bg-zinc-900 border border-white/5 hover:border-[#c8f550]/30 hover:bg-zinc-850 text-[10px] font-bold text-white uppercase transition-colors focus:outline-none focus:ring-1 focus:ring-[#c8f550]/50"
        >
          3. SQL Bypass
        </button>
      </div>

      {/* Custom Terminal Command Line Input */}
      <div className="flex items-center gap-2 border-t border-white/5 pt-3">
        <span className="text-xs text-[#c8f550] font-bold">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isHacking}
          placeholder="type 'help' or command..."
          className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder-zinc-700 font-mono focus:outline-none focus:ring-1 focus:ring-[#c8f550]/30 px-1 rounded-sm"
        />
        <button
          onClick={() => executeCommand(inputVal)}
          disabled={isHacking || !inputVal.trim()}
          className="px-3 py-1 rounded bg-[#c8f550] disabled:bg-zinc-800 text-zinc-950 disabled:text-zinc-600 text-[10px] font-bold uppercase transition-colors focus:outline-none focus:ring-1 focus:ring-[#c8f550]/50"
        >
          Run
        </button>
      </div>
    </div>
  )
}

// ==========================================
// 4. VARtificial: ML XGBoost Predictive Sandbox
// ==========================================
function VARtificialPredictorSandbox() {
  const [attSkill, setAttSkill] = useState(72)
  const [defSkill, setDefSkill] = useState(65)
  const [refBias, setRefBias] = useState(0) // -50 to +50

  const [prediction, setPrediction] = useState({ home: 51, draw: 25, away: 24 })
  const [optunaTrials, setOptunaTrials] = useState<string[]>([
    "Optuna Hyperparameter: trial #42 evaluated (Accuracy: 0.778)"
  ])
  const logEndRef = useRef<HTMLDivElement>(null)

  const logDebounceRef = useRef<NodeJS.Timeout | null>(null)

  // Trigger probability updates when inputs adjust
  useEffect(() => {
    // Basic calculation model
    const homeWeight = attSkill + (refBias > 0 ? refBias * 0.4 : 0)
    const awayWeight = defSkill + (refBias < 0 ? Math.abs(refBias) * 0.4 : 0)
    
    // Add base draw factor
    const rawTotal = homeWeight + awayWeight
    const drawRaw = Math.max(10, 45 - Math.abs(homeWeight - awayWeight) * 0.3)

    const homePercent = Math.max(5, Math.round(((homeWeight / rawTotal) * (100 - drawRaw))))
    const awayPercent = Math.max(5, Math.round(((awayWeight / rawTotal) * (100 - drawRaw))))
    const drawPercent = 100 - homePercent - awayPercent

    setPrediction({ home: homePercent, draw: drawPercent, away: awayPercent })

    if (logDebounceRef.current) clearTimeout(logDebounceRef.current)
    
    logDebounceRef.current = setTimeout(() => {
      // Generate simulated Optuna log entry
      const id = Math.floor(Math.random() * 500) + 1
      const accuracy = (0.76 + (attSkill + defSkill) / 1000 + Math.random() * 0.01).toFixed(4)
      setOptunaTrials((prev) => [
        ...prev.slice(-3),
        `Optuna Search: evaluating trial #${id} (XGBoost Accuracy: ${accuracy})`
      ])
    }, 150)
    
    return () => {
      if (logDebounceRef.current) clearTimeout(logDebounceRef.current)
    }
  }, [attSkill, defSkill, refBias])

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [optunaTrials])

  return (
    <div className="w-full bg-zinc-950 border border-white/5 focus-within:border-[#c8f550]/30 transition-colors duration-200 rounded-xl p-5 flex flex-col gap-4 font-sans select-none relative overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#c8f550] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            XGBoost ML Predictive Sandbox
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[8px] bg-emerald-950/40 text-emerald-500 px-2 py-0.5 rounded border border-emerald-900/30">
          <Sparkles className="w-2.5 h-2.5 inline mr-1" />
          ACCURACY: 78%
        </div>
      </div>

      {/* Virtual Football Pitch Schematic */}
      <div className="relative w-full h-[150px] bg-zinc-900/40 rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-3">
        {/* Pitch Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40px,rgba(255,255,255,0.01)_40px)] pointer-events-none" />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/[0.03] pointer-events-none" />
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white/[0.03] pointer-events-none" />

        {/* Home vs Away Pulses */}
        <div className="flex justify-between items-center w-full z-10">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Home Team</span>
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Attackers</span>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Away Team</span>
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Defenders</span>
          </div>
        </div>

        {/* Prediction Pulses Gauge Meters */}
        <div className="flex flex-col gap-1.5 w-full z-10 bg-zinc-950/70 border border-white/5 rounded p-2.5 backdrop-blur-md">
          <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400">
            <span>HOME: {prediction.home}%</span>
            <span>DRAW: {prediction.draw}%</span>
            <span>AWAY: {prediction.away}%</span>
          </div>
          <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden flex">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400" style={{ width: `${prediction.home}%` }} />
            <div className="h-full bg-zinc-700" style={{ width: `${prediction.draw}%` }} />
            <div className="h-full bg-gradient-to-r from-red-500 to-red-400" style={{ width: `${prediction.away}%` }} />
          </div>
        </div>
      </div>

      {/* Input tuning sliders */}
      <div className="flex flex-col gap-3 border-t border-white/5 pt-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
            <span>Home Attacker Rating</span>
            <span className="font-mono text-[#c8f550]">{attSkill}</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={attSkill}
            onChange={(e) => setAttSkill(Number(e.target.value))}
            className="w-full accent-[#c8f550] bg-zinc-900 rounded-lg appearance-none h-1 focus:outline-none focus:ring-1 focus:ring-[#c8f550]/50 rounded-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
            <span>Away Defender Rating</span>
            <span className="font-mono text-[#c8f550]">{defSkill}</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={defSkill}
            onChange={(e) => setDefSkill(Number(e.target.value))}
            className="w-full accent-[#c8f550] bg-zinc-900 rounded-lg appearance-none h-1 focus:outline-none focus:ring-1 focus:ring-[#c8f550]/50 rounded-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
            <span>Referee Variance / Bias</span>
            <span className="font-mono text-[#c8f550]">
              {refBias === 0 ? "Neutral" : refBias > 0 ? `+${refBias} Home` : `${refBias} Away`}
            </span>
          </div>
          <input
            type="range"
            min="-50"
            max="50"
            value={refBias}
            onChange={(e) => setRefBias(Number(e.target.value))}
            className="w-full accent-[#c8f550] bg-zinc-900 rounded-lg appearance-none h-1 focus:outline-none focus:ring-1 focus:ring-[#c8f550]/50 rounded-sm"
          />
        </div>
      </div>

      {/* Optuna hyperparameter trials logs */}
      <div className="w-full h-[60px] bg-black border border-white/5 rounded p-2 overflow-y-auto font-mono text-[8px] text-zinc-500 leading-normal">
        {optunaTrials.map((t, idx) => (
          <div key={idx} className="whitespace-nowrap">
            {t}
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  )
}
