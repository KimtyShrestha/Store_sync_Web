import Link from "next/link"
import { ArrowRight, Zap, Shield, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Sync Your Store,
            <span className="text-[#B00020]"> Simplify Your Life</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 text-pretty">
            Store Sync helps you manage inventory, track sales, and grow your business with powerful analytics and
            real-time synchronization.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-3 bg-[#B00020] text-white rounded-lg hover:bg-[#8f001a] transition-colors font-semibold flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#B00020] hover:text-[#B00020] transition-colors font-semibold"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Everything you need to succeed
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-[#B00020] rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">
                Real-time synchronization ensures your inventory is always up-to-date across all platforms.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-[#B00020] rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Reliable</h3>
              <p className="text-gray-600">
                Enterprise-grade security keeps your data safe with automatic backups and encryption.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-[#B00020] rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Powerful Analytics</h3>
              <p className="text-gray-600">
                Get insights into your business with detailed reports and actionable metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="bg-[#B00020] rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust Store Sync to manage their inventory and sales.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#B00020] rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Create Free Account
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
