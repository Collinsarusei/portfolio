import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Fira_Code } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'COLLINS ARUSEI // SYSTEM INTERFACE',
  description: 'Secure command interface for Collins Arusei - Software Developer',
  generator: 'v0.dev',
}

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const firaCode = Fira_Code({ 
  subsets: ['latin'],
  variable: '--font-fira-code',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable} dark`}>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <div className="grid-overlay min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
