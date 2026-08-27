import { Baby, Sparkles, Utensils, Waves } from 'lucide-react'
import { description, highlights, quickFacts } from '@/lib/hotel'
import { Section } from './section'

const icons = { waves: Waves, utensils: Utensils, sparkles: Sparkles, baby: Baby }

export function Overview() {
  return (
    <Section id="overview" eyebrow="Коротко о главном" title="Почему этот отель выбирают">
      <p className="max-w-3xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
        {description.lead}
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {highlights.map((h) => {
          const Icon = icons[h.icon as keyof typeof icons]
          return (
            <li key={h.title} className="flex gap-3 rounded-xl bg-secondary/60 p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-card text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-bold">{h.title}</span>
                <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                  {h.text}
                </span>
              </span>
            </li>
          )
        })}
      </ul>

      <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-border pt-5 sm:grid-cols-3 lg:grid-cols-6">
        {quickFacts.map((f) => (
          <div key={f.label}>
            <dt className="text-xs font-medium text-muted-foreground">{f.label}</dt>
            <dd className="mt-0.5 text-sm font-semibold">{f.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
