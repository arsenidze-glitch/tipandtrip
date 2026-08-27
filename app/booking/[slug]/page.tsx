import { ArrowLeft, ShieldCheck } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { BookingForm } from '@/components/booking/booking-form'
import { BookingSummary } from '@/components/booking/summary'
import { Logo } from '@/components/logo'
import { SiteFooter } from '@/components/site-footer'
import { findRoomAndRate, rateTotal } from '@/lib/data/hotel-detail'
import { getHotel } from '@/lib/data/hotels'
import { hotelHref, parseSearchParams } from '@/lib/search'

export const metadata: Metadata = {
  title: 'Оформление бронирования — Tip&Trip',
  description: 'Проверьте детали проживания, укажите данные гостя и подтвердите бронирование.',
  robots: { index: false, follow: false },
}

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function BookingPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const hotel = getHotel(slug)
  if (!hotel) notFound()

  const resolved = await searchParams
  const search = parseSearchParams(resolved)
  const roomId = typeof resolved.room === 'string' ? resolved.room : null
  const rateId = typeof resolved.rate === 'string' ? resolved.rate : null
  const { room, rate } = findRoomAndRate(roomId, rateId)

  const totalParam = Number(typeof resolved.total === 'string' ? resolved.total : NaN)
  const total = Number.isFinite(totalParam) && totalParam > 0 ? totalParam : rateTotal(rate)

  return (
    <>
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-4">
          <Logo />
          <p className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
            <ShieldCheck className="size-4 text-success" aria-hidden="true" />
            Защищённое оформление
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pb-16">
        <div className="py-4">
          <Link
            href={hotelHref(hotel.slug, search)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Вернуться к отелю
          </Link>
        </div>

        <ol className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted-foreground">
          <li>1. Выбор номера</li>
          <li aria-hidden="true">→</li>
          <li className="font-semibold text-foreground" aria-current="step">
            2. Данные и оплата
          </li>
          <li aria-hidden="true">→</li>
          <li>3. Подтверждение</li>
        </ol>

        <h1 className="font-heading text-2xl leading-tight font-bold text-balance sm:text-3xl">
          Оформление бронирования
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Осталось указать данные гостя и подтвердить оплату. Цена и условия тарифа уже зафиксированы.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <BookingForm hotel={hotel} room={room} rate={rate} search={search} total={total} />
          <div className="order-first lg:order-none lg:sticky lg:top-6">
            <BookingSummary hotel={hotel} room={room} rate={rate} search={search} total={total} />
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
