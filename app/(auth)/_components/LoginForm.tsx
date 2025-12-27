"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { loginSchema, type LoginFormData } from "../schema"
import Link from "next/link"

export default function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    console.log("[v0] Login form data:", data)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Navigate to dashboard
    router.push("/dashboard")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Username/Email Field */}
      <div>
        <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
          Username or Email
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Mail size={20} />
          </div>
          <input
            id="username"
            type="text"
            {...register("username")}
            className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.username
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-300 focus:ring-[#B00020] focus:border-[#B00020]"
            }`}
            placeholder="Enter your username or email"
          />
        </div>
        {errors.username && <p className="mt-1.5 text-sm text-red-600">{errors.username.message}</p>}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Lock size={20} />
          </div>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className={`w-full pl-11 pr-11 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.password
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-300 focus:ring-[#B00020] focus:border-[#B00020]"
            }`}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && <p className="mt-1.5 text-sm text-red-600">{errors.password.message}</p>}
      </div>

      {/* Forgot Password Link */}
      <div className="flex justify-end">
        <Link href="#" className="text-sm text-[#B00020] hover:underline font-semibold">
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-[#B00020] text-white rounded-lg font-semibold hover:bg-[#8f001a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  )
}
