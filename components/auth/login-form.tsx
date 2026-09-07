'use client'

import { AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Mode = 'login' | 'register'
type Errors = Partial<Record<'email' | 'password' | 'name', string>>

const inputClass =
  'h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-primary'

export function LoginForm({ next = '/account' }: { next?: string }) {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email') ?? '').trim()
    const password = String(data.get('password') ?? '')
    const name = String(data.get('name') ?? '').trim()

    const nextErrors: Errors = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Введите корректный email'
    if (password.length < 6) nextErrors.password = 'Минимум 6 символов'
    if (mode === 'register' && name.length < 2) nextErrors.name = 'Укажите имя'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // Прототип: настоящей проверки пароля нет, просто переходим в кабинет
    setSubmitting(true)
    window.setTimeout(() => router.push(next), 600)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div role="tablist" aria-label="Вход или регистрация" className="grid grid-cols-2 rounded-lg bg-muted p-1">
        {(['login', 'register'] as Mode[]).map((value) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={mode === value}
            onClick={() => {
              setMode(value)
              setErrors({})
            }}
            className={cn(
              'h-9 rounded-md text-sm font-semibold transition-colors',
              mode === value ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {value === 'login' ? 'Войти' : 'Создать аккаунт'}
          </button>
        ))}
      </div>

      <h1 className="mt-6 font-heading text-2xl leading-tight font-bold text-balance">
        {mode === 'login' ? 'С возвращением' : 'Создайте аккаунт Tip&Trip'}
      </h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {mode === 'login'
          ? 'Управляйте бронированиями, сохраняйте отели и получайте цены для участников.'
          : 'Это займёт минуту. Скидки Genius начнут действовать сразу после первого бронирования.'}
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
        {mode === 'register' && (
          <Field label="Имя" error={errors.name}>
            <input
              name="name"
              autoComplete="given-name"
              placeholder="Как к вам обращаться"
              aria-invalid={errors.name ? true : undefined}
              className={cn(inputClass, errors.name && 'border-destructive')}
            />
          </Field>
        )}

        <Field label="Email" error={errors.email}>
          <input
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={errors.email ? true : undefined}
            className={cn(inputClass, errors.email && 'border-destructive')}
          />
        </Field>

        <Field
          label="Пароль"
          error={errors.password}
          action={
            mode === 'login' ? (
              <Link href="#" className="text-xs font-semibold text-primary hover:underline">
                Забыли пароль?
              </Link>
            ) : undefined
          }
        >
          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              placeholder={mode === 'login' ? 'Ваш пароль' : 'Минимум 6 символов'}
              aria-invalid={errors.password ? true : undefined}
              className={cn(inputClass, 'pr-11', errors.password && 'border-destructive')}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              className="absolute top-1/2 right-1.5 grid size-8 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </Field>

        {mode === 'login' && (
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="remember" defaultChecked className="size-4 rounded border-input accent-primary" />
            Запомнить меня на этом устройстве
          </label>
        )}

        <Button type="submit" size="lg" block disabled={submitting} className="mt-1">
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Входим…
            </>
          ) : mode === 'login' ? (
            'Войти'
          ) : (
            'Создать аккаунт'
          )}
        </Button>

        {mode === 'register' && (
          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            Нажимая «Создать аккаунт», вы соглашаетесь с{' '}
            <Link href="#" className="underline hover:text-foreground">
              условиями использования
            </Link>{' '}
            и{' '}
            <Link href="#" className="underline hover:text-foreground">
              политикой конфиденциальности
            </Link>
            .
          </p>
        )}
      </form>

      <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
        или
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Button type="button" variant="outline" size="md" block disabled title="Скоро">
          <GoogleMark />
          Google
        </Button>
        <Button type="button" variant="outline" size="md" block disabled title="Скоро">
          <AppleMark />
          Apple
        </Button>
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">Вход через соцсети появится скоро</p>
    </div>
  )
}

function Field({
  label,
  error,
  action,
  children,
}: {
  label: string
  error?: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center justify-between">
        <span className="text-[13px] font-semibold">{label}</span>
        {action}
      </span>
      {children}
      {error && (
        <span className="flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </span>
      )}
    </label>
  )
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.6 12.23c0-.68-.06-1.33-.17-1.96H12v3.7h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 2.98-4.32 2.98-7.26Z"
        opacity=".9"
      />
      <path
        fill="currentColor"
        d="M12 22c2.7 0 4.97-.9 6.62-2.42l-3.24-2.5c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.75-5.58-4.1H3.07v2.58A10 10 0 0 0 12 22Z"
        opacity=".7"
      />
      <path
        fill="currentColor"
        d="M6.42 13.93A6 6 0 0 1 6.1 12c0-.67.12-1.32.32-1.93V7.5H3.07A10 10 0 0 0 2 12c0 1.62.39 3.15 1.07 4.5l3.35-2.57Z"
        opacity=".5"
      />
      <path
        fill="currentColor"
        d="M12 5.96c1.47 0 2.78.5 3.82 1.5l2.86-2.87A9.98 9.98 0 0 0 12 2a10 10 0 0 0-8.93 5.5l3.35 2.57C7.2 7.72 9.4 5.96 12 5.96Z"
        opacity=".6"
      />
    </svg>
  )
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="currentColor">
      <path d="M16.37 12.6c.02 2.6 2.28 3.46 2.3 3.47-.02.06-.36 1.23-1.19 2.44-.71 1.05-1.45 2.09-2.62 2.11-1.15.02-1.51-.68-2.83-.68-1.31 0-1.72.66-2.8.7-1.13.04-1.98-1.13-2.7-2.17-1.47-2.12-2.59-6-1.08-8.62.75-1.3 2.09-2.13 3.54-2.15 1.11-.02 2.15.75 2.83.75.67 0 1.94-.92 3.27-.79.56.02 2.12.22 3.13 1.7-.08.05-1.87 1.09-1.85 3.24ZM14.2 6.28c.6-.72 1-1.73.89-2.73-.86.03-1.9.57-2.51 1.3-.55.64-1.04 1.66-.91 2.64.96.07 1.93-.49 2.53-1.21Z" />
    </svg>
  )
}
