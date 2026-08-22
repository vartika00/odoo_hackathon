"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, Sparkles } from "lucide-react";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  AuthError,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";

const HERO_IMAGE = "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80";

const PERKS = [
  "Save trips & build itineraries",
  "Write & read authentic reviews",
  "Get personalised recommendations",
  "Access exclusive member deals",
];

function getErrorMessage(error: AuthError): string {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/popup-closed-by-user":
      return "";
    default:
      return "Something went wrong. Please try again.";
  }
}

export default function SignUpPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) router.replace("/");
  }, [user, loading, router]);

  if (loading || user) return null;

  const passwordStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Weak", "Good", "Strong"][passwordStrength];
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-[#053a1a]"][passwordStrength];

  const handleGoogle = async () => {
    setError("");
    setIsGoogleLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err) {
      const msg = getErrorMessage(err as AuthError);
      if (msg) setError(msg);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setError("");
    setIsLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      router.push("/");
    } catch (err) {
      setError(getErrorMessage(err as AuthError));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Image src={HERO_IMAGE} alt="Travel destination" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-[#053a1a]/85 via-[#053a1a]/55 to-black/60" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center h-11 w-11 mix-blend-multiply rounded-full overflow-hidden bg-white/10 backdrop-blur-sm">
              <Image src="/images/atlas-logo.png" alt="Atlas" width={44} height={44} className="object-cover scale-[1.3]" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">Atlas</span>
          </Link>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-bold">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              Join 50M+ explorers today
            </div>
            <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight">
              Start your<br />
              <span className="text-[#a8e6c1]">journey</span> with us.
            </h2>
            <p className="text-white/70 text-base font-medium max-w-sm leading-relaxed">
              Create your free account and unlock a world of travel inspiration, reviews, and deals.
            </p>
            <ul className="space-y-3">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-white/85 text-sm font-medium">
                  <div className="h-5 w-5 rounded-full bg-[#a8e6c1]/20 border border-[#a8e6c1]/40 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-[#a8e6c1]" />
                  </div>
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4">
            <p className="text-white/80 text-sm font-medium italic leading-relaxed">
              "Atlas completely changed how I plan my trips. The reviews are so authentic!"
            </p>
            <div className="flex items-center gap-2 mt-3">
              <div className="h-7 w-7 rounded-full overflow-hidden border border-white/30">
                <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" width={28} height={28} className="object-cover" />
              </div>
              <div>
                <div className="text-white text-xs font-bold">Marcus Chen</div>
                <div className="text-white/50 text-[11px]">Singapore • 42 reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#F4F1EA] px-6 py-12">
        <div className="w-full max-w-md space-y-7">

          <div className="flex lg:hidden justify-center">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center h-10 w-10 mix-blend-multiply rounded-full overflow-hidden">
                <Image src="/images/atlas-logo.png" alt="Atlas" width={40} height={40} className="object-cover scale-[1.3]" />
              </div>
              <span className="text-2xl font-black text-gray-900">Atlas</span>
            </Link>
          </div>

          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Create your account</h1>
            <p className="text-gray-500 text-sm font-medium mt-1.5">Free forever. No credit card required.</p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="px-4 py-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-3 h-12 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all font-semibold text-sm text-gray-700 active:scale-[0.98] disabled:opacity-70"
          >
            {isGoogleLoading ? (
              <div className="h-5 w-5 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin" />
            ) : (
              <>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                  </g>
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">or sign up with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  required
                  className="w-full h-12 pl-10 pr-4 bg-white border border-gray-200 rounded-2xl text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#053a1a] focus:ring-2 focus:ring-[#053a1a]/10 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full h-12 pl-10 pr-4 bg-white border border-gray-200 rounded-2xl text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#053a1a] focus:ring-2 focus:ring-[#053a1a]/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                  className="w-full h-12 pl-10 pr-11 bg-white border border-gray-200 rounded-2xl text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#053a1a] focus:ring-2 focus:ring-[#053a1a]/10 transition-all"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((level) => (
                      <div key={level} className={`h-1 flex-1 rounded-full transition-all ${level <= passwordStrength ? strengthColor : "bg-gray-200"}`} />
                    ))}
                  </div>
                  <p className={`text-xs font-semibold ${passwordStrength === 1 ? "text-red-500" : passwordStrength === 2 ? "text-amber-500" : "text-[#053a1a]"}`}>
                    {strengthLabel} password
                  </p>
                </div>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div
                onClick={() => setAgreed(!agreed)}
                className={`mt-0.5 h-5 w-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${agreed ? "bg-[#053a1a] border-[#053a1a]" : "border-gray-300 group-hover:border-[#053a1a]"}`}
              >
                {agreed && <Check className="h-3 w-3 text-white" />}
              </div>
              <span className="text-xs text-gray-500 leading-relaxed">
                I agree to Atlas's{" "}
                <Link href="#" className="text-[#053a1a] font-semibold hover:underline">Terms of Use</Link>
                {" "}and{" "}
                <Link href="#" className="text-[#053a1a] font-semibold hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading || !agreed}
              className="w-full h-12 rounded-2xl bg-[#053a1a] hover:bg-[#032b13] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#053a1a]/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-bold text-[#053a1a] hover:underline underline-offset-4">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
