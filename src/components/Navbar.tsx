'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/styles/components/ui/sheet'
import { Button } from '@/styles/components/ui/button'
import { useBlogStore } from 'store/useAuth'

export default function Navbar() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const user = useBlogStore((state) => state.user)
    const logout = useBlogStore((state) => state.logout)

    const isActive = (href: string) => pathname === href

    const authLinks = [
        { href: '/signin', label: 'Sign In' },
        { href: '/signup', label: 'Sign Up' },
    ]

    const userLinks = [
        { href: '/', label: 'Home' },
        { href: '/create', label: 'Create' },
    ]

    const adminLinks = [
        { href: '/admin/users', label: 'Manage Users' },
    ]

    const linksToShow = user
        ? user.role === 'admin'
            ? [...userLinks, ...adminLinks]
            : userLinks
        : authLinks

    return (
        <nav className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-blue-600">
                    BlogCraft
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-6 items-center">
                    {linksToShow.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium hover:text-blue-600 transition ${isActive(link.href) ? 'text-blue-600' : 'text-muted-foreground'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {user && (
                        <button
                            onClick={logout}
                            className="text-sm font-medium text-red-600 hover:underline"
                        >
                            Logout
                        </button>
                    )}
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
                                {linksToShow.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`text-base font-medium hover:text-blue-600 ${isActive(link.href) ? 'text-blue-600' : 'text-muted-foreground'
                                            }`}
                                        onClick={() => setOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                {user && (
                                    <button
                                        onClick={() => {
                                            logout()
                                            setOpen(false)
                                        }}
                                        className="text-base font-medium text-red-600 hover:underline"
                                    >
                                        Logout
                                    </button>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}
