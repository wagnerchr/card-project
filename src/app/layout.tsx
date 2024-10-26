import '@/styles/globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='bg-[#f9f9f9]'>{children}</body>
    </html>
  )
}