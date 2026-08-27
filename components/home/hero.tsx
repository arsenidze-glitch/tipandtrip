import { BadgeCheck, Clock3, Receipt } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { SearchForm } from '@/components/search/search-form'
import { recentSearchHref, recentSearches } from '@/lib/data/content'

const promises = [
  {
    icon: Receipt,
    title: 'Цена со всеми сборами',
    text: 'Налоги и сервисный сбор уже в сумме — сравнивать проще.',
  },
  {
    icon: Clock3,
    title: 'Точный срок отмены',
    text: 'Дата и время, до которых отмена бесплатна, а не «зависит от отеля».',
  },
  {
    icon: BadgeCheck,
    title: 'Честные детали',
    text: 'Расстояния в метрах, состав номера и правила размещения детей.',
  },
]

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/home/hero-phuket.png"
        alt="Побережье Пхукета с бирюзовой водой и зелёными склонами"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,17,24,0.72)_0%,rgba(8,17,24,0.45)_45%,rgba(8,17,24,0.7)_100%)]"
        aria-hidden="true"
      />

      <div className="mx-auto flex max-w-[1240px] flex-col px-4 pt-14 pb-10 lg:px-6 lg:pt-20 lg:pb-14">
        <p className="text-sm font-semibold tracking-wide text-white/80 uppercase">
          Smart tips. Better trips.
        </p>
        <h1 className="mt-3 max-w-3xl font-heading text-3xl leading-tight font-extrabold text-balance text-white sm:text-4xl lg:text-[44px]">
          Отель, который подойдёт именно вашей поездке
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85">
          Сравнивайте варианты по деталям, которые реально влияют на отдых: расстояние до пляжа,
          питание, условия отмены и размещение детей. Полная стоимость видна сразу.
        </p>

        <div className="mt-8">
          <SearchForm />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-sm text-white/75">Недавние поиски:</span>
          {recentSearches.map((item) => (
            <Link
              key={item.title}
              href={recentSearchHref(item)}
              className="flex items-center gap-2 rounded-lg border border-white/25 bg-white/12 px-3 py-1.5 text-[13px] text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <span className="font-semibold">{item.title}</span>
              <span className="hidden text-white/75 sm:inline">{item.meta}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-white/15 bg-[rgba(8,17,24,0.55)] backdrop-blur-sm">
        <ul className="mx-auto grid max-w-[1240px] gap-4 px-4 py-5 sm:grid-cols-3 lg:px-6">
          {promises.map((promise) => (
            <li key={promise.title} className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/15 text-white">
                <promise.icon className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white">{promise.title}</span>
                <span className="block text-[13px] leading-relaxed text-white/75">{promise.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
