'use client'
import { useEffect, useState } from 'react'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') return
  const { worker } = await import('@/mocks/browser')
  return worker.start({ onUnhandledRequest: 'bypass' })
}

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    enableMocking().then(() => setReady(true))
  }, [])

  if (!ready) return null
  return <>{children}</>
}