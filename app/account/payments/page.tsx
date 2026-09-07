import { CreditCard, Plus, ShieldCheck } from 'lucide-react'
import type { Metadata } from 'next'

import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Способы оплаты',
}

const cards = [
  { id: 'c1', brand: 'Visa', last4: '4242', expiry: '09/29', primary: true },
  { id: 'c2', brand: 'Mastercard', last4: '8810', expiry: '03/27', primary: false },
]

export default function AccountPaymentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl leading-tight font-bold sm:text-3xl">Способы оплаты</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Сохранённые карты ускоряют оформление. Мы храним только токен провайдера, а не номер карты.
          </p>
        </div>
        <Button variant="outline" size="md">
          <Plus className="size-4" aria-hidden="true" />
          Добавить карту
        </Button>
      </header>

      <ul className="flex flex-col gap-3">
        {cards.map((card) => (
          <li
            key={card.id}
            className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
              <CreditCard className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">
                {card.brand} <span className="tabular">•••• {card.last4}</span>
                {card.primary && (
                  <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                    Основная
                  </span>
                )}
              </p>
              <p className="tabular mt-0.5 text-[13px] text-muted-foreground">Действует до {card.expiry}</p>
            </div>
            <div className="flex gap-1">
              {!card.primary && (
                <Button variant="ghost" size="sm">
                  Сделать основной
                </Button>
              )}
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                Удалить
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <p className="flex items-start gap-2 rounded-xl bg-brand-soft p-4 text-[13px] leading-relaxed text-secondary-foreground">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
        При бронировании с тарифом «оплата в отеле» карта используется только как гарантия — списание происходит на
        месте.
      </p>
    </div>
  )
}
