'use client'

import { useEffect } from 'react'
import { useBlogStore } from 'store/useAuth'

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const setUser = useBlogStore((state) => state.setUser)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error('Session fetch failed')
        const data = await res.json()
        setUser(data.user)
      } catch (err) {
        console.error('Session restore failed', err)
      }
    }

    fetchUser()
  }, [setUser])

  return <>{children}</>
}
