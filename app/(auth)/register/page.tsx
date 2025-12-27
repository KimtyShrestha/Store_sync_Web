import Link from "next/link"
import RegisterForm from "../_components/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#B00020] flex items-center justify-center rounded">
              <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[12px] border-b-white" />
            </div>
            <span className="text-2xl font-semibold text-gray-900">Store Sync</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-2">Create your account</h1>
          <p className="text-gray-600">Start managing your store today</p>
        </div>

        {/* Register Form Card */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <RegisterForm />
        </div>

        {/* Sign In Link */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#B00020] font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
