"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  X,
  Compass
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Forgot password modal state
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg("Welcome back! Redirecting to your trips...");
      setTimeout(() => {
        router.push("/trips");
      }, 1000);
    }, 800);
  };

  const handleDemoLogin = () => {
    setEmail("elena@atlasguide.com");
    setPassword("traveler2026");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg("Logged in as Elena Rostova! Redirecting...");
      setTimeout(() => {
        router.push("/trips");
      }, 800);
    }, 600);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
  };

  return (
    <div className="min-h-[90vh] bg-[#fbf9f5] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-200/80 relative overflow-hidden">
          {/* Top Decorative Banner */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#053a1a] via-emerald-400 to-teal-500" />

          {/* Logo & Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5 group mb-3">
              <div className="w-10 h-10 rounded-2xl bg-[#053a1a] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 animate-spin-slow" />
              </div>
              <span className="font-black text-2xl tracking-tight text-gray-900">
                Atlas<span className="text-[#053a1a]">.</span>
              </span>
            </Link>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Welcome Back</h1>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Log in to manage your itineraries, saved places & budget
            </p>
          </div>

          {/* Success / Error Notifications */}
          {error && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-2xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {successMsg && (
            <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#053a1a]" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Quick Demo Login Pill */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-[#053a1a] rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              <span>1-Click Demo Traveler Login</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">or with email</span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="traveler@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#053a1a] focus:bg-white transition"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotOpen(true);
                    setForgotSent(false);
                    setForgotEmail(email);
                  }}
                  className="text-[11px] font-bold text-[#053a1a] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-gray-50/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#053a1a] focus:bg-white transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-[#053a1a] rounded cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs text-gray-600 font-medium cursor-pointer">
                Keep me signed in on this device
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-[#053a1a] hover:bg-[#009b77] text-white font-bold text-xs rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
            >
              {isLoading ? "Signing in..." : "Sign In to Atlas"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Switch to Sign Up */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-600 font-medium">
              Don't have an account yet?{" "}
              <Link href="/signup" className="text-[#053a1a] font-bold hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-[11px] text-gray-400 text-center mt-6">
          Protected by Atlas Traveler Shield &bull; All data securely encrypted
        </p>
      </div>

      {/* Forgot Password Modal */}
      {isForgotOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsForgotOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#053a1a] flex items-center justify-center mb-4">
              <Lock className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-black text-gray-900">Reset Password</h3>
            <p className="text-xs text-gray-500 mt-1 mb-5">
              Enter your email and we'll send you a link to reset your account password.
            </p>

            {forgotSent ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                <CheckCircle2 className="w-6 h-6 text-[#053a1a] mx-auto mb-2" />
                <h4 className="text-xs font-bold text-emerald-900">Reset Link Dispatched!</h4>
                <p className="text-[11px] text-emerald-700 mt-1">
                  We sent recovery instructions to <strong>{forgotEmail}</strong>.
                </p>
                <Button
                  onClick={() => setIsForgotOpen(false)}
                  className="mt-4 w-full h-9 bg-[#053a1a] text-white text-xs font-bold rounded-xl"
                >
                  Back to Sign In
                </Button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Account Email
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="traveler@example.com"
                    required
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#053a1a]"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-10 bg-[#053a1a] hover:bg-[#009b77] text-white text-xs font-bold rounded-2xl"
                >
                  Send Recovery Link
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
