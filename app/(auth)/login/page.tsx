import Link from "next/link"
import LoginForm from "../_components/LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#B00020] flex items-center justify-center rounded">
              <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[12px] border-b-white" />
            </div>
            <span className="text-2xl font-semibold text-gray-900">Store Sync</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-2">Welcome back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <LoginForm />
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#B00020] font-semibold hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  )
}
