import { ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { DestinationContent } from '@/components/search/destination-content'
import { SearchHeader } from '@/components/search/search-header'
import { SearchResults } from '@/components/search/results'
import { SiteFooter } from '@/components/site-footer'
import { phuketDestination } from '@/lib/data/content'
import { formatNumber } from '@/lib/format'
import { formatStaySummary, parseSearchParams } from '@/lib/search'

export const metadata: Metadata = {
  title: 'Отели на Пхукете — цены со всеми сборами',
  description:
    'Подберите отель на Пхукете: фильтры по цене, питанию, расстоянию до пляжа и условиям отмены. Полная стоимость проживания видна сразу.',
  alternates: { canonical: '/search' },
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const search = parseSearchParams(params)

  return (
    <>
      <SearchHeader search={search} />
      <main className="mx-auto max-w-[1240px] px-4 pt-6 pb-4 lg:px-6">
        <nav aria-label="Хлебные крошки">
          <ol className="flex flex-wrap items-center gap-1 text-[13px] text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground hover:underline">
                Главная
              </Link>
            </li>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <li>
              <Link href="/search" className="hover:text-foreground hover:underline">
                Таиланд
              </Link>
            </li>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <li aria-current="page" className="font-medium text-foreground">
              Пхукет
            </li>
          </ol>
        </nav>

        <div className="mt-4">
          <h1 className="font-heading text-2xl font-extrabold text-balance sm:text-3xl">
            {phuketDestination.h1}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {formatNumber(phuketDestination.resultsCount)} отелей · {formatStaySummary(search)}
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {phuketDestination.intro}
          </p>
        </div>

        <div className="mt-6">
          <SearchResults search={search} />
        </div>

        <DestinationContent search={search} />
      </main>
      <SiteFooter />
    </>
  )
}
