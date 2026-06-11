import profile from '@/data/profile.json'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { TerminalWidget } from '@/components/about/TerminalWidget'
import { SkillsLogos } from '@/components/about/SkillsLogos'
import type { Profile } from '@/types'

const data = profile as Profile

export function AboutSection() {
  return (
    <SectionWrapper
      id="about"
      title="Who I Am"
      subtitle="Who I am and what I bring to the table."
      centered
    >
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="section-reveal space-y-6">
          <p className="text-[var(--text-muted)] leading-relaxed text-lg">{data.bio}</p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            {['Full-Stack', 'UI/UX', 'React', 'Figma', 'Game Dev'].map((chip) => (
              <span
                key={chip}
                className="px-3 py-1.5 rounded-full glass text-sm font-mono text-[var(--accent)] hover:scale-105 transition-transform cursor-default"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
        <div className="section-reveal">
          <TerminalWidget />
        </div>
      </div>

      <div className="mt-16 section-reveal">
        <h3 className="font-display text-2xl font-semibold mb-8 text-center">Skills</h3>
        <SkillsLogos />
      </div>
    </SectionWrapper>
  )
}
