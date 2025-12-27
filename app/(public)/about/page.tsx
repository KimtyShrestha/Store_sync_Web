import { Target, Users, Rocket } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-[#B00020]">Store Sync</span>
          </h1>
          <p className="text-xl text-gray-600 text-pretty">
            We're on a mission to help businesses of all sizes manage their inventory with confidence and ease.
          </p>
        </div>

        {/* Story Section */}
        <section className="bg-white rounded-xl p-8 sm:p-12 mb-12 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Store Sync was founded with a simple goal: make inventory management accessible and powerful for everyone.
              We understand the challenges of running a business, and we've built a platform that adapts to your needs.
            </p>
            <p>
              Whether you're a small boutique or a growing enterprise, Store Sync provides the tools you need to stay
              organized, make informed decisions, and scale your operations efficiently.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#B00020] rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Purpose Driven</h3>
            <p className="text-gray-600">We build features that solve real problems for real businesses.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#B00020] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer First</h3>
            <p className="text-gray-600">
              Your success is our success. We're here to support you every step of the way.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#B00020] rounded-full flex items-center justify-center mx-auto mb-4">
              <Rocket className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
            <p className="text-gray-600">We're constantly improving and adding features based on your feedback.</p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white rounded-xl p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#B00020] mb-2">10K+</div>
              <div className="text-gray-600 font-medium">Active Users</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#B00020] mb-2">50M+</div>
              <div className="text-gray-600 font-medium">Products Synced</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#B00020] mb-2">99.9%</div>
              <div className="text-gray-600 font-medium">Uptime</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#B00020] mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Support</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
