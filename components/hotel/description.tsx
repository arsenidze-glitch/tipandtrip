import { BookOpen, PenLine } from 'lucide-react'
import { description, hotel } from '@/lib/hotel'
import { Section } from './section'

export function Description() {
  return (
    <Section
      id="description"
      eyebrow="Подробный обзор"
      title={`${hotel.name}: честное описание от редакции`}
      action={
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <PenLine className="size-3.5" aria-hidden="true" />
          Обновлено 18 февраля 2026
        </p>
      }
    >
      <nav
        aria-label="Содержание обзора"
        className="mb-7 rounded-xl border border-border bg-secondary/50 p-4"
      >
        <p className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <BookOpen className="size-3.5" aria-hidden="true" />
          В этом обзоре
        </p>
        <ol className="flex flex-wrap gap-x-5 gap-y-1.5">
          {description.sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-sm font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="max-w-3xl">
        {description.sections.map((s) => (
          <article key={s.id} id={s.id} className="scroll-mt-40 border-t border-border pt-6 first:border-t-0 first:pt-0 [&+&]:mt-8">
            <h3 className="text-pretty text-lg font-bold md:text-xl">{s.title}</h3>
            {s.paragraphs.map((p, i) => (
              <p key={i} className="mt-3 text-pretty text-[15px] leading-[1.75] text-muted-foreground">
                {p}
              </p>
            ))}
          </article>
        ))}
      </div>

      <p className="mt-8 rounded-xl border-l-2 border-primary bg-secondary/50 p-4 text-sm leading-relaxed text-muted-foreground">
        Обзор подготовлен редакцией tipandtrip.com на основе данных отеля, {hotel.reviewsCount.toLocaleString('ru-RU')}{' '}
        отзывов гостей и визита нашего автора в сентябре 2025 года. Мы не получаем оплату от отелей за
        упоминание и указываем недостатки так же подробно, как и достоинства.
      </p>
    </Section>
  )
}
