import { ChevronDown } from 'lucide-react'

import { faq } from '@/lib/data/hotel-detail'

export function Faq() {
  return (
    <div className="flex flex-col gap-2">
      {faq.map((item, index) => (
        <details
          key={item.q}
          open={index === 0}
          className="group rounded-xl border border-border bg-card px-4 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 py-3.5 text-[15px] font-semibold">
            {item.q}
            <ChevronDown
              className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="pb-4 text-sm leading-relaxed text-secondary-foreground">{item.a}</p>
        </details>
      ))}
    </div>
  )
}
