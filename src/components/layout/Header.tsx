"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Star
} from "lucide-react";
import { Button } from "../ui/button";

interface SearchSuggestion {
  id: string;
  name: string;
  category: "Hotel" | "Restaurant" | "Attraction" | "City";
  location: string;
  rating?: number;
  image: string;
  type: string;
}

const SEARCH_DATABASE: SearchSuggestion[] = [
  {
    id: "s1",
    name: "The St. Regis Bali Resort",
    category: "Hotel",
    location: "Nusa Dua, Bali, Indonesia",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    type: "HOTEL",
  },
  {
    id: "s2",
    name: "Bali, Indonesia",
    category: "City",
    location: "Southeast Asia",
    rating: 4.95,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    type: "ALL",
  },
  {
    id: "s3",
    name: "Paris, France",
    category: "City",
    location: "Europe",
    rating: 4.88,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    type: "ALL",
  },
  {
    id: "s4",
    name: "Eiffel Tower Summit Tour",
    category: "Attraction",
    location: "Paris, France",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    type: "ATTRACTION",
  },
  {
    id: "s5",
    name: "Hotel The Mitsui Kyoto",
    category: "Hotel",
    location: "Kyoto, Japan",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    type: "HOTEL",
  },
  {
    id: "s6",
    name: "Tokyo Sushi Dai & Omakase",
    category: "Restaurant",
    location: "Toyosu, Tokyo, Japan",
    rating: 4.95,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    type: "RESTAURANT",
  },
  {
    id: "s7",
    name: "Le Gabriel 3-Star Michelin",
    category: "Restaurant",
    location: "Champs-Élysées, Paris, France",
    rating: 4.95,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    type: "RESTAURANT",
  },
  {
    id: "s8",
    name: "Rome, Italy",
    category: "City",
    location: "Europe",
    rating: 4.91,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    type: "ALL",
  },
];

