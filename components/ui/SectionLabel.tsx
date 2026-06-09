interface SectionLabelProps {
  label: string
  className?: string
}

export function SectionLabel({ label, className = '' }: SectionLabelProps) {
  return (
    <span
      className={className}
      style={{
        fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        color: '#999',
      }}
    >
      {label}
    </span>
  )
}
