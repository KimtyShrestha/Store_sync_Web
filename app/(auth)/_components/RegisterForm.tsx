"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { registerSchema, type RegisterFormData } from "../schema"
import { registerAction } from "@/lib/actions/auth.actions"

export default function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      await registerAction({
      name: data.name,
      email: data.email,
      password: data.password,
})

      router.push("/login")
    } catch (error: any) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            {...register("name")}
            className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 ${
              errors.name
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-300 focus:ring-[#B00020]"
            }`}
            placeholder="Enter your full name"
          />
        </div>
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="email"
            {...register("email")}
            className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 ${
              errors.email
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-300 focus:ring-[#B00020]"
            }`}
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className={`w-full pl-11 pr-11 py-3 border rounded-lg focus:ring-2 ${
              errors.password
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-300 focus:ring-[#B00020]"
            }`}
            placeholder="Create a password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            className={`w-full pl-11 pr-11 py-3 border rounded-lg focus:ring-2 ${
              errors.confirmPassword
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-300 focus:ring-[#B00020]"
            }`}
            placeholder="Re-enter your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-600 mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Backend Error */}
      {errorMessage && (
        <p className="text-sm text-red-600 text-center">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-[#B00020] text-white rounded-lg font-semibold disabled:opacity-50"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  )
}
