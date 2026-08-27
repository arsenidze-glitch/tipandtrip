'use client'

import {
  AlertTriangle,
  Ban,
  BedDouble,
  CalendarCheck,
  Check,
  CreditCard,
  Eye,
  Info,
  Loader2,
  Maximize2,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button, buttonVariants } from '@/components/ui/button'
import { rateTotal, rooms, type RatePlan, type RecheckOutcome, type RoomType } from '@/lib/data/hotel-detail'
import { formatPrice, nightsLabel } from '@/lib/format'
import { bookingHref, nightsBetween, searchHref, type SearchContext } from '@/lib/search'
import { cn } from '@/lib/utils'

type Recheck =
  | { state: 'idle' }
  | { state: 'checking'; roomId: string; rateId: string }
  | { state: 'result'; roomId: string; rateId: string; outcome: RecheckOutcome; total: number }

export function RoomsSection({
  search,
  slug,
  soldOut = false,
  soldOutNote,
}: {
  search: SearchContext
  slug: string
  /** Поставщик не вернул цен на выбранные даты — тарифы показывать нельзя */
  soldOut?: boolean
  soldOutNote?: string
}) {
  const router = useRouter()
  const nights = nightsBetween(search.checkIn, search.checkOut)
  const guests = search.adults + search.childrenAges.length
  const [recheck, setRecheck] = useState<Recheck>({ state: 'idle' })

  /**
   * Прототип имитирует повторную проверку цены у поставщика: она обязательна,
   * потому что тариф мог измениться с момента загрузки страницы.
   */
  function startRecheck(room: RoomType, rate: RatePlan) {
    setRecheck({ state: 'checking', roomId: room.id, rateId: rate.id })
    const base = rateTotal(rate)
    window.setTimeout(() => {
      const outcome = rate.recheck.outcome
      const delta = rate.recheck.delta ?? 0
      const total =
        outcome === 'increased' ? base + delta : outcome === 'decreased' ? base - delta : base
      setRecheck({ state: 'result', roomId: room.id, rateId: rate.id, outcome, total })
    }, 1100)
  }

  function proceed(room: RoomType, rate: RatePlan, total: number) {
    router.push(bookingHref(slug, search, { roomId: room.id, rateId: rate.id, total }))
  }

  if (soldOut) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <Ban className="size-4 shrink-0 text-[color:var(--danger)]" aria-hidden="true" />
          Нет мест на выбранные даты
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          {soldOutNote ??
            `На ${search.checkIn.split('-').reverse().join('.')} поставщик не вернул свободных номеров.`}{' '}
          Описание отеля, фотографии и условия ниже остаются доступными — измените даты или посмотрите
          похожие отели.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={searchHref(search)} className={buttonVariants({ variant: 'primary', size: 'sm' })}>
            Изменить даты
          </Link>
          <a href="#similar" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
            Похожие отели
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Цены указаны за {nightsLabel(nights)} для {guests} гостей и включают налоги и сборы.
      </p>

      {rooms.map((room) => (
        <article key={room.id} className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row">
            <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-48">
              <Image
                src={room.photo}
                alt={room.photoAlt}
                fill
                sizes="(max-width: 640px) 100vw, 192px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-heading text-lg leading-snug font-bold text-pretty">{room.name}</h3>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <Maximize2 className="size-3.5 shrink-0" aria-hidden="true" />
                  {room.sizeM2} м²
                </li>
                <li className="flex items-center gap-1.5">
                  <BedDouble className="size-3.5 shrink-0" aria-hidden="true" />
                  {room.beds}
                </li>
                <li className="flex items-center gap-1.5">
                  <Users className="size-3.5 shrink-0" aria-hidden="true" />
                  до {room.maxGuests} гостей
                </li>
                <li className="flex items-center gap-1.5">
                  <Eye className="size-3.5 shrink-0" aria-hidden="true" />
                  {room.view}
                </li>
              </ul>
              <p className="mt-2 text-[13px] text-muted-foreground">{room.childPolicy}</p>

              {!room.fitsSearch && room.fitsNote && (
                <p className="mt-3 flex items-start gap-2 rounded-lg bg-warning-soft px-3 py-2 text-[13px] text-[color:var(--warning)]">
                  <AlertTriangle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                  {room.fitsNote}
                </p>
              )}

              <details className="mt-3">
                <summary className="cursor-pointer text-[13px] font-semibold text-primary">
                  Что в номере
                </summary>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {room.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-[13px] text-muted-foreground">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden="true" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </div>

          <ul className="flex flex-col">
            {room.rates.map((rate) => {
              const total = rateTotal(rate)
              const isTarget =
                recheck.state !== 'idle' && recheck.roomId === room.id && recheck.rateId === rate.id
              const checking = isTarget && recheck.state === 'checking'
              const result = isTarget && recheck.state === 'result' ? recheck : null

              return (
                <li
                  key={rate.id}
                  className="flex flex-col gap-4 border-b border-border p-4 last:border-b-0 lg:flex-row lg:items-start"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold">{rate.mealLabel}</p>
                      {rate.recommended && (
                        <span className="rounded-md bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-[color:var(--brand)]">
                          Выгодный выбор
                        </span>
                      )}
                    </div>

                    <p
                      className={cn(
                        'mt-2 flex items-start gap-1.5 text-[13px] font-medium',
                        rate.freeCancellation ? 'text-success' : 'text-muted-foreground',
                      )}
                    >
                      {rate.freeCancellation ? (
                        <CalendarCheck className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                      ) : (
                        <Ban className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                      )}
                      <span>
                        {rate.cancellationLabel}
                        <span className="mt-0.5 block font-normal text-muted-foreground">
                          {rate.cancellationDetail}
                        </span>
                      </span>
                    </p>

                    <p className="mt-2 flex items-center gap-1.5 text-[13px] text-muted-foreground">
                      <CreditCard className="size-3.5 shrink-0" aria-hidden="true" />
                      {rate.paymentLabel}
                    </p>
                    <p className="mt-2 flex items-center gap-1.5 text-[13px] text-muted-foreground">
                      <Users className="size-3.5 shrink-0" aria-hidden="true" />
                      Размещение: {rate.occupancyLabel}
                    </p>

                    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      {rate.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-1.5 text-[13px]">
                          <Check className="size-3.5 shrink-0 text-success" aria-hidden="true" />
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    {rate.roomsLeft != null && (
                      <p className="mt-2 text-[13px] font-semibold text-[color:var(--destructive)]">
                        Осталось {rate.roomsLeft}{' '}
                        {rate.roomsLeft === 1 ? 'номер' : 'номера'} по этому тарифу
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-col gap-2 lg:w-64 lg:items-end lg:text-right">
                    <p className="tabular font-heading text-xl font-extrabold">{formatPrice(total)}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(Math.round(total / nights))} за ночь · налоги и сборы включены
                    </p>

                    {result ? (
                      <RecheckResult
                        outcome={result.outcome}
                        oldTotal={total}
                        newTotal={result.total}
                        onAccept={() => proceed(room, rate, result.total)}
                        onReset={() => setRecheck({ state: 'idle' })}
                      />
                    ) : (
                      <Button
                        block
                        disabled={checking}
                        onClick={() => startRecheck(room, rate)}
                        className="lg:w-auto"
                      >
                        {checking ? (
                          <>
                            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                            Проверяем цену
                          </>
                        ) : (
                          'Выбрать'
                        )}
                      </Button>
                    )}

                    {checking && (
                      <p className="text-xs text-muted-foreground" aria-live="polite">
                        Запрашиваем актуальную цену у поставщика
                      </p>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </article>
      ))}

      <p className="flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-[13px] text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        Перед переходом к бронированию цена перепроверяется у поставщика. Если она изменилась, вы
        увидите старую и новую сумму и сможете отказаться.
      </p>
    </div>
  )
}

function RecheckResult({
  outcome,
  oldTotal,
  newTotal,
  onAccept,
  onReset,
}: {
  outcome: RecheckOutcome
  oldTotal: number
  newTotal: number
  onAccept: () => void
  onReset: () => void
}) {
  if (outcome === 'unavailable') {
    return (
      <div
        role="status"
        className="w-full rounded-xl border border-[color:var(--destructive)] bg-destructive-soft p-3 text-left"
      >
        <p className="flex items-center gap-1.5 text-[13px] font-semibold text-[color:var(--destructive)]">
          <AlertTriangle className="size-3.5 shrink-0" aria-hidden="true" />
          Тариф только что раскупили
        </p>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Поставщик больше не подтверждает этот тариф. Выберите другой вариант из списка.
        </p>
        <Button variant="outline" size="sm" block className="mt-2" onClick={onReset}>
          Вернуться к тарифам
        </Button>
      </div>
    )
  }

  if (outcome === 'confirmed') {
    return (
      <div role="status" className="w-full rounded-xl border border-border bg-success-soft p-3 text-left">
        <p className="flex items-center gap-1.5 text-[13px] font-semibold text-[color:var(--success)]">
          <Check className="size-3.5 shrink-0" aria-hidden="true" />
          Цена подтверждена: {formatPrice(newTotal)}
        </p>
        <Button size="sm" block className="mt-2" onClick={onAccept}>
          Перейти к бронированию
        </Button>
      </div>
    )
  }

  const increased = outcome === 'increased'
  return (
    <div
      role="status"
      className={cn(
        'w-full rounded-xl border p-3 text-left',
        increased
          ? 'border-[color:var(--warning)] bg-warning-soft'
          : 'border-border bg-success-soft',
      )}
    >
      <p
        className={cn(
          'flex items-center gap-1.5 text-[13px] font-semibold',
          increased ? 'text-[color:var(--warning)]' : 'text-[color:var(--success)]',
        )}
      >
        {increased ? (
          <TrendingUp className="size-3.5 shrink-0" aria-hidden="true" />
        ) : (
          <TrendingDown className="size-3.5 shrink-0" aria-hidden="true" />
        )}
        {increased ? 'Цена выросла' : 'Цена снизилась'}
      </p>
      <p className="mt-1 text-[13px] text-muted-foreground">
        Было <span className="line-through">{formatPrice(oldTotal)}</span>, стало{' '}
        <span className="font-semibold text-foreground">{formatPrice(newTotal)}</span>.
      </p>
      <div className="mt-2 flex flex-col gap-2">
        <Button size="sm" block onClick={onAccept}>
          Продолжить за {formatPrice(newTotal)}
        </Button>
        <Button variant="outline" size="sm" block onClick={onReset}>
          Выбрать другой тариф
        </Button>
      </div>
    </div>
  )
}
