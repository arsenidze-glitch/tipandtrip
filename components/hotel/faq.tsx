import { Plus } from 'lucide-react'
import { faq } from '@/lib/hotel'
import { Section } from './section'

export function Faq() {
  return (
    <Section id="faq" eyebrow="Частые вопросы" title="Вопросы гостей об отеле">
      <div className="max-w-3xl divide-y divide-border">
        {faq.map((item, i) => (
          <details key={item.q} className="group py-1" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-3.5 text-[15px] font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
              {item.q}
              <Plus
                className="mt-0.5 size-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                aria-hidden="true"
              />
            </summary>
            <p className="pb-4 pr-8 text-[15px] leading-relaxed text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
