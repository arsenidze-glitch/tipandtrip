import Link from 'next/link'

import { HotelTile } from '@/components/hotel-card'
import { collections, hotels } from '@/lib/data/hotels'
import { DEFAULT_SEARCH, nightsBetween, searchHref } from '@/lib/search'

const nights = nightsBetween(DEFAULT_SEARCH.checkIn, DEFAULT_SEARCH.checkOut)

export function HomeCollections() {
  const shown = collections.slice(0, 3)

  return (
    <section className="bg-card">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-12 px-4 py-12 lg:px-6">
        {shown.map((collection) => {
          const items = hotels.filter((hotel) => hotel.collections.includes(collection.id)).slice(0, 4)
          if (items.length === 0) return null
          return (
            <div key={collection.id}>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-heading text-2xl font-extrabold text-balance">
                    {collection.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">{collection.description}</p>
                </div>
                <Link
                  href={searchHref(DEFAULT_SEARCH)}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Смотреть все
                </Link>
              </div>

              <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((hotel) => (
                  <li key={hotel.slug}>
                    <HotelTile hotel={hotel} search={DEFAULT_SEARCH} nights={nights} />
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
