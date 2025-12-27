import type React from "react"
import Header from "./_components/Header"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {children}
    </div>
  )
}
