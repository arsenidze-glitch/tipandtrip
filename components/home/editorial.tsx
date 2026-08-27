import { Lightbulb } from 'lucide-react'
import Link from 'next/link'

import { editorialLinks, homeSeo } from '@/lib/data/content'

export function HomeEditorial() {
  return (
    <section className="mx-auto max-w-[1240px] px-4 py-12 lg:px-6">
      <div className="rounded-2xl border border-border bg-brand-soft p-5 sm:p-6">
        <p className="flex items-center gap-2 text-sm font-bold">
          <Lightbulb className="size-4 text-brand" aria-hidden="true" />
          Совет Tip&amp;Trip
        </p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary-foreground">
          Тариф с бесплатной отменой в среднем на 8–12 % дороже невозвратного. Если даты поездки ещё
          могут сдвинуться, разница почти всегда окупается: невозвратный тариф не возвращает деньги
          даже при переносе.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="font-heading text-2xl font-extrabold text-balance">{homeSeo.title}</h2>
        <div className="mt-4 flex flex-col gap-3">
          {homeSeo.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-x-8 gap-y-8 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-3">
        {editorialLinks.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h3 className="text-sm font-bold">{group.title}</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {group.links.map((link) => (
                <li key={link}>
                  <Link
                    href="/"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </section>
  )
}
