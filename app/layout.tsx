import type { Metadata } from "next"
import { Geist } from "next/font/google"
import Link from "next/link"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Myapp Todo",
  description: "Simple todo app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <nav className="border-b px-6 py-3 flex gap-4">
          <Link href="/" className="font-semibold">Todo</Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground">О приложении</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}