import { Mail, Phone } from 'lucide-react'
import profile from '@/data/profile.json'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { MagneticButton } from '@/components/ui/MagneticButton'
import type { Profile } from '@/types'

const data = profile as Profile

export function ContactSection() {
  const hasPhone = Boolean(data.phone?.trim())

  return (
    <SectionWrapper
      id="contact"
      title="Get in Touch"
      subtitle="Reach out — I'd love to hear from you."
      centered
    >
      <div className="section-reveal max-w-xl mx-auto text-center space-y-6">
        <p className="text-[var(--text-muted)] leading-relaxed">
          Open to collaborations, internship opportunities, and projects where I can contribute,
          learn, and build meaningful solutions. The fastest way to reach me is by email.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton
            variant="primary"
            href={`mailto:${data.email}?subject=Hello%20Athallazhafran`}
            className="gap-2 w-full sm:w-auto"
          >
            <Mail size={18} />
            Email Me
          </MagneticButton>

          {hasPhone && (
            <MagneticButton
              variant="outline"
              href={`tel:${data.phone}`}
              className="gap-2 w-full sm:w-auto"
            >
              <Phone size={18} />
              {data.phone}
            </MagneticButton>
          )}
        </div>

        {!hasPhone && (
          <p className="text-sm text-[var(--text-muted)]">
            Tap <strong className="text-[var(--text)]">Email Me</strong> to open your mail app and
            send a message.
          </p>
        )}
      </div>
    </SectionWrapper>
  )
}
