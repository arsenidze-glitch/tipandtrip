export function LogoMark({ className = 'size-9' }: { className?: string }) {
  return (
    <span className={`relative grid shrink-0 place-items-center ${className}`}>
      <svg viewBox="0 0 40 40" className="size-full" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="tt-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--azure)" />
            <stop offset="55%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--chart-4)" />
          </linearGradient>
        </defs>

        {/* Билетный корешок: скругленный квадрат с вырезами по бокам */}
        <path
          d="M8 2h24a6 6 0 0 1 6 6v6a6 6 0 0 0 0 12v6a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6v-6a6 6 0 0 0 0-12V8a6 6 0 0 1 6-6Z"
          fill="url(#tt-grad)"
        />

        {/* Маршрут: пунктирная дуга от точки старта к точке назначения */}
        <path
          d="M11 27c1.5-8 7-13 13.5-13.5"
          fill="none"
          stroke="oklch(1 0 0)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="0.1 4.6"
          opacity="0.9"
        />
        <circle cx="11" cy="27" r="2.6" fill="oklch(1 0 0)" />
        {/* Флажок-вершина «tip» */}
        <path d="M25 8.5v10.5l6.5-4.2Z" fill="var(--accent)" />
      </svg>
    </span>
  )
}

export function Logo() {
  return (
    <a
      href="/"
      className="flex shrink-0 items-center gap-2.5"
      aria-label="tipandtrip.com — на главную"
    >
      <LogoMark />
      <span className="font-heading text-[19px] leading-none font-extrabold tracking-tight">
        t<span className="text-primary">i</span>pandtr<span className="text-accent">i</span>p
        <span className="font-semibold text-muted-foreground">.com</span>
      </span>
    </a>
  )
}
