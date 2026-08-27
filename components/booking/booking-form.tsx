'use client'

import { AlertCircle, Loader2, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useId, useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import type { RatePlan, RoomType } from '@/lib/data/hotel-detail'
import type { Hotel } from '@/lib/data/hotels'
import { formatPrice } from '@/lib/format'
import { searchToParams, type SearchContext } from '@/lib/search'
import { cn } from '@/lib/utils'

type Errors = Partial<Record<'firstName' | 'lastName' | 'email' | 'phone' | 'card' | 'terms', string>>

const inputClass =
  'h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-primary'

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-semibold">{label}</span>
      {children}
      {hint && !error && <span className="text-xs text-muted-foreground">{hint}</span>}
      {error && (
        <span className="flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </span>
      )}
    </label>
  )
}

export function BookingForm({
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
  const router = useRouter()
  const formId = useId()
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const next: Errors = {}

    const firstName = String(data.get('firstName') ?? '').trim()
    const lastName = String(data.get('lastName') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const card = String(data.get('card') ?? '').replace(/\s/g, '')

    if (firstName.length < 2) next.firstName = 'Укажите имя латиницей, как в паспорте'
    if (lastName.length < 2) next.lastName = 'Укажите фамилию латиницей, как в паспорте'
    if (!/^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/.test(email)) next.email = 'Проверьте адрес электронной почты'
    if (phone.replace(/\D/g, '').length < 10) next.phone = 'Введите телефон с кодом страны'
    if (card.length < 12 || !/^\d+$/.test(card)) next.card = 'Введите 16 цифр номера карты'
    if (!data.get('terms')) next.terms = 'Подтвердите согласие с правилами бронирования'

    setErrors(next)
    if (Object.keys(next).length > 0) {
      document.getElementById(`${formId}-error-summary`)?.scrollIntoView({ block: 'center' })
      return
    }

    setSubmitting(true)
    const params = searchToParams(search)
    params.set('room', room.id)
    params.set('rate', rate.id)
    params.set('total', String(total))
    params.set('name', `${firstName} ${lastName}`)
    params.set('email', email)

    window.setTimeout(() => {
      router.push(`/booking/${hotel.slug}/confirmed?${params.toString()}`)
    }, 900)
  }

  const errorCount = Object.keys(errors).length

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {errorCount > 0 && (
        <div
          id={`${formId}-error-summary`}
          role="alert"
          className="rounded-xl border border-destructive/40 bg-destructive-soft p-4 text-sm"
        >
          <p className="font-semibold text-destructive">Проверьте данные перед оплатой</p>
          <ul className="mt-1.5 flex list-disc flex-col gap-1 pl-5 text-secondary-foreground">
            {Object.values(errors).map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      <section aria-labelledby="guest-title" className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <h2 id="guest-title" className="font-heading text-lg font-bold">
          Данные гостя
        </h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Имя и фамилию укажите латиницей, как в загранпаспорте — отель сверяет их при заселении.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Имя (латиницей)" error={errors.firstName}>
            <input
              name="firstName"
              autoComplete="given-name"
              placeholder="Ivan"
              aria-invalid={errors.firstName ? true : undefined}
              className={cn(inputClass, errors.firstName && 'border-destructive')}
            />
          </Field>
          <Field label="Фамилия (латиницей)" error={errors.lastName}>
            <input
              name="lastName"
              autoComplete="family-name"
              placeholder="Ivanov"
              aria-invalid={errors.lastName ? true : undefined}
              className={cn(inputClass, errors.lastName && 'border-destructive')}
            />
          </Field>
          <Field label="Электронная почта" hint="На этот адрес придёт подтверждение брони" error={errors.email}>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="ivan@example.com"
              aria-invalid={errors.email ? true : undefined}
              className={cn(inputClass, errors.email && 'border-destructive')}
            />
          </Field>
          <Field label="Телефон" hint="С кодом страны, для связи отеля" error={errors.phone}>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+7 900 000 00 00"
              aria-invalid={errors.phone ? true : undefined}
              className={cn(inputClass, errors.phone && 'border-destructive')}
            />
          </Field>
        </div>
      </section>

      <section aria-labelledby="requests-title" className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <h2 id="requests-title" className="font-heading text-lg font-bold">
          Пожелания к заселению
        </h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Отель выполняет пожелания при возможности и не гарантирует их. Доплаты в пожеланиях не оформляются.
        </p>

        <div className="mt-4 flex flex-col gap-2">
          {[
            'Номер на высоком этаже',
            'Номер подальше от дороги',
            'Детская кроватка',
            'Ранний заезд (по возможности)',
            'Трансфер из аэропорта — свяжитесь со мной',
          ].map((option) => (
            <label key={option} className="flex items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                name="requests"
                value={option}
                className="size-4 shrink-0 rounded-sm accent-[color:var(--primary)]"
              />
              {option}
            </label>
          ))}
        </div>

        <Field label="Комментарий отелю" hint="До 300 символов, на английском или русском">
          <textarea
            name="comment"
            rows={3}
            maxLength={300}
            placeholder="Например: приедем около 22:00"
            className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-primary"
          />
        </Field>
      </section>

      <section aria-labelledby="payment-title" className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <h2 id="payment-title" className="font-heading text-lg font-bold">
          Оплата
        </h2>
        <p className="mt-1 flex items-start gap-1.5 text-[13px] text-muted-foreground">
          <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          Прототип: данные карты не передаются и не сохраняются. {rate.paymentLabel}.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Номер карты" error={errors.card}>
              <input
                name="card"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="0000 0000 0000 0000"
                aria-invalid={errors.card ? true : undefined}
                className={cn(inputClass, 'tabular', errors.card && 'border-destructive')}
              />
            </Field>
          </div>
          <Field label="Срок действия">
            <input
              name="expiry"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="ММ/ГГ"
              className={cn(inputClass, 'tabular')}
            />
          </Field>
          <Field label="CVC">
            <input
              name="cvc"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="000"
              className={cn(inputClass, 'tabular')}
            />
          </Field>
        </div>

        <div className="mt-4 rounded-xl bg-muted p-3 text-[13px] leading-relaxed">
          <p className="font-semibold">{rate.cancellationLabel}</p>
          <p className="mt-0.5 text-muted-foreground">{rate.cancellationDetail}</p>
        </div>

        <label className="mt-4 flex items-start gap-2.5 text-[13px]">
          <input
            type="checkbox"
            name="terms"
            aria-invalid={errors.terms ? true : undefined}
            className="mt-0.5 size-4 shrink-0 rounded-sm accent-[color:var(--primary)]"
          />
          <span>
            Я согласен с правилами бронирования, условиями отмены выбранного тарифа и обработкой персональных
            данных.
          </span>
        </label>
        {errors.terms && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-destructive">
            <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
            {errors.terms}
          </p>
        )}

        <Button type="submit" size="lg" block disabled={submitting} className="mt-4">
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Подтверждаем бронирование…
            </>
          ) : (
            <>Оплатить {formatPrice(total)}</>
          )}
        </Button>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Нажимая кнопку, вы завершаете бронирование в {hotel.name}
        </p>
      </section>
    </form>
  )
}
