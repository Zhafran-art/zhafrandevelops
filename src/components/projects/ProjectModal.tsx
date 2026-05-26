import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Code2 } from 'lucide-react'
import type { Project } from '@/types'
import { useApp } from '@/context/AppContext'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
  editorStyle?: boolean
}

export function ProjectModal({ project, onClose, editorStyle = true }: ProjectModalProps) {
  const { addLog, playClick } = useApp()

  useEffect(() => {
    if (!project) return
    addLog(`Modal opened: ${project.name}`)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose, addLog])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => {
              playClick()
              onClose()
            }}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal
            aria-labelledby="project-modal-title"
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border ${
              editorStyle
                ? 'bg-[#1e1e1e] border-[#333] font-mono text-sm'
                : 'glass'
            }`}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            {editorStyle && (
              <div className="flex items-center gap-2 px-4 py-2 border-b border-[#333] bg-[#252526]">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs text-[#858585]">{project.id}.tsx — readonly</span>
              </div>
            )}
            <div className={editorStyle ? 'p-6 text-[#d4d4d4]' : 'p-6'}>
              <div className="flex justify-between items-start gap-4">
                <h2 id="project-modal-title" className={`text-xl font-semibold ${editorStyle ? 'text-[#4ec9b0]' : 'font-display'}`}>
                  {project.name}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 text-[var(--text-muted)]"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
              {editorStyle && (
                <p className="text-[#6a9955] mt-2">// {project.description}</p>
              )}
              {!editorStyle && <p className="mt-2 text-[var(--text-muted)]">{project.description}</p>}

              <div className="mt-4 space-y-4">
                <section>
                  <h3 className={editorStyle ? 'text-[#569cd6]' : 'text-[var(--accent)] font-mono text-sm'}>
                    {editorStyle ? 'const overview' : 'Overview'}
                  </h3>
                  <p className="mt-2 leading-relaxed">{project.longDescription}</p>
                </section>
                {project.challenges && (
                  <section>
                    <h3 className={editorStyle ? 'text-[#569cd6]' : 'text-[var(--accent)] font-mono text-sm'}>
                      challenges
                    </h3>
                    <p className="mt-2">{project.challenges}</p>
                  </section>
                )}
                {project.learnings && (
                  <section>
                    <h3 className={editorStyle ? 'text-[#569cd6]' : 'text-[var(--accent)] font-mono text-sm'}>
                      learnings
                    </h3>
                    <p className="mt-2">{project.learnings}</p>
                  </section>
                )}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-2">
                  <a
                    href={project.demo}
                    className="flex items-center gap-2 text-[var(--accent)] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} /> Live demo
                  </a>
                  <a
                    href={project.repo}
                    className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Code2 size={16} /> Repository
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
