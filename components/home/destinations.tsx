import Image from 'next/image'
import Link from 'next/link'

import { destinations } from '@/lib/data/content'
import { formatNumber, formatPrice, plural } from '@/lib/format'
import { DEFAULT_SEARCH, searchHref } from '@/lib/search'

export function HomeDestinations() {
  return (
    <section className="mx-auto max-w-[1240px] px-4 py-12 lg:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-heading text-2xl font-extrabold text-balance">Популярные направления</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Цены за ночь для двух взрослых, включая налоги и сборы
          </p>
        </div>
        <Link href={searchHref(DEFAULT_SEARCH)} className="text-sm font-semibold text-primary hover:underline">
          Все направления
        </Link>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination, index) => (
          <li key={destination.slug}>
            <Link
              href={searchHref({ ...DEFAULT_SEARCH, destination: destination.query })}
              className="group relative flex h-56 flex-col justify-end overflow-hidden rounded-2xl border border-border p-4"
            >
              <Image
                src={destination.image}
                alt={destination.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                priority={index < 3}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,24,0.05)_35%,rgba(8,17,24,0.82)_100%)]"
                aria-hidden="true"
              />
              <span className="relative">
                <span className="block font-heading text-xl font-extrabold text-white">
                  {destination.name}
                </span>
                <span className="mt-0.5 block text-[13px] text-white/80">{destination.country}</span>
                <span className="mt-2 flex flex-wrap items-center gap-x-3 text-[13px] text-white/85">
                  <span>
                    {formatNumber(destination.hotels)}{' '}
                    {plural(destination.hotels, ['отель', 'отеля', 'отелей'])}
                  </span>
                  <span className="font-semibold text-white">
                    от {formatPrice(destination.priceFrom)} за ночь
                  </span>
                </span>
                <span className="mt-1 block text-xs text-white/70">{destination.note}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
