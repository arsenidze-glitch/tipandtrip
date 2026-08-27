import type { ReactNode } from 'react'

export function Section({
  id,
  eyebrow,
  title,
  action,
  children,
  bare = false,
}: {
  id: string
  eyebrow?: string
  title: string
  action?: ReactNode
  children: ReactNode
  bare?: boolean
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={
        bare
          ? 'scroll-mt-36'
          : 'scroll-mt-36 rounded-2xl border border-border bg-card p-5 md:p-7'
      }
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          {eyebrow ? (
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {eyebrow}
            </p>
          ) : null}
          <h2 id={`${id}-title`} className="text-balance text-xl font-bold md:text-2xl">
            {title}
          </h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
