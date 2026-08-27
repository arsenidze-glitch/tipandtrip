import {
  BedDouble,
  CalendarDays,
  CarFront,
  Globe,
  Heart,
  MapPin,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from 'lucide-react'

import { Logo } from '@/components/logo'

const services = [
  { label: 'Отели', icon: BedDouble, active: true },
  { label: 'Авиабилеты', icon: Plane },
  { label: 'Туры', icon: Sparkles },
  { label: 'Аренда авто', icon: CarFront },
  { label: 'Страховка', icon: ShieldCheck },
]

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-[1240px] items-center gap-6 px-4 py-3 lg:px-6">
        <Logo />

        <nav aria-label="Сервисы" className="no-scrollbar ml-2 hidden overflow-x-auto md:block">
          <ul className="flex items-center gap-1">
            {services.map((s) => (
              <li key={s.label}>
                <a
                  href="#"
                  aria-current={s.active ? 'page' : undefined}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    s.active
                      ? 'bg-secondary text-secondary-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <s.icon className="size-4" aria-hidden="true" />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:flex"
          >
            <Globe className="size-4" aria-hidden="true" />
            RUB · RU
          </button>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Избранное"
          >
            <Heart className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            <UserRound className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Войти</span>
          </button>
        </div>
      </div>

      <div className="border-t border-border bg-secondary/40">
        <form className="mx-auto flex max-w-[1240px] flex-col gap-2 px-4 py-3 lg:flex-row lg:px-6">
          <div className="flex flex-1 flex-col gap-2 sm:flex-row">
            <label className="flex flex-1 items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5">
              <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="sr-only">Направление</span>
              <input
                type="text"
                defaultValue="Кемер, Турция"
                className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
                placeholder="Город, отель или регион"
              />
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 sm:w-56">
              <CalendarDays className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="sr-only">Даты поездки</span>
              <input
                type="text"
                defaultValue="12 июн — 19 июн"
                className="w-full bg-transparent text-sm font-medium outline-none"
              />
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 sm:w-52">
              <Users className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="sr-only">Гости и номера</span>
              <input
                type="text"
                defaultValue="2 взрослых, 1 номер"
                className="w-full bg-transparent text-sm font-medium outline-none"
              />
            </label>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Search className="size-4" aria-hidden="true" />
            Найти
          </button>
        </form>
      </div>
    </header>
  )
}
