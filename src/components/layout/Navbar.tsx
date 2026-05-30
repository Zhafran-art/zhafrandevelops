import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Volume2, VolumeX, Terminal } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { PaletteSwitcher } from '@/components/ui/PaletteSwitcher'

const NAV = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'study', label: 'Study' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certs' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)
  const { toggleSound, soundOn, setDevPanelOpen, playClick } = useApp()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )

    NAV.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
    playClick()
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 glass shadow-lg' : 'py-4 bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.8, duration: 0.5 }}
    >
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          className="font-display font-bold text-lg text-gradient"
        >
          ATK
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {NAV.map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => scrollTo(id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active === id
                    ? 'text-[var(--accent)] bg-[var(--accent)]/10'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <motion.div className="flex items-center gap-2">
          <PaletteSwitcher />
          <button
            type="button"
            onClick={toggleSound}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            aria-label={soundOn ? 'Disable sound' : 'Enable sound'}
          >
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setDevPanelOpen(true)}
            className="hidden sm:flex p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            aria-label="Open dev console"
          >
            <Terminal size={18} />
          </button>
          <button
            type="button"
            className="md:hidden p-2 text-[var(--text)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </motion.div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden glass border-t border-[var(--border)] mt-2"
        >
          <ul className="flex flex-col p-4 gap-1">
            {NAV.map(({ id, label }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => scrollTo(id)}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  )
}
