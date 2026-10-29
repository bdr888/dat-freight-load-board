import { useId, type ReactNode } from 'react'
import { cn } from '../lib/utils'

type PageProps = {
  title: string
  eyebrow?: string
  description?: ReactNode
  headerContent?: ReactNode
  children: ReactNode
}

export default function Page({
  title,
  eyebrow,
  description,
  headerContent,
  children,
}: PageProps) {
  const titleId = useId()

  return (
    <section className="space-y-6" aria-labelledby={titleId}>
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          {eyebrow && (
            <p className="text-sm font-semibold tracking-wide text-blue-700">
              {eyebrow}
            </p>
          )}
          <h1
            id={titleId}
            className={cn(
              'text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl',
              eyebrow && 'mt-2'
            )}
          >
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              {description}
            </p>
          )}
        </div>
        {headerContent}
      </header>
      {children}
    </section>
  )
}
