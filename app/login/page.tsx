import { BadgePercent, CalendarCheck, Heart, ShieldCheck } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'

import { LoginForm } from '@/components/auth/login-form'
import { Logo } from '@/components/logo'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Вход в аккаунт',
  description: 'Войдите в Tip&Trip, чтобы управлять бронированиями, сохранять отели и получать цены для участников.',
  robots: { index: false, follow: false },
}

const perks = [
  { icon: CalendarCheck, title: 'Все бронирования в одном месте', body: 'Ваучеры, даты отмены и контакты отеля всегда под рукой.' },
  { icon: BadgePercent, title: 'Скидки Genius до 15%', body: 'Уровень растёт с каждым завершённым проживанием.' },
  { icon: Heart, title: 'Избранные отели', body: 'Сохраняйте варианты и сравнивайте цены на разные даты.' },
  { icon: ShieldCheck, title: 'Безопасная оплата', body: 'Данные карты не хранятся — только токен платёжного провайдера.' },
]

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const resolved = await searchParams
  const next = typeof resolved.next === 'string' && resolved.next.startsWith('/') ? resolved.next : '/account'

  return (
    <>
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center px-4">
          <Logo />
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center lg:py-16">
        <section className="hidden lg:block">
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl">
            <Image
              src="/home/hero-phuket.png"
              alt="Побережье Пхукета на закате"
              fill
              priority
              sizes="(max-width: 1024px) 0px, 640px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-8 text-primary-foreground">
              <p className="font-heading text-2xl leading-tight font-bold text-balance">
                Одно бронирование — и все планы поездки в кабинете
              </p>
              <p className="mt-1.5 text-sm opacity-90">Без звонков в отель и поиска писем в почте.</p>
            </div>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {perks.map((perk) => (
              <li key={perk.title} className="flex gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                  <perk.icon className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{perk.title}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">{perk.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <LoginForm next={next} />
      </main>

      <SiteFooter />
    </>
  )
}
