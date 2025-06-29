import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t mt-12 bg-white text-muted-foreground">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} <span className="font-semibold text-black">BlogCraft</span>. All rights reserved.
        </div>

        <div className="flex gap-6 text-sm">
          <Link href="/about" className="hover:text-blue-600 transition">
            About
          </Link>
          <Link href="/privacy" className="hover:text-blue-600 transition">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-blue-600 transition">
            Terms
          </Link>
          <a
            href="https://github.com/johnvesslyalti"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
