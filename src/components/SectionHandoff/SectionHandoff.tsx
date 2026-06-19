import './SectionHandoff.css'

type HandoffVariant = 'visitor' | 'audience' | 'chapter' | 'practical' | 'conversion' | 'closing'

interface SectionHandoffProps {
  variant: HandoffVariant
}

export default function SectionHandoff({ variant }: SectionHandoffProps) {
  return (
    <div
      className={`section-handoff section-handoff--${variant}`}
      aria-hidden="true"
      data-transition-purpose={variant}
    />
  )
}