const INITIAL_RECENT_SEARCHES = [
  "Bali resorts",
  "Paris tours",
  "Kyoto luxury hotels",
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(INITIAL_RECENT_SEARCHES);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchFocused(false);
  }, [pathname]);

  // Handle scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter autocomplete suggestions based on query
  const filteredSuggestions = searchQuery.trim()
    ? SEARCH_DATABASE.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const queryToUse = searchQuery.trim();
    if (queryToUse) {
      // Add to recent searches
      setRecentSearches((prev) => [
        queryToUse,
        ...prev.filter((q) => q.toLowerCase() !== queryToUse.toLowerCase()),
      ].slice(0, 5));
      setIsSearchFocused(false);
      router.push(`/listings?query=${encodeURIComponent(queryToUse)}`);
    }
  };

  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    setSearchQuery(suggestion.name);
    setIsSearchFocused(false);
    if (suggestion.category === "Hotel") {
      router.push(`/listings/stay-1`);
    } else {
      router.push(`/listings?type=${suggestion.type}&query=${encodeURIComponent(suggestion.name)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isSearchFocused) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && filteredSuggestions[selectedIndex]) {
        handleSelectSuggestion(filteredSuggestions[selectedIndex]);
      } else {
        handleSearchSubmit();
      }
    } else if (e.key === "Escape") {
      setIsSearchFocused(false);
    }
  };

  const navLinks = [
    { label: "Hotels", href: "/listings?type=HOTEL", icon: Bed },
    { label: "Things to Do", href: "/listings?type=ATTRACTION", icon: Ticket },
    { label: "Restaurants", href: "/listings?type=RESTAURANT", icon: Utensils },
    { label: "Flights", href: "/listings?type=FLIGHT", icon: Plane },
    { label: "Holiday Homes", href: "/listings?type=HOLIDAY_HOME", icon: Home },
    { label: "My Profile", href: "/profile", icon: User },
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
              <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 transition-transform group-hover:scale-105 mix-blend-multiply rounded-full overflow-hidden">
                <Image src="/images/atlas-logo.png" alt="Atlas Logo" width={48} height={48} className="object-cover scale-[1.3]" />
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 ml-1">
                Atlas
              </span>
            </Link>
          </div>

          {/* Global Search Bar with Live Autocomplete Dropdown (Desktop) */}
          <div ref={searchContainerRef} className="hidden lg:flex flex-1 max-w-xl xl:max-w-2xl px-4 relative">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(-1);
                }}
                onFocus={() => setIsSearchFocused(true)}
                onKeyDown={handleKeyDown}
                className="w-full h-11 xl:h-12 pl-11 pr-24 text-sm text-gray-900 bg-[#f2f2f2] focus:bg-white border border-transparent focus:border-[#00af87] hover:bg-gray-100 rounded-full shadow-inner focus:shadow-lg outline-none transition-all"
                placeholder="Search places, hotels, restaurants, attractions..."
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-22 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#00af87] hover:bg-[#009673] text-white rounded-full text-xs font-bold tracking-wide transition-colors flex items-center justify-center shadow-xs"
              >
                Search
              </button>

              {/* Autocomplete Dropdown Panel */}
              {isSearchFocused && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-3xl shadow-2xl border border-gray-200 py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[440px] overflow-y-auto">
                  {/* When Typing: Live Suggestions List */}
                  {searchQuery.trim() ? (
                    <div>
                      <div className="flex items-center justify-between px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <span>Matching Results ({filteredSuggestions.length})</span>
                        <span className="text-[10px] text-gray-400 font-normal">Use ↑↓ keys to navigate</span>
                      </div>

                      {filteredSuggestions.length === 0 ? (
                        <div className="p-6 text-center text-xs text-gray-500">
                          No places found matching "{searchQuery}". Press Enter to search all.
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {filteredSuggestions.map((item, idx) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleSelectSuggestion(item)}
                              onMouseEnter={() => setSelectedIndex(idx)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-left transition-colors ${
                                selectedIndex === idx ? "bg-emerald-50 border border-emerald-200" : "hover:bg-gray-50"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-sm text-gray-900">{item.name}</span>
                                    <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-md bg-gray-100 text-gray-600">
                                      {item.category}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                    <span className="flex items-center gap-0.5">
                                      <MapPin className="h-3 w-3 text-[#00af87]" />
                                      {item.location}
                                    </span>
                                    {item.rating && (
                                      <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                                        ★ {item.rating}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* When Empty / Focused: Recent Searches & Trending Destinations */
                    <div className="space-y-3">
                      {/* Recent Searches */}
                      {recentSearches.length > 0 && (
                        <div>
                          <div className="flex items-center justify-between px-3 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                            <span>Recent Searches</span>
                            <button
                              type="button"
                              onClick={() => setRecentSearches([])}
                              className="text-[11px] text-[#00af87] hover:underline"
                            >
                              Clear
                            </button>
                          </div>
                          <div className="space-y-0.5">
                            {recentSearches.map((term) => (
                              <button
                                key={term}
                                type="button"
                                onClick={() => {
                                  setSearchQuery(term);
                                  router.push(`/listings?query=${encodeURIComponent(term)}`);
                                  setIsSearchFocused(false);
                                }}
                                className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-gray-100 rounded-xl transition-colors text-sm text-gray-800"
                              >
                                <div className="flex items-center gap-2.5">
                                  <Clock className="h-4 w-4 text-gray-400" />
                                  <span className="font-semibold">{term}</span>
                                </div>
                                <ArrowRight className="h-3.5 w-3.5 text-gray-400" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Popular Shortcuts */}
                      <div className="pt-2 border-t border-gray-100">
                        <div className="px-3 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                          <TrendingUp className="h-3.5 w-3.5 text-[#00af87]" />
                          <span>Trending Right Now</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 p-1">
                          {[
                            { name: "Bali, Indonesia", type: "HOTEL", tag: "Hotels & Stays" },
                            { name: "Paris, France", type: "ATTRACTION", tag: "Museums & Tours" },
                            { name: "Tokyo, Japan", type: "RESTAURANT", tag: "Michelin Dining" },
                            { name: "Rome, Italy", type: "ATTRACTION", tag: "Historic Monuments" },
                          ].map((spot) => (
                            <button
                              key={spot.name}
                              type="button"
                              onClick={() => {
                                router.push(`/listings?type=${spot.type}&query=${encodeURIComponent(spot.name)}`);
                                setIsSearchFocused(false);
                              }}
                              className="flex flex-col text-left p-2.5 rounded-xl hover:bg-gray-100 border border-gray-100"
                            >
                              <span className="font-bold text-xs text-gray-900">{spot.name}</span>
                              <span className="text-[10px] text-gray-500">{spot.tag}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
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

            {/* Profile Avatar / Link */}
            <Link href="/profile" className="flex items-center">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border-2 border-[#00af87] overflow-hidden hover:scale-105 transition-transform">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="User Profile"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            </Link>
          </div>
        </div>

        {/* Global Search Bar (Mobile/Tablet Subheader) */}
        <div className="lg:hidden px-4 pb-3 pt-1 relative">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-20 text-sm text-gray-900 bg-[#f2f2f2] focus:bg-white border border-transparent focus:border-[#00af87] rounded-full shadow-inner outline-none transition-all"
              placeholder="Where to? (e.g. Paris, Goa, Tokyo)"
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

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-9 w-9 mix-blend-multiply rounded-full overflow-hidden">
                  <Image src="/images/atlas-logo.png" alt="Atlas Logo" width={36} height={36} className="object-cover scale-[1.3]" />
                </div>
                <span className="text-xl font-black text-gray-900 ml-1">Atlas</span>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* User Profile Card */}
            <Link
              href="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50/40 border-b border-gray-100 flex items-center gap-3 hover:bg-emerald-100/50 transition-colors"
            >
              <div className="relative h-12 w-12 rounded-full border-2 border-[#00af87] overflow-hidden shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="Elena Rostova"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-gray-900 text-sm">Elena Rostova</h4>
                  <span className="px-1.5 py-0.2 rounded bg-[#00af87] text-white text-[9px] font-bold">Lvl 6</span>
                </div>
                <p className="text-xs text-gray-500">18 Countries • 48 Reviews</p>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Link>

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
                  Community & Trips
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
                    <span>Trips & Itinerary Board</span>
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
                <span className="font-semibold text-gray-700">USD ($) • English</span>
              </div>
              <span className="font-bold text-[#00af87]">v1.0 Pro</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
