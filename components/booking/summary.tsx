import { Ban, CalendarDays, CheckCircle2, Users } from 'lucide-react'
import Image from 'next/image'

import { RatingBadge } from '@/components/rating-badge'
import type { RatePlan, RoomType } from '@/lib/data/hotel-detail'
import type { Hotel } from '@/lib/data/hotels'
import { formatPrice, nightsLabel } from '@/lib/format'
import { formatDateRange, formatGuestsDetailed, nightsBetween, type SearchContext } from '@/lib/search'

export function BookingSummary({
  hotel,
  room,
  rate,
  search,
  total,
}: {
  hotel: Hotel
  room: RoomType
  rate: RatePlan
  search: SearchContext
  total: number
}) {
  const nights = nightsBetween(search.checkIn, search.checkOut)
  const taxes = rate.taxes
  const roomPrice = total - taxes

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4">
      <div className="flex gap-3">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
          <Image src={hotel.photos[0].src} alt={hotel.photos[0].alt} fill sizes="80px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="font-heading text-[15px] leading-snug font-bold text-pretty">{hotel.name}</p>
          <p className="mt-0.5 text-[13px] text-muted-foreground">
            {hotel.neighborhood}, {hotel.city}
          </p>
          <div className="mt-1.5">
            <RatingBadge score={hotel.rating} size="sm" />
          </div>
        </div>
      </div>

      <dl className="flex flex-col gap-2 border-t border-border pt-4 text-[13px]">
        <div className="flex items-start gap-2">
          <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <div>
            <dt className="text-muted-foreground">Даты</dt>
            <dd className="font-medium">
              {formatDateRange(search.checkIn, search.checkOut)} · {nightsLabel(nights)}
            </dd>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Users className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <div>
            <dt className="text-muted-foreground">Гости</dt>
            <dd className="font-medium">{formatGuestsDetailed(search)}</dd>
          </div>
        </div>
      </dl>

      <div className="border-t border-border pt-4">
        <p className="text-[13px] font-semibold">{room.name}</p>
        <ul className="mt-1.5 flex flex-col gap-1 text-[13px] text-muted-foreground">
          <li>{rate.mealLabel}</li>
          <li className="flex items-start gap-1.5">
            {rate.freeCancellation ? (
              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden="true" />
            ) : (
              <Ban className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
            )}
            <span className={rate.freeCancellation ? 'text-success' : undefined}>{rate.cancellationLabel}</span>
          </li>
          <li>{rate.occupancyLabel}</li>
        </ul>
      </div>

      <dl className="flex flex-col gap-1.5 border-t border-border pt-4 text-sm">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-muted-foreground">
            Проживание, {nightsLabel(nights)}
          </dt>
          <dd className="tabular font-medium">{formatPrice(roomPrice)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-muted-foreground">Налоги и сборы</dt>
          <dd className="tabular font-medium">{formatPrice(taxes)}</dd>
        </div>
        <div className="mt-1.5 flex items-baseline justify-between gap-3 border-t border-border pt-2.5">
          <dt className="font-heading font-bold">Итого</dt>
          <dd className="tabular font-heading text-xl font-bold">{formatPrice(total)}</dd>
        </div>
      </dl>

      <p className="rounded-lg bg-muted p-3 text-xs leading-relaxed text-muted-foreground">
        Цена указана в евро и включает налоги и сборы. Отель может запросить возвратный депозит при заселении.
      </p>
    </div>
  )
}
