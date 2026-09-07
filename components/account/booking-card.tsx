import { CalendarCheck, ChevronRight, Download, MapPin, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Stars } from '@/components/rating-badge'
import { buttonVariants } from '@/components/ui/button'
import { bookingStatusLabel, type UserBooking } from '@/lib/data/account'
import { getHotel } from '@/lib/data/hotels'
import { formatPrice, nightsLabel, plural } from '@/lib/format'
import { formatDateRange, formatLongDate, hotelHref, nightsBetween } from '@/lib/search'
import { cn } from '@/lib/utils'

const statusClass: Record<UserBooking['status'], string> = {
  upcoming: 'bg-success-soft text-success',
  completed: 'bg-muted text-muted-foreground',
  cancelled: 'bg-destructive/10 text-destructive',
}

export function AccountBookingCard({ booking }: { booking: UserBooking }) {
  const hotel = getHotel(booking.hotelSlug)
  if (!hotel) return null

  const nights = nightsBetween(booking.search.checkIn, booking.search.checkOut)
  const guests = booking.search.adults + booking.search.childrenAges.length
  const cover = hotel.photos[0]

  return (
    <article
      className={cn(
        'overflow-hidden rounded-2xl border border-border bg-card',
        booking.status === 'cancelled' && 'opacity-80',
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-stretch">
        <Link
          href={hotelHref(hotel.slug, booking.search)}
          tabIndex={-1}
          aria-hidden="true"
          className="relative aspect-[16/9] w-full shrink-0 sm:aspect-auto sm:w-56 sm:min-h-44"
        >
          <Image src={cover.src} alt="" fill sizes="(max-width: 640px) 100vw, 224px" className="object-cover" />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:flex-row sm:gap-5">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-semibold', statusClass[booking.status])}>
                {bookingStatusLabel[booking.status]}
              </span>
              <span className="tabular text-xs text-muted-foreground">№ {booking.reference}</span>
            </div>

            <h3 className="mt-2 font-heading text-lg leading-snug font-bold text-pretty">
              <Link href={hotelHref(hotel.slug, booking.search)} className="rounded-sm hover:text-primary hover:underline">
                {hotel.name}
              </Link>
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Stars count={hotel.stars} />
              <span className="flex items-center gap-1 text-[13px] text-muted-foreground">
                <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                {hotel.neighborhood}, {hotel.city}
              </span>
            </div>

            <dl className="mt-3 grid gap-x-6 gap-y-1.5 text-[13px] sm:grid-cols-2">
              <div className="flex items-center gap-1.5">
                <CalendarCheck className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <dt className="sr-only">Даты</dt>
                <dd>
                  {formatDateRange(booking.search.checkIn, booking.search.checkOut)} · {nightsLabel(nights)}
                </dd>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <dt className="sr-only">Гости</dt>
                <dd>
                  {guests} {plural(guests, ['гость', 'гостя', 'гостей'])} · {booking.roomName}
                </dd>
              </div>
            </dl>

            {booking.status === 'upcoming' && booking.freeCancellationUntil && (
              <p className="mt-2.5 text-[13px] font-medium text-success">
                Бесплатная отмена до {formatLongDate(booking.freeCancellationUntil)}
              </p>
            )}
            {booking.status === 'upcoming' && !booking.freeCancellationUntil && (
              <p className="mt-2.5 text-[13px] text-muted-foreground">Невозвратный тариф</p>
            )}
          </div>

          <div className="flex shrink-0 flex-col gap-2 border-t border-border pt-3 sm:w-44 sm:items-end sm:justify-between sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5 sm:text-right">
            <div>
              <p className="text-xs text-muted-foreground">Оплачено {formatLongDate(booking.paidAt)}</p>
              <p className="tabular mt-0.5 font-heading text-xl font-extrabold">{formatPrice(booking.totalEur)}</p>
            </div>

            <div className="flex w-full flex-col gap-1.5">
              {booking.status === 'upcoming' ? (
                <>
                  <Link
                    href={`/booking/${hotel.slug}/confirmed?ref=${booking.reference}`}
                    className={buttonVariants({ variant: 'outline', size: 'sm', block: true })}
                  >
                    <Download className="size-4" aria-hidden="true" />
                    Ваучер
                  </Link>
                  <Link
                    href={`/booking/${hotel.slug}/confirmed?ref=${booking.reference}`}
                    className="inline-flex items-center justify-center gap-1 text-[13px] font-semibold text-primary hover:underline sm:justify-end"
                  >
                    Управлять
                    <ChevronRight className="size-4" aria-hidden="true" />
                  </Link>
                </>
              ) : (
                <Link
                  href={hotelHref(hotel.slug, booking.search)}
                  className={buttonVariants({ variant: 'outline', size: 'sm', block: true })}
                >
                  Забронировать снова
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
