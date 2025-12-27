import { Package, TrendingUp, Users, DollarSign, ArrowRight } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#B00020] flex items-center justify-center rounded">
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Store Sync</span>
            </div>
            <button className="text-gray-600 hover:text-gray-900 font-medium">Logout</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl p-8 mb-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to your Dashboard! 🎉</h1>
          <p className="text-gray-600 text-lg">
            You've successfully logged in. Here's an overview of your store's performance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="text-blue-600" size={24} />
              </div>
              <span className="text-green-600 text-sm font-semibold">+12%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">1,234</div>
            <div className="text-gray-600 text-sm">Total Products</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <span className="text-green-600 text-sm font-semibold">+23%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">$45,678</div>
            <div className="text-gray-600 text-sm">Total Revenue</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="text-purple-600" size={24} />
              </div>
              <span className="text-green-600 text-sm font-semibold">+8%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">892</div>
            <div className="text-gray-600 text-sm">Active Customers</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
              <span className="text-green-600 text-sm font-semibold">+15%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">94.2%</div>
            <div className="text-gray-600 text-sm">Sync Success Rate</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-[#B00020] hover:bg-gray-50 transition-all group">
              <span className="font-semibold text-gray-700 group-hover:text-[#B00020]">Add New Product</span>
              <ArrowRight className="text-gray-400 group-hover:text-[#B00020]" size={20} />
            </button>
            <button className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-[#B00020] hover:bg-gray-50 transition-all group">
              <span className="font-semibold text-gray-700 group-hover:text-[#B00020]">View Reports</span>
              <ArrowRight className="text-gray-400 group-hover:text-[#B00020]" size={20} />
            </button>
            <button className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-[#B00020] hover:bg-gray-50 transition-all group">
              <span className="font-semibold text-gray-700 group-hover:text-[#B00020]">Manage Settings</span>
              <ArrowRight className="text-gray-400 group-hover:text-[#B00020]" size={20} />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
