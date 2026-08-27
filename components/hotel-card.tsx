import {
  Ban,
  CalendarCheck,
  CreditCard,
  Footprints,
  MapPin,
  Utensils,
  Waves,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { RatingBadge, Stars } from '@/components/rating-badge'
import { hotelPerNight, hotelTotal, type Hotel } from '@/lib/data/hotels'
import { formatPrice, nightsLabel } from '@/lib/format'
import { hotelHref, type SearchContext } from '@/lib/search'
import { cn } from '@/lib/utils'

function beachLabel(meters: number) {
  if (meters >= 1000) return `${(meters / 1000).toFixed(1).replace('.', ',')} км до пляжа`
  return `${meters} м до пляжа`
}

/** Карточка отеля в списке результатов: горизонтальная на планшете и десктопе. */
export function HotelCard({
  hotel,
  search,
  nights,
}: {
  hotel: Hotel
  search: SearchContext
  nights: number
}) {
  const href = hotelHref(hotel.slug, search)
  const offer = hotel.offer
  const cover = hotel.photos[0]

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-[0_14px_36px_-22px_rgba(16,20,24,0.4)]">
      <div className="flex flex-col sm:flex-row">
        <Link
          href={href}
          className="relative block h-52 w-full shrink-0 sm:h-auto sm:w-64 lg:w-72"
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={cover.src}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 288px"
            className="object-cover"
          />
          <span className="absolute bottom-2 left-2 rounded-md bg-[rgba(16,20,24,0.72)] px-2 py-1 text-[11px] font-medium text-white">
            {hotel.photosCount} фото
          </span>
          {offer?.badge === 'recommended' && (
            <span className="absolute top-2 left-2 rounded-md bg-brand px-2 py-1 text-[11px] font-semibold text-brand-foreground">
              Рекомендуем
            </span>
          )}
          {offer?.badge === 'value' && (
            <span className="absolute top-2 left-2 rounded-md bg-success px-2 py-1 text-[11px] font-semibold text-white">
              Хорошая цена
            </span>
          )}
        </Link>

        <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 lg:flex-row lg:gap-6">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Stars count={hotel.stars} />
              <span className="text-xs text-muted-foreground">{hotel.propertyTypeLabel}</span>
              {hotel.chain && (
                <span className="text-xs text-muted-foreground">· {hotel.chain}</span>
              )}
            </div>

            <h3 className="mt-1 font-heading text-lg leading-snug font-bold text-pretty">
              <Link href={href} className="rounded-sm hover:text-primary hover:underline">
                {hotel.name}
              </Link>
            </h3>

            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                {hotel.neighborhood}
              </span>
              <span className="flex items-center gap-1">
                <Waves className="size-3.5 shrink-0" aria-hidden="true" />
                {beachLabel(hotel.beachDistanceM)}
              </span>
              <span className="flex items-center gap-1">
                <Footprints className="size-3.5 shrink-0" aria-hidden="true" />
                {hotel.centerDistanceKm} км до центра
              </span>
            </p>

            <RatingBadge score={hotel.rating} reviews={hotel.reviewsCount} size="sm" className="mt-3" />

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{hotel.summary}</p>

            {offer ? (
              <div className="mt-3 flex flex-col gap-1.5 text-[13px]">
                <p className="font-medium">{offer.roomName}</p>
                <p className="flex items-center gap-1.5 text-muted-foreground">
                  <Utensils className="size-3.5 shrink-0" aria-hidden="true" />
                  {offer.mealLabel}
                </p>
                <p
                  className={cn(
                    'flex items-center gap-1.5 font-medium',
                    offer.freeCancellation ? 'text-success' : 'text-muted-foreground',
                  )}
                >
                  {offer.freeCancellation ? (
                    <CalendarCheck className="size-3.5 shrink-0" aria-hidden="true" />
                  ) : (
                    <Ban className="size-3.5 shrink-0" aria-hidden="true" />
                  )}
                  {offer.cancellationLabel}
                </p>
                <p className="flex items-center gap-1.5 text-muted-foreground">
                  <CreditCard className="size-3.5 shrink-0" aria-hidden="true" />
                  {offer.paymentLabel}
                </p>
              </div>
            ) : (
              <p className="mt-3 rounded-lg bg-warning-soft px-3 py-2 text-[13px] text-[color:var(--warning)]">
                {hotel.soldOutNote ?? 'На выбранные даты свободных номеров нет.'}
              </p>
            )}
          </div>

          <div className="flex shrink-0 flex-col items-start gap-2 border-t border-border pt-3 lg:w-52 lg:items-end lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6 lg:text-right">
            {offer ? (
              <>
                <p className="text-xs text-muted-foreground">
                  {nightsLabel(nights)}, {search.adults + search.childrenAges.length} гостя
                </p>
                <p className="tabular font-heading text-2xl font-extrabold">
                  {formatPrice(hotelTotal(offer))}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatPrice(hotelPerNight(offer, nights))} за ночь · налоги и сборы включены
                </p>
                {offer.roomsLeft != null && (
                  <p className="text-[13px] font-semibold text-[color:var(--destructive)]">
                    Осталось {offer.roomsLeft} номера
                  </p>
                )}
                <Link
                  href={href}
                  className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[#0356b8] lg:w-auto lg:px-5"
                >
                  Показать номера
                </Link>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold">Нет мест на эти даты</p>
                <Link
                  href={href}
                  className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-lg border border-[color:var(--border-strong)] bg-card px-4 text-sm font-semibold transition-colors hover:bg-muted lg:w-auto lg:px-5"
                >
                  Открыть отель
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

/** Компактная плитка для подборок на главной. */
export function HotelTile({
  hotel,
  search,
  nights,
}: {
  hotel: Hotel
  search: SearchContext
  nights: number
}) {
  const offer = hotel.offer
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-[0_14px_36px_-22px_rgba(16,20,24,0.4)]">
      <Link href={hotelHref(hotel.slug, search)} className="relative block h-44" aria-hidden="true" tabIndex={-1}>
        <Image
          src={hotel.photos[0].src}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
          className="object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2">
          <Stars count={hotel.stars} />
          <span className="text-xs text-muted-foreground">{hotel.neighborhood}</span>
        </div>
        <h3 className="mt-1.5 font-heading text-base leading-snug font-bold text-pretty">
          <Link href={hotelHref(hotel.slug, search)} className="rounded-sm hover:text-primary hover:underline">
            {hotel.name}
          </Link>
        </h3>
        <RatingBadge score={hotel.rating} reviews={hotel.reviewsCount} size="sm" className="mt-2.5" />
        <p className="mt-2 text-[13px] text-muted-foreground">{beachLabel(hotel.beachDistanceM)}</p>
        <div className="mt-auto pt-3">
          {offer ? (
            <p className="flex items-baseline gap-1.5">
              <span className="tabular font-heading text-lg font-extrabold">
                {formatPrice(hotelPerNight(offer, nights))}
              </span>
              <span className="text-xs text-muted-foreground">за ночь, со сборами</span>
            </p>
          ) : (
            <p className="text-[13px] text-muted-foreground">Нет мест на выбранные даты</p>
          )}
        </div>
      </div>
    </article>
  )
}
