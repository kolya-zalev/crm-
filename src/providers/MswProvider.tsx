'use client'

import { useEffect, useState } from 'react'
import { Spinner } from '@/components/ui/spinner'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') return
  const { worker } = await import('@/mocks/browser')
  return worker.start({ onUnhandledRequest: 'bypass' })
}

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(process.env.NODE_ENV !== 'development')
  
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    enableMocking()
      .then(() => setReady(true))
      .catch((error) => {
        console.error('MSW failed to start', error)
        setReady(true)
      })
  }, [])

  if (!ready) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="size-8" />
      </div>
    )
  }

  return <>{children}</>
}
