import "./globals.css"

import { cn } from "@/lib/utils"
import { lato, merriweather, notoSans, openSans } from "@/lib/fonts"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          notoSans.className
        )}
      >
        {children}
      </body>
    </html>
  )
}
