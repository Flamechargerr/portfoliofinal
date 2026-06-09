"use client"

class PortfolioSynth {
  private ctx: AudioContext | null = null
  private soundEnabled = false // Default to muted for auto-play compliance, can be enabled by user

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("portfolio_sound_enabled")
      // If it exists, use that. Otherwise default to false
      this.soundEnabled = stored === "true"
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      if (AudioContextClass) {
        this.ctx = new AudioContextClass()
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume()
    }
    return this.ctx
  }

  public isEnabled(): boolean {
    return this.soundEnabled
  }

  public setEnabled(enabled: boolean) {
    this.soundEnabled = enabled
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_sound_enabled", String(enabled))
      window.dispatchEvent(new CustomEvent("portfolio_sound_toggle", { detail: { enabled } }))
      
      // If enabling, initialize context
      if (enabled) {
        this.initCtx()
      }
    }
  }

  public playTick() {
    if (!this.soundEnabled) return
    const ctx = this.initCtx()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "sine"
    osc.frequency.setValueAtTime(1000, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.03)

    gain.gain.setValueAtTime(0.015, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.03)
  }

  public playClick() {
    if (!this.soundEnabled) return
    const ctx = this.initCtx()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "triangle"
    osc.frequency.setValueAtTime(220, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.06)

    gain.gain.setValueAtTime(0.06, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.06)
  }

  public playSweep() {
    if (!this.soundEnabled) return
    const ctx = this.initCtx()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "sine"
    osc.frequency.setValueAtTime(150, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.3)

    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.08)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.3)
  }

  public playSuccess() {
    if (!this.soundEnabled) return
    const ctx = this.initCtx()
    if (!ctx) return

    const now = ctx.currentTime
    const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6 (ascending arpeggio)
    
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      
      osc.type = "sine"
      osc.frequency.setValueAtTime(freq, now + index * 0.08)
      
      gain.gain.setValueAtTime(0, now + index * 0.08)
      gain.gain.linearRampToValueAtTime(0.02, now + index * 0.08 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.3)
      
      osc.connect(gain)
      gain.connect(ctx.destination)
      
      osc.start(now + index * 0.08)
      osc.stop(now + index * 0.08 + 0.3)
    })
  }
}

// Global single instance
let globalSynth: PortfolioSynth | null = null

const getSynth = (): PortfolioSynth | null => {
  if (typeof window === "undefined") return null
  if (!globalSynth) {
    globalSynth = new PortfolioSynth()
  }
  return globalSynth
}

export const playSound = (type: "tick" | "click" | "sweep" | "success") => {
  const synth = getSynth()
  if (!synth) return
  if (type === "tick") synth.playTick()
  if (type === "click") synth.playClick()
  if (type === "sweep") synth.playSweep()
  if (type === "success") synth.playSuccess()
}

export const isSoundEnabled = (): boolean => {
  const synth = getSynth()
  return synth ? synth.isEnabled() : false
}

export const setSoundEnabled = (enabled: boolean) => {
  const synth = getSynth()
  if (synth) {
    synth.setEnabled(enabled)
  }
}
