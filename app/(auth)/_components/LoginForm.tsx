"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { loginSchema, type LoginFormData } from "../schema"
import Link from "next/link"
import { loginAction } from "@/lib/actions/auth.actions"

export default function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      await loginAction({
        username: data.username,
        password: data.password,
      })

      router.push("/dashboard")
    } catch (error: any) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Username */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Username or Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            {...register("username")}
            className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 ${
              errors.username
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-300 focus:ring-[#B00020]"
            }`}
            placeholder="Enter username or email"
          />
        </div>
        {errors.username && (
          <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
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
            placeholder="Enter password"
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

      {/* Backend Error */}
      {errorMessage && (
        <p className="text-sm text-red-600 text-center">{errorMessage}</p>
      )}

      <div className="flex justify-end">
        <Link href="#" className="text-sm text-[#B00020] font-semibold">
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-[#B00020] text-white rounded-lg font-semibold disabled:opacity-50"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  )
}
