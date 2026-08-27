import type { ReactNode } from 'react'

export function HotelSection({
  id,
  title,
  aside,
  children,
}: {
  id: string
  title: string
  aside?: ReactNode
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-32 border-t border-border pt-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <h2 id={`${id}-title`} className="font-heading text-xl leading-tight font-bold text-pretty sm:text-2xl">
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  )
}

export function SmartTip({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-brand/25 bg-brand-soft p-4 text-[13px] leading-relaxed text-secondary-foreground">
      {children}
    </p>
  )
}
