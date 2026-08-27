import { Check } from 'lucide-react'
import { amenityGroups } from '@/lib/hotel'
import { Section } from './section'

export function Amenities() {
  return (
    <Section
      id="amenities"
      eyebrow="Инфраструктура и сервис"
      title="Удобства отеля"
      action={
        <p className="text-xs text-muted-foreground">
          Всё, что включено в проживание, отмечено без доплаты
        </p>
      }
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {amenityGroups.map((group) => (
          <div key={group.title}>
            <h3 className="border-b border-border pb-2 text-sm font-bold uppercase tracking-wide">
              {group.title}
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {group.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-snug">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
