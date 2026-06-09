'use client'

interface MarqueeStripProps {
  items: string[]
  separator?: string
  speed?: number
}

export function MarqueeStrip({
  items,
  separator = '\u2014',
  speed = 30,
}: MarqueeStripProps) {
  const content = items.map((item, i) => (
    <span key={i} className="inline-flex items-center gap-6">
      <span>{item}</span>
      <span style={{ color: '#C8A96E' }}>{separator}</span>
    </span>
  ))

  return (
    <div
      id="marquee-strip"
      style={{
        borderTop: '1px solid #E5E5E5',
        borderBottom: '1px solid #E5E5E5',
        padding: '12px 0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          gap: 24,
          animation: `marquee-scroll ${speed}s linear infinite`,
          fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#999',
        }}
      >
        <span className="inline-flex gap-6">{content}</span>
        <span className="inline-flex gap-6">{content}</span>
      </div>

      <style jsx>{`
        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
