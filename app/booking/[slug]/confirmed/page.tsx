import { CalendarDays, CheckCircle2, Download, Mail, MapPin, MessageSquare, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { BookingSummary } from '@/components/booking/summary'
import { Logo } from '@/components/logo'
import { SiteFooter } from '@/components/site-footer'
import { buttonVariants } from '@/components/ui/button'
import { findRoomAndRate, rateTotal } from '@/lib/data/hotel-detail'
import { getHotel } from '@/lib/data/hotels'
import { formatKm } from '@/lib/format'
import { formatLongDate, hotelHref, parseSearchParams } from '@/lib/search'

export const metadata: Metadata = {
  title: 'Бронирование подтверждено',
  description: 'Бронирование подтверждено. Детали проживания и следующие шаги.',
  robots: { index: false, follow: false },
}

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

/** Номер брони в прототипе выводится из данных поиска, чтобы не зависеть от состояния сервера. */
function bookingReference(slug: string, checkIn: string) {
  const digits = checkIn.replace(/-/g, '').slice(2)
  const letters = slug.replace(/[^a-z]/g, '').slice(0, 3).toUpperCase()
  return `TT-${letters}-${digits}`
}

export default async function ConfirmedPage({ params, searchParams }: PageProps) {
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

  const guestName = typeof resolved.name === 'string' ? resolved.name : 'Гость'
  const email = typeof resolved.email === 'string' ? resolved.email : 'указанный адрес'
  const reference = bookingReference(hotel.slug, search.checkIn)

  return (
    <>
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center px-4">
          <Logo />
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pb-16">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 py-4 text-[13px] text-muted-foreground">
          <li>1. Выбор номера</li>
          <li aria-hidden="true">→</li>
          <li>2. Данные и оплата</li>
          <li aria-hidden="true">→</li>
          <li className="font-semibold text-foreground" aria-current="step">
            3. Подтверждение
          </li>
        </ol>

        <div className="rounded-2xl border border-success/30 bg-success-soft p-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-success">
            <CheckCircle2 className="size-5 shrink-0" aria-hidden="true" />
            Бронирование подтверждено
          </p>
          <h1 className="mt-3 font-heading text-2xl leading-tight font-bold text-balance sm:text-3xl">
            {guestName}, отель ждёт вас {formatLongDate(search.checkIn)}
          </h1>
          <p className="mt-2 text-sm text-secondary-foreground">
            Письмо с деталями отправлено на {email}. Отель уже получил вашу бронь.
          </p>
          <p className="tabular mt-4 inline-flex items-center gap-2 rounded-lg bg-card px-3 py-2 text-sm">
            <span className="text-muted-foreground">Номер брони</span>
            <span className="font-heading font-bold">{reference}</span>
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <div className="flex flex-col gap-6">
            <section
              aria-labelledby="next-title"
              className="rounded-2xl border border-border bg-card p-4 sm:p-5"
            >
              <h2 id="next-title" className="font-heading text-lg font-bold">
                Что дальше
              </h2>
              <ol className="mt-3 flex flex-col gap-3">
                {[
                  {
                    icon: Mail,
                    title: 'Проверьте письмо',
                    body: `Подтверждение с номером брони ${reference} и условиями тарифа придёт в течение 10 минут. Если письма нет — проверьте папку «Спам».`,
                  },
                  {
                    icon: CalendarDays,
                    title: rate.freeCancellation ? 'Запомните дату отмены' : 'Тариф невозвратный',
                    body: rate.cancellationDetail,
                  },
                  {
                    icon: Phone,
                    title: 'Закажите трансфер',
                    body: `От аэропорта до отеля примерно ${formatKm(hotel.airportDistanceKm)} км. Трансфер можно заказать в отеле заранее или взять такси на месте.`,
                  },
                  {
                    icon: MapPin,
                    title: 'Сохраните адрес',
                    body: `${hotel.address}. Покажите его водителю — на местном языке адрес понимают лучше.`,
                  },
                ].map((step) => (
                  <li key={step.title} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand"
                    >
                      <step.icon className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{step.title}</p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section
              aria-labelledby="actions-title"
              className="rounded-2xl border border-border bg-card p-4 sm:p-5"
            >
              <h2 id="actions-title" className="font-heading text-lg font-bold">
                Управление бронированием
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                  <Download className="size-4" aria-hidden="true" />
                  Скачать подтверждение
                </button>
                <button type="button" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                  <MessageSquare className="size-4" aria-hidden="true" />
                  Написать в отель
                </button>
                <Link
                  href={hotelHref(hotel.slug, search)}
                  className={buttonVariants({ variant: 'subtle', size: 'sm' })}
                >
                  Страница отеля
                </Link>
              </div>
              <p className="mt-3 text-[13px] text-muted-foreground">
                Поддержка Tip&Trip работает круглосуточно на русском языке. Номер брони {reference} понадобится
                при обращении.
              </p>
            </section>

            <div className="flex flex-wrap gap-2">
              <Link href="/" className={buttonVariants({ variant: 'primary' })}>
                Искать другие отели
              </Link>
            </div>
          </div>

          <div className="order-first lg:order-none">
            <BookingSummary hotel={hotel} room={room} rate={rate} search={search} total={total} />
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
