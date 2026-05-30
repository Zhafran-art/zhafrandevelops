import { useEffect } from 'react'
import { AppProvider, useApp } from '@/context/AppContext'
import { useLenisScroll } from '@/hooks/useLenisScroll'
import { useKonami } from '@/hooks/useKonami'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { LoadingScreen } from '@/components/layout/LoadingScreen'
import { PalettePickerModal } from '@/components/ui/PalettePickerModal'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { DevToolsPanel } from '@/components/layout/DevToolsPanel'
import { ShortcutHelp } from '@/components/layout/ShortcutHelp'
import { CursorTrail } from '@/components/ui/CursorTrail'
import { MatrixRain } from '@/components/effects/MatrixRain'
import { HeroSection } from '@/components/hero/HeroSection'
import { AboutSection } from '@/components/about/AboutSection'
import { StudySection } from '@/components/study/StudySection'
import { ProjectsSection } from '@/components/projects/ProjectsSection'
import { CertificatesSection } from '@/components/certificates/CertificatesSection'
import { ContactSection } from '@/components/contact/ContactSection'

function PortfolioContent() {
  const { loading, paletteReady, addLog } = useApp()
  const showChrome = !loading && paletteReady
  useLenisScroll()
  useKonami()
  useKeyboardShortcuts()

  useEffect(() => {
    addLog('App mounted — welcome!')
  }, [addLog])

  return (
    <>
      <LoadingScreen />
      <PalettePickerModal />
      <a href="#hero" className="skip-link">
        Skip to content
      </a>
      <div
        className={showChrome ? undefined : 'opacity-0 pointer-events-none fixed -z-10'}
        aria-hidden={!showChrome}
      >
        {showChrome && <Navbar />}
        <main>
          <HeroSection />
          <AboutSection />
          <StudySection />
          <ProjectsSection />
          <CertificatesSection />
          <ContactSection />
        </main>
        <Footer />
        <CursorTrail />
        <DevToolsPanel />
        <ShortcutHelp />
        <MatrixRain />
      </div>
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <PortfolioContent />
    </AppProvider>
  )
}
