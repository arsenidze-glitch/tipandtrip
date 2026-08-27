import {
  Baby,
  Car,
  Coffee,
  MapPin,
  Star,
  Waves,
  WavesLadder,
  Wifi,
  type LucideIcon,
} from 'lucide-react'

import { RatingBadge, Stars } from '@/components/rating-badge'
import type { Hotel } from '@/lib/data/hotels'
import { formatKm, formatScore } from '@/lib/format'

const ICONS: Record<string, LucideIcon> = {
  waves: Waves,
  pool: WavesLadder,
  family: Baby,
  breakfast: Coffee,
  car: Car,
  wifi: Wifi,
  star: Star,
}

function buildHighlights(hotel: Hotel) {
  const items: { icon: string; label: string }[] = [
    {
      icon: 'waves',
      label:
        hotel.beachDistanceM <= 1000
          ? `${hotel.beachDistanceM} м до пляжа ${hotel.neighborhood}`
          : `${formatKm(hotel.beachDistanceM / 1000)} км до моря`,
    },
  ]

  if (hotel.facilities.includes('pool')) {
    items.push({ icon: 'pool', label: 'Открытый бассейн' })
  }
  if (hotel.familyFriendly) {
    items.push({ icon: 'family', label: 'Семейные номера' })
  }
  if (hotel.offer.meal !== 'none') {
    items.push({ icon: 'breakfast', label: hotel.offer.mealLabel })
  }
  if (hotel.facilities.includes('wifi')) {
    items.push({ icon: 'wifi', label: 'Бесплатный Wi-Fi' })
  }
  items.push({ icon: 'car', label: `${formatKm(hotel.airportDistanceKm)} км до аэропорта` })
  items.push({ icon: 'star', label: `Оценка гостей ${formatScore(hotel.rating)}` })

  return items
}

export function HotelIntro({ hotel }: { hotel: Hotel }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-[13px] text-muted-foreground">
            <span className="rounded-md bg-secondary px-2 py-0.5 font-medium text-secondary-foreground">
              {hotel.propertyTypeLabel}
            </span>
            <Stars count={hotel.stars} />
          </div>
          <h1 className="mt-2 font-heading text-2xl leading-tight font-bold text-balance sm:text-3xl">
            {hotel.name}
          </h1>
          <p className="mt-2 flex items-start gap-1.5 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              {hotel.address} · до пляжа {hotel.beachDistanceM} м
            </span>
          </p>
        </div>

        <a
          href="#reviews"
          className="flex shrink-0 items-center gap-3 rounded-xl border border-border bg-card px-3 py-2 hover:border-border-strong"
        >
          <RatingBadge score={hotel.rating} reviews={hotel.reviewsCount} />
        </a>
      </div>

      <ul className="flex flex-wrap gap-2">
        {buildHighlights(hotel).map((item) => {
          const Icon = ICONS[item.icon] ?? Star
          return (
            <li
              key={item.label}
              className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[13px]"
            >
              <Icon className="size-4 shrink-0 text-brand" aria-hidden="true" />
              {item.label}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
