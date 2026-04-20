import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0a0f",
}

export const metadata: Metadata = {
  title: 'MSTRMND - Architect Your Reality',
  description: 'Build systems, not apps. Turn intent into execution with MSTRMND.',
  generator: 'v0.app',
  manifest: '/manifest.json',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'MSTRMND - Architect Your Reality',
    description: 'Build systems, not apps. Turn intent into execution with MSTRMND.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MSTRMND - Architect Your Reality',
    description: 'Build systems, not apps. Turn intent into execution with MSTRMND.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body className="font-sans antialiased min-h-screen bg-background text-foreground overflow-x-hidden">
        <div className="relative">
          {children}
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
