import skillsData from '@/data/skills.json'
import type { Skill } from '@/types'

const skills = skillsData.skills as Skill[]

const SKILL_ICONS: Record<string, string> = {
  HTML: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  CSS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  JavaScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'React.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  Figma: 'https://cdn.simpleicons.org/figma/F24E1E',
  Bootstrap: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
  Tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  MySQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  Firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  'Unreal Engine': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg',
  Blender: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg',
  Unity: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg',
  Canva: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg',
  TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', 
}

export function SkillsLogos() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="group glass rounded-xl p-5 flex flex-col items-center gap-3 text-center hover:border-[var(--accent)]/40 transition-colors"
        >
          <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center p-3 group-hover:scale-110 transition-transform">
            <img
              src={SKILL_ICONS[skill.name]}
              alt=""
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          <span className="font-mono text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
            {skill.name}
          </span>
        </div>
      ))}
    </div>
  )
}
