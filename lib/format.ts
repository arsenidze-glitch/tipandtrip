export const CURRENCIES = [
  { code: 'EUR', symbol: '€', label: 'Евро' },
  { code: 'USD', symbol: '$', label: 'Доллар США' },
  { code: 'GBP', symbol: '£', label: 'Фунт стерлингов' },
  { code: 'PLN', symbol: 'zł', label: 'Польский злотый' },
  { code: 'UAH', symbol: '₴', label: 'Гривна' },
] as const

export const LANGUAGES = [
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
  { code: 'pl', label: 'Polski' },
  { code: 'uk', label: 'Українська' },
] as const

const NBSP = '\u00A0'

/** Цены в прототипе хранятся в евро — единственной валюте с реальными данными. */
export function formatPrice(value: number, options?: { decimals?: boolean }) {
  const formatted = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: options?.decimals ? 2 : 0,
    maximumFractionDigits: options?.decimals ? 2 : 0,
  })
    .format(value)
    .replace(/\s/g, NBSP)
  return `€${formatted}`
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value).replace(/\s/g, NBSP)
}

export function plural(count: number, forms: [string, string, string]) {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return forms[0]
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1]
  return forms[2]
}

export function nightsLabel(count: number) {
  return `${count} ${plural(count, ['ночь', 'ночи', 'ночей'])}`
}

export function guestsLabel(count: number) {
  return `${count} ${plural(count, ['гость', 'гостя', 'гостей'])}`
}

export function reviewsLabel(count: number) {
  return `${formatNumber(count)} ${plural(count, ['отзыв', 'отзыва', 'отзывов'])}`
}

export function ratingLabel(score: number) {
  if (score >= 9) return 'Превосходно'
  if (score >= 8.5) return 'Отлично'
  if (score >= 8) return 'Очень хорошо'
  if (score >= 7) return 'Хорошо'
  return 'Неплохо'
}

export function formatScore(score: number) {
  return score.toFixed(1).replace('.', ',')
}
