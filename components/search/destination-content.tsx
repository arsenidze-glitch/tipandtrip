import { Lightbulb } from 'lucide-react'
import Link from 'next/link'

import { phuketDestination } from '@/lib/data/content'
import { DEFAULT_SEARCH, searchHref, type SearchContext } from '@/lib/search'

export function DestinationContent({ search }: { search: SearchContext }) {
  return (
    <section className="mt-12 border-t border-border pt-10">
      <h2 className="font-heading text-2xl font-extrabold text-balance">
        Что нужно знать о Пхукете перед бронированием
      </h2>

      <div className="mt-5 grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          {phuketDestination.sections.map((section) => (
            <article key={section.title}>
              <h3 className="font-heading text-lg font-bold">{section.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border bg-brand-soft p-5">
            <p className="flex items-center gap-2 text-sm font-bold">
              <Lightbulb className="size-4 text-brand" aria-hidden="true" />
              Совет Tip&amp;Trip
            </p>
            <p className="mt-2 text-sm leading-relaxed text-secondary-foreground">
              {phuketDestination.smartTip}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-bold">Частые вопросы</h3>
            <dl className="mt-3 flex flex-col gap-4">
              {phuketDestination.faq.map((item) => (
                <div key={item.q}>
                  <dt className="text-sm font-semibold">{item.q}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <nav aria-label="Похожие направления" className="mt-10 border-t border-border pt-6">
        <h3 className="text-sm font-bold">Похожие направления</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {phuketDestination.related.map((item) => (
            <li key={item}>
              <Link
                href={searchHref({ ...DEFAULT_SEARCH, destination: item.replace('Отели в ', '').replace('Отели на ', '') })}
                className="flex h-9 items-center rounded-lg border border-border bg-card px-3 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Показаны цены для {search.adults + search.childrenAges.length} гостей на выбранные даты.
        </p>
      </nav>
    </section>
  )
}
