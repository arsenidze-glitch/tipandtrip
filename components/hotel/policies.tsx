import { Dot } from 'lucide-react'
import { policies } from '@/lib/hotel'
import { Section } from './section'

export function Policies() {
  return (
    <Section id="policies" eyebrow="Условия проживания" title="Правила отеля">
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {policies.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-bold">{group.title}</h3>
            <ul className="mt-2 flex flex-col gap-1.5">
              {group.items.map((item) => (
                <li key={item} className="flex items-start gap-1 text-sm leading-snug text-muted-foreground">
                  <Dot className="-ml-1 mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
