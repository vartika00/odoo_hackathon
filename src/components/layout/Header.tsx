"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Globe,
  MapPin,
  PenLine,
  User,
  Menu,
  X,
  Bed,
  Ticket,
  Utensils,
  Plane,
  Home,
  Heart,
  Compass,
  ChevronRight,
  LogOut
} from "lucide-react";
import { Button } from "../ui/button";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handle scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/listings?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { label: "Hotels", href: "/listings?type=HOTEL", icon: Bed },
    { label: "Things to Do", href: "/listings?type=ATTRACTION", icon: Ticket },
    { label: "Restaurants", href: "/listings?type=RESTAURANT", icon: Utensils },
    { label: "Flights", href: "/listings?type=FLIGHT", icon: Plane },
    { label: "Holiday Homes", href: "/listings?type=HOLIDAY_HOME", icon: Home },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b transition-all duration-200 ${
          isScrolled ? "border-gray-200 shadow-sm" : "border-gray-100"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors -ml-1 text-gray-800"
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="bg-[#00af87] text-white rounded-full p-2 flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 transition-transform group-hover:scale-105 shadow-sm">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="8" cy="10" r="2" fill="currentColor" />
                  <circle cx="16" cy="10" r="2" fill="currentColor" />
                  <path d="M8 15s1.5 2 4 2 4-2 4-2" strokeWidth="2.2" />
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900">
                Tripadvisor
              </span>
            </Link>
          </div>

          {/* Global Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-xl xl:max-w-2xl px-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full h-11 xl:h-12 pl-11 pr-24 text-sm text-gray-900 bg-[#f2f2f2] focus:bg-white border border-transparent focus:border-gray-400 hover:bg-gray-100 rounded-full shadow-inner focus:shadow-md outline-none transition-all"
                placeholder="Search destinations, hotels, attractions..."
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#00af87] hover:bg-[#009673] text-white rounded-full text-xs font-semibold tracking-wide transition-colors flex items-center justify-center"
              >
                Search
              </button>

              {/* Suggestions Dropdown */}
              {isSearchFocused && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-xs font-bold text-gray-400 px-3 py-1 uppercase tracking-wider">
                    Popular Destinations
                  </div>
                  {[
                    { name: "Bali, Indonesia", category: "Top Destination" },
                    { name: "Paris, France", category: "Europe Tour" },
                    { name: "Tokyo, Japan", category: "Asian Culture" },
                    { name: "Goa, India", category: "Beach Holiday" },
                  ].map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onMouseDown={() => {
                        setSearchQuery(item.name);
                        router.push(`/listings?query=${encodeURIComponent(item.name)}`);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-gray-100 rounded-xl transition-colors text-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <MapPin className="h-4 w-4 text-[#00af87]" />
                        <span className="font-semibold text-gray-800">{item.name}</span>
                      </div>
                      <span className="text-xs text-gray-400">{item.category}</span>
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link href="/listings" className="hidden xl:flex">
              <Button variant="ghost" className="rounded-full font-semibold text-sm hover:bg-gray-100 gap-1.5">
                <Compass className="h-4 w-4" />
                <span>Explore</span>
              </Button>
            </Link>

            <Link href="/review" className="hidden sm:flex">
              <Button variant="ghost" className="rounded-full font-semibold text-sm hover:bg-gray-100 gap-1.5">
                <PenLine className="h-4 w-4" />
                <span>Review</span>
              </Button>
            </Link>

            <Link href="/trips" className="hidden sm:flex">
              <Button variant="ghost" className="rounded-full font-semibold text-sm hover:bg-gray-100 gap-1.5">
                <Heart className="h-4 w-4 text-rose-500" />
                <span>Trips</span>
              </Button>
            </Link>

            <Button
              variant="outline"
              size="icon"
              className="hidden lg:flex rounded-full border-gray-200 hover:bg-gray-100 h-9 w-9"
              title="Change Currency & Language"
            >
              <Globe className="h-4 w-4 text-gray-700" />
            </Button>

            <Link href="/listings">
              <Button className="rounded-full bg-black hover:bg-gray-800 text-white font-bold text-xs sm:text-sm px-4 sm:px-6 h-9 sm:h-10 ml-1 transition-transform active:scale-95 shadow-sm">
                Sign in
              </Button>
            </Link>
          </div>
        </div>

        {/* Global Search Bar (Mobile/Tablet Subheader) */}
        <div className="lg:hidden px-4 pb-3 pt-1">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-20 text-sm text-gray-900 bg-[#f2f2f2] focus:bg-white border border-transparent focus:border-[#00af87] rounded-full shadow-inner outline-none transition-all"
              placeholder="Where to? (e.g. Paris, Goa)"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3.5 bg-[#00af87] text-white rounded-full text-xs font-bold transition-colors"
            >
              Go
            </button>
          </form>
        </div>
      </header>

      {/* Mobile Menu Drawer / Sheet */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-[#00af87] text-white rounded-full p-1.5 flex items-center justify-center h-8 w-8">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="8" cy="10" r="2" fill="currentColor" />
                    <circle cx="16" cy="10" r="2" fill="currentColor" />
                    <path d="M8 15s1.5 2 4 2 4-2 4-2" strokeWidth="2.2" />
                  </svg>
                </div>
                <span className="text-xl font-black text-gray-900">Tripadvisor</span>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* User Account / Sign In Prompt */}
            <div className="p-5 bg-[#f8f9fa] border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-[#00af87]/15 text-[#00af87] flex items-center justify-center font-bold text-lg">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Welcome Traveler</h4>
                  <p className="text-xs text-gray-500">Plan trips & review places</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link href="/listings" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full rounded-full bg-black hover:bg-gray-800 text-white text-xs font-bold h-9">
                    Sign in
                  </Button>
                </Link>
                <Link href="/trips" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full rounded-full border-gray-300 text-xs font-bold h-9">
                    My Trips
                  </Button>
                </Link>
              </div>
            </div>

            {/* Navigation Category Links */}
            <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
              <div className="px-3 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Explore Categories
              </div>

              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-3 rounded-xl text-gray-800 hover:bg-gray-100 font-semibold text-sm transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gray-100 text-gray-700">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-gray-100">
                <div className="px-3 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Quick Actions
                </div>
                <Link
                  href="/trips"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-gray-800 hover:bg-gray-100 font-semibold text-sm transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
                      <Heart className="h-4 w-4" />
                    </div>
                    <span>Trips & Saved</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>

                <Link
                  href="/review"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-gray-800 hover:bg-gray-100 font-semibold text-sm transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                      <PenLine className="h-4 w-4" />
                    </div>
                    <span>Write a Review</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-600" />
                <span className="font-semibold text-gray-700">USD ($) • EN</span>
              </div>
              <span>v1.0 Responsive</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
