'use client'

import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

/**
 * Лёгкая обёртка для выпадающих панелей поиска: закрывается по клику вне,
 * по Escape и возвращает фокус на поле-триггер.
 */
export function FieldPopover({
  open,
  onClose,
  className,
  labelledBy,
  children,
}: {
  open: boolean
  onClose: () => void
  className?: string
  labelledBy?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: PointerEvent) {
      const node = ref.current
      if (!node) return
      const target = event.target as Node
      if (node.contains(target)) return
      if (node.parentElement?.contains(target)) return
      onClose()
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={ref}
      role="dialog"
      aria-labelledby={labelledBy}
      className={cn(
        'absolute top-[calc(100%+8px)] left-0 z-50 w-full min-w-full rounded-xl border border-border bg-popover p-2 shadow-[0_18px_44px_-16px_rgba(16,20,24,0.28)]',
        className,
      )}
    >
      {children}
    </div>
  )
}
