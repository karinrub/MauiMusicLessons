import './SectionHandoff.css'

type HandoffVariant = 'visitor' | 'audience' | 'chapter' | 'practical' | 'conversion' | 'closing'

interface SectionHandoffProps {
  variant: HandoffVariant
  image?: string
}

export default function SectionHandoff({ variant, image }: SectionHandoffProps) {
  return (
    <div
      className={`section-handoff section-handoff--${variant}`}
      aria-hidden="true"
      data-transition-purpose={variant}
    >
      {image && (
        <div
          className="section-handoff__image"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <div className="section-handoff__tone" />
    </div>
  )
}
