import { Search } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { AccountBookingCard } from '@/components/account/booking-card'
import { buttonVariants } from '@/components/ui/button'
import { accountUser, userBookings } from '@/lib/data/account'
import { plural } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Мои бронирования',
}

export default function AccountBookingsPage() {
  const upcoming = userBookings.filter((booking) => booking.status === 'upcoming')
  const past = userBookings.filter((booking) => booking.status !== 'upcoming')

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl leading-tight font-bold sm:text-3xl">
            Здравствуйте, {accountUser.firstName}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            У вас {upcoming.length} {plural(upcoming.length, ['предстоящая поездка', 'предстоящие поездки', 'предстоящих поездок'])}{' '}
            и {accountUser.completedStays} {plural(accountUser.completedStays, ['завершённое проживание', 'завершённых проживания', 'завершённых проживаний'])}.
          </p>
        </div>
        <Link href="/" className={buttonVariants({ size: 'md' })}>
          <Search className="size-4" aria-hidden="true" />
          Найти отель
        </Link>
      </header>

      <section aria-labelledby="upcoming-title" className="flex flex-col gap-3">
        <h2 id="upcoming-title" className="font-heading text-lg font-bold">
          Предстоящие
        </h2>
        {upcoming.length > 0 ? (
          upcoming.map((booking) => <AccountBookingCard key={booking.id} booking={booking} />)
        ) : (
          <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            Предстоящих поездок пока нет.
          </p>
        )}
      </section>

      <section aria-labelledby="past-title" className="flex flex-col gap-3">
        <h2 id="past-title" className="font-heading text-lg font-bold">
          Прошедшие и отменённые
        </h2>
        {past.map((booking) => (
          <AccountBookingCard key={booking.id} booking={booking} />
        ))}
      </section>
    </div>
  )
}
