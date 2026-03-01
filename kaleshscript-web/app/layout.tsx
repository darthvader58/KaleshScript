import type { Metadata } from 'next'
import { Inter, Permanent_Marker } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const permanentMarker = Permanent_Marker({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-marker'
})

export const metadata: Metadata = {
  title: 'KaleshScript - Delhi ki Coding Language',
  description: 'Try KaleshScript online - A fun programming language with Delhi slang',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${permanentMarker.variable}`}>{children}</body>
    </html>
  )
}
