'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/client'

export function GuestAuthProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false)
  const router = useRouter()

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const initGuestSession = async () => {
      const supabase = createClient()
      
      // 1. Check if a session cookie already exists
      const { data: { session } } = await supabase.auth.getSession()

      // 2. If no session exists, sign in anonymously and refresh server data
      if (!session) {
        const { error } = await supabase.auth.signInAnonymously()
        if (!error) {
          // Triggers Server Components to re-render with the new guest cookie
          router.refresh()
        } else {
          console.error('Anonymous sign-in failed:', error.message)
        }
      }
    }

    initGuestSession()
  }, [router])

  return <>{children}</>
}