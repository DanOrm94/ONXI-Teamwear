import { useEffect, useRef } from 'react'
import './StrokeText.css'

// React Bits StrokeText implementation, adapted to the project's strict TypeScript setup.
type Props = {
  text?: string
  strokeColor?: string
  fillColor?: string
  strokeWidth?: number
  drawDuration?: number
  fillDelay?: number
  stagger?: number
  ease?: string
  trigger?: 'mount' | 'inView'
  fillMode?: 'wipe' | 'fade'
  fontSize?: number
  fontWeight?: number
  letterSpacing?: number
  className?: string
}

export default function StrokeText({
  text = '',
  strokeColor = '#A78BFA',
  fillColor = '#F8FAFC',
  strokeWidth = 1.4,
  drawDuration = 1.6,
  fillDelay = 0.2,
  stagger = 0.05,
  ease = 'power2.out',
  trigger = 'mount',
  fillMode = 'wipe',
  fontSize = 128,
  fontWeight = 800,
  letterSpacing = -4,
  className = '',
}: Props) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (trigger === 'mount') {
      node.classList.add('stroke-text-active')
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('stroke-text-active')
        observer.disconnect()
      }
    }, { threshold: 0.15 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [trigger])

  const lines = text.split('\n')
  const lineHeight = fontSize * 0.92

  return (
    <svg
      ref={ref}
      className={`stroke-text ${fillMode === 'wipe' ? 'stroke-text-wipe' : 'stroke-text-fade'} ${className}`.trim()}
      viewBox={`0 0 ${Math.max(1, text.length * fontSize * 0.62)} ${Math.max(fontSize, lines.length * lineHeight)}`}
      role="img"
      aria-label={text}
      style={{
        '--stroke-color': strokeColor,
        '--fill-color': fillColor,
        '--stroke-width': strokeWidth,
        '--draw-duration': `${drawDuration}s`,
        '--fill-delay': `${fillDelay}s`,
        '--stagger': `${stagger}s`,
        '--ease': ease === 'power2.out' ? 'cubic-bezier(.25,.8,.25,1)' : 'ease-out',
      } as React.CSSProperties}
    >
      {lines.map((line, index) => (
        <text
          key={`${line}-${index}`}
          x="0"
          y={fontSize + index * lineHeight}
          className="stroke-text-line"
          style={{
            fontSize,
            fontWeight,
            letterSpacing,
            animationDelay: `calc(var(--fill-delay) + ${index} * var(--stagger))`,
          }}
        >{line}</text>
      ))}
    </svg>
  )
}
