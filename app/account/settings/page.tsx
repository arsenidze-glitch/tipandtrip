import type { Metadata } from 'next'

import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Настройки',
}

const notifications = [
  { id: 'n1', label: 'Подтверждения и изменения бронирований', hint: 'Отключить нельзя — это важные письма', locked: true },
  { id: 'n2', label: 'Напоминание за 3 дня до заезда', hint: 'Адрес отеля, время заселения, контакты' },
  { id: 'n3', label: 'Снижение цены на избранные отели', hint: 'Не чаще одного письма в неделю' },
  { id: 'n4', label: 'Акции и подборки направлений', hint: 'Раз в две недели' },
]

export default function AccountSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-heading text-2xl leading-tight font-bold sm:text-3xl">Настройки</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Уведомления, безопасность и удаление аккаунта.</p>
      </header>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-heading text-base font-bold">Уведомления на email</h2>
        <ul className="mt-4 flex flex-col divide-y divide-border">
          {notifications.map((item) => (
            <li key={item.id} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.hint}</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                disabled={item.locked}
                aria-label={item.label}
                className="mt-1 size-4 shrink-0 rounded border-input accent-primary disabled:opacity-50"
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-heading text-base font-bold">Безопасность</h2>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Пароль</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Последнее изменение — 3 месяца назад</p>
          </div>
          <Button variant="outline" size="sm">
            Сменить пароль
          </Button>
        </div>
      </section>

      <section className="rounded-2xl border border-destructive/30 bg-card p-5">
        <h2 className="font-heading text-base font-bold text-destructive">Удаление аккаунта</h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
          Все данные будут удалены безвозвратно. Активные бронирования при этом сохранятся — их можно будет
          отменить или изменить по номеру брони.
        </p>
        <Button variant="outline" size="sm" className="mt-4 border-destructive/40 text-destructive hover:bg-destructive/5">
          Удалить аккаунт
        </Button>
      </section>
    </div>
  )
}
