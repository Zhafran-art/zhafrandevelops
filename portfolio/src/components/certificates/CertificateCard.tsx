import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import type { Certificate } from '@/types'
import { useApp } from '@/context/AppContext'

interface CertificateCardProps {
  cert: Certificate
  index: number
}

export function CertificateCard({ cert, index }: CertificateCardProps) {
  const [flipped, setFlipped] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { reducedMotion, addLog } = useApp()
  const [glowed, setGlowed] = useState(false)

  useEffect(() => {
    if (reducedMotion || !ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !glowed) {
          setGlowed(true)
          addLog(`Certificate in view: ${cert.name}`)
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [cert.name, reducedMotion, glowed, addLog])

  return (
    <motion.div
      ref={ref}
      className={`relative h-48 cursor-pointer perspective-1000 ${glowed && !reducedMotion ? 'animate-pulse-once' : ''}`}
      style={{ perspective: 1000 }}
      onClick={() => setFlipped(!flipped)}
      onKeyDown={(e) => e.key === 'Enter' && setFlipped(!flipped)}
      role="button"
      tabIndex={0}
      aria-label={`${cert.name} certificate card`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <motion.div
        className="relative w-full h-full transition-transform duration-700 preserve-3d"
        animate={{ rotateY: flipped ? 180 : 0 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute inset-0 glass rounded-xl p-5 flex flex-col items-center justify-center text-center backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Award className="text-[var(--accent)] mb-3" size={32} />
          <h3 className="font-display font-semibold text-sm line-clamp-2">{cert.name}</h3>
          <p className="text-xs text-[var(--text-muted)] mt-1">{cert.type}</p>
        </div>
        <div
          className="absolute inset-0 glass rounded-xl p-5 flex flex-col justify-center backface-hidden border border-[var(--accent)]/30"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-xs text-[var(--accent-secondary)]">{cert.issuer}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">{cert.date}</p>
          {cert.credentialId && (
            <p className="text-xs font-mono text-[var(--text-muted)] mt-2">ID: {cert.credentialId}</p>
          )}
          <a
            href={cert.link}
            className="mt-3 inline-flex items-center gap-1 text-xs text-[var(--accent)] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Verify <ExternalLink size={12} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
