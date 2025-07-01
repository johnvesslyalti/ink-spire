'use client'

import Navbar from "@/components/Navbar";
import './globals.css'
import Footer from "@/components/Footer";
import { useBlogStore } from "store/useBlogStore";
import { useEffect } from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    const setUser = useBlogStore((state) => state.setUser)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const result = await res.json()
        if (res.ok) {
          setUser(result.user)
        }
      } catch (err) {
        console.error('Failed to restore session', err)
      }
    }

    fetchUser()
  }, [setUser])
  
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
            <header>
                <Navbar />
            </header>
            <main>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </body>
      </html>
    </>
  )
}