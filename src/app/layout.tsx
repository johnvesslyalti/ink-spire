import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SessionProvider from '@/components/SessionProvider'

export const metadata = {
  title: 'Your App',
  description: 'Description',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider>
          <header><Navbar /></header>
          <main>{children}</main>
          <footer><Footer /></footer>
        </SessionProvider>
      </body>
    </html>
  )
}
