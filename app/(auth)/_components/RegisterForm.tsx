"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { registerSchema, type RegisterFormData } from "../schema"

export default function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true)
    console.log("[v0] Register form data:", data)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Navigate to dashboard
    router.push("/dashboard")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
          Full Name
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <User size={20} />
          </div>
          <input
            id="name"
            type="text"
            {...register("name")}
            className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.name
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-300 focus:ring-[#B00020] focus:border-[#B00020]"
            }`}
            placeholder="Enter your full name"
          />
        </div>
        {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Mail size={20} />
          </div>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.email
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-300 focus:ring-[#B00020] focus:border-[#B00020]"
            }`}
            placeholder="Enter your email"
          />
        </div>
        {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>}
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
            placeholder="Create a password"
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

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Lock size={20} />
          </div>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            className={`w-full pl-11 pr-11 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.confirmPassword
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-300 focus:ring-[#B00020] focus:border-[#B00020]"
            }`}
            placeholder="Re-enter your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && <p className="mt-1.5 text-sm text-red-600">{errors.confirmPassword.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-[#B00020] text-white rounded-lg font-semibold hover:bg-[#8f001a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  )
}
