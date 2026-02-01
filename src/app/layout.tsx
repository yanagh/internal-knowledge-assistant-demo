import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Internal Knowledge Assistant',
  description: 'Ask questions about internal company documents',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  )
}
