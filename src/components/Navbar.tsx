'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/styles/components/ui/sheet'
import { Button } from '@/styles/components/ui/button'

const links = [
  { href: '/', label: 'Home' },
  { href: '/posts', label: 'Posts' },
  { href: '/create', label: 'Create' },
  { href: '/login', label: 'Login' },
  { href: '/signup', label: 'Sign Up' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => pathname === href

  return (
    <nav className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          BlogCraft
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium hover:text-blue-600 transition ${
                isActive(link.href) ? 'text-blue-600' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px]">
              <div className="flex flex-col gap-4 mt-4">
                {links.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-base font-medium hover:text-blue-600 ${
                      isActive(link.href) ? 'text-blue-600' : 'text-muted-foreground'
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
