"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#B00020] flex items-center justify-center rounded">
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">Store Sync</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-[#B00020] transition-colors font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-[#B00020] transition-colors font-medium">
              About
            </Link>
            <Link
              href="/login"
              className="px-5 py-2 bg-[#B00020] text-white rounded-lg hover:bg-[#8f001a] transition-colors font-medium"
            >
              Login
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-[#B00020] transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-[#B00020] transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/login"
                className="px-5 py-2 bg-[#B00020] text-white rounded-lg hover:bg-[#8f001a] transition-colors font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
