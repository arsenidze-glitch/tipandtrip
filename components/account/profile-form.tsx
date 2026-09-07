'use client'

import { Check, Loader2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import type { AccountUser } from '@/lib/data/account'

const inputClass =
  'h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-primary'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-semibold">{label}</span>
      {children}
    </label>
  )
}

export function ProfileForm({ user }: { user: AccountUser }) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('saving')
    // Прототип: сохранение имитируется
    window.setTimeout(() => setStatus('saved'), 700)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-heading text-base font-bold">Контакты</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Имя">
            <input name="firstName" defaultValue={user.firstName} autoComplete="given-name" className={inputClass} />
          </Field>
          <Field label="Фамилия">
            <input name="lastName" defaultValue={user.lastName} autoComplete="family-name" className={inputClass} />
          </Field>
          <Field label="Email">
            <input name="email" type="email" defaultValue={user.email} autoComplete="email" className={inputClass} />
          </Field>
          <Field label="Телефон">
            <input name="phone" type="tel" defaultValue={user.phone} autoComplete="tel" className={inputClass} />
          </Field>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Имя и фамилия должны совпадать с загранпаспортом — их видит отель при заселении.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-heading text-base font-bold">Предпочтения в поездках</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Валюта">
            <select name="currency" defaultValue="EUR" className={inputClass}>
              <option value="EUR">EUR — евро</option>
              <option value="USD">USD — доллар</option>
              <option value="RUB">RUB — рубль</option>
              <option value="THB">THB — бат</option>
            </select>
          </Field>
          <Field label="Язык">
            <select name="language" defaultValue="ru" className={inputClass}>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </Field>
        </div>
        <label className="mt-4 flex items-start gap-2.5 text-sm">
          <input type="checkbox" name="lateCheckin" defaultChecked className="mt-0.5 size-4 rounded border-input accent-primary" />
          <span>
            Обычно приезжаю поздно — предупреждать отель о позднем заезде
            <span className="block text-xs text-muted-foreground">Комментарий добавится к каждому бронированию автоматически</span>
          </span>
        </label>
      </section>

      <div className="flex items-center gap-3">
        <Button type="submit" size="md" disabled={status === 'saving'}>
          {status === 'saving' ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Сохраняем…
            </>
          ) : (
            'Сохранить изменения'
          )}
        </Button>
        {status === 'saved' && (
          <p role="status" className="flex items-center gap-1.5 text-sm font-medium text-success">
            <Check className="size-4" aria-hidden="true" />
            Сохранено
          </p>
        )}
      </div>
    </form>
  )
}
