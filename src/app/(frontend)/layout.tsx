import React from 'react'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className="h-full">
      <body className="flex items-center justify-center min-h-full m-0 bg-[#f6f5f7]">
        <main className="flex items-center justify-center w-full h-full">
          {children}
        </main>
      </body>
    </html>
  )
}


