import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Briefcase, Mail, MapPin, Download } from 'lucide-react'
import profile from '@/data/profile.json'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { HeroScene } from '@/components/hero/HeroScene'
import { assetUrl } from '@/lib/assetUrl'
import type { Profile } from '@/types'

const data = profile as Profile

export function HeroSection() {
  const [displayName, setDisplayName] = useState('')
  const fullName = data.shortName

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayName(fullName.slice(0, i + 1))
      i++
      if (i >= fullName.length) clearInterval(interval)
    }, 80)
    return () => clearInterval(interval)
  }, [fullName])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  const words = ['Athallazhafran', 'A Software Engineer', 'A IT Enthusiast']

  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  useEffect(() => {
    const currentWord = words[wordIndex]
  
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1))
  
        if (text === currentWord) {
          setTimeout(() => setIsDeleting(true), 1200)
        }
      } else {
        setText(currentWord.substring(0, text.length - 1))
  
        if (text === '') {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? 50 : 100)
  
    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex])
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.p
            className="font-mono text-sm text-[var(--accent)] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            {'> hello_world()'}
          </motion.p>
          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1 }}
          >
            Hi, I&apos;m{' '}
            <span className="text-gradient">
              {text}
              <span className="animate-pulse">|</span>
            </span>
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-[var(--text-muted)] max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3 }}
          >
            {data.title}
          </motion.p>
          <motion.p
            className="mt-2 text-[var(--text-muted)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            {data.tagline}
          </motion.p>
          <motion.div
            className="flex items-center gap-2 mt-3 text-sm text-[var(--text-muted)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6 }}
          >
            <MapPin size={16} className="text-[var(--accent)]" />
            {data.location}
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.7 }}
          >
            <MagneticButton variant="primary" onClick={() => scrollTo('projects')}>
              View Projects
            </MagneticButton>
            <MagneticButton variant="outline" href={assetUrl(data.cvPath)} className="gap-2">
              <Download size={18} />
              Download CV
            </MagneticButton>
          </motion.div>

          <motion.div
            className="flex gap-4 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.9 }}
          >
            {[
              { href: data.socials.github, icon: Code2, label: 'GitHub' },
              { href: data.socials.linkedin, icon: Briefcase, label: 'LinkedIn' },
              { href: data.socials.email, icon: Mail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="p-3 rounded-lg glass text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                aria-label={label}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <HeroScene />
      </div>
    </section>
  )
}
