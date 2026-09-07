import type { Metadata } from 'next'

import { HotelCard } from '@/components/hotel-card'
import { favoriteHotelSlugs } from '@/lib/data/account'
import { getHotel } from '@/lib/data/hotels'
import { DEFAULT_SEARCH, formatDateRange, nightsBetween } from '@/lib/search'

export const metadata: Metadata = {
  title: 'Избранное',
}

export default function AccountFavoritesPage() {
  const hotels = favoriteHotelSlugs.map(getHotel).filter((hotel) => hotel != null)
  const nights = nightsBetween(DEFAULT_SEARCH.checkIn, DEFAULT_SEARCH.checkOut)

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-heading text-2xl leading-tight font-bold sm:text-3xl">Избранное</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {hotels.length} отеля · цены показаны на {formatDateRange(DEFAULT_SEARCH.checkIn, DEFAULT_SEARCH.checkOut)},
          {' '}
          {DEFAULT_SEARCH.adults} взрослых и {DEFAULT_SEARCH.childrenAges.length} ребёнок
        </p>
      </header>

      <div className="flex flex-col gap-4">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.slug} hotel={hotel} search={DEFAULT_SEARCH} nights={nights} />
        ))}
      </div>
    </div>
  )
}
