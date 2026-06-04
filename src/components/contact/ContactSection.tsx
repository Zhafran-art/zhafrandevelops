import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Mail } from 'lucide-react'
import profile from '@/data/profile.json'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { MagneticButton } from '@/components/ui/MagneticButton'
import type { Profile } from '@/types'

const data = profile as Profile

export function ContactSection() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [toast, setToast] = useState('')

  const copyEmail = async () => {
    await navigator.clipboard.writeText(data.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (form.message.length < 10) e.message = 'Message must be at least 10 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setToast('Message validated! Add Formspree URL in README for real delivery.')
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setToast(''), 4000)
  }

  return (
    <SectionWrapper id="contact" title="Contact" subtitle="Let's build something together.">
      <div className="section-reveal grid lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <p className="text-[var(--text-muted)] leading-relaxed">
            Open to collaborations, internship opportunities, and innovative projects where I can contribute, learn, and create meaningful solutions. As a Full-Stack Engineer, I enjoy building scalable applications, crafting seamless user experiences, and solving complex technical challenges across both frontend and backend development. I’m always interested in connecting with professionals, startups, and organizations that value technology-driven innovation. Whether it's developing web applications, contributing to software products, or collaborating on ambitious ideas, I’m eager to bring value and grow alongside talented teams. Feel free to reach out via email—I'd be happy to discuss opportunities, exchange ideas, and explore how we can build something great together.

          </p>
          <div className="flex flex-wrap gap-3">
            <MagneticButton variant="outline" href={data.socials.email} className="gap-2">
              <Mail size={18} /> Email me
            </MagneticButton>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass text-sm hover:border-[var(--accent)]/40 transition-colors"
            >
              {copied ? <Check size={18} className="text-[var(--accent)]" /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy email'}
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="glass rounded-xl p-6 space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-mono text-[var(--accent)] mb-1">
              name
            </label>
            <input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-black/30 border border-[var(--border)] focus:border-[var(--accent)] outline-none"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-mono text-[var(--accent)] mb-1">
              email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-black/30 border border-[var(--border)] focus:border-[var(--accent)] outline-none"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-mono text-[var(--accent)] mb-1">
              message
            </label>
            <textarea
              id="message"
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-black/30 border border-[var(--border)] focus:border-[var(--accent)] outline-none resize-none"
            />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
          </div>
          <MagneticButton variant="primary" type="submit" className="w-full">
            A Work In Progress
          </MagneticButton>
        </form>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg glass text-sm z-50"
            role="status"
          >
            {toast}
          </motion.p>
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}
