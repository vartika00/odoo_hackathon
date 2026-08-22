"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Bed,
  Ticket,
  Utensils,
  Plane,
  Home,
  Compass,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock
} from "lucide-react";
import { Button } from "../ui/button";

const STATIC_HERO = {
  title: "Where to next?",
  subtitle: "Explore the world's most incredible destinations with real local insights",
  image: "/images/world-map.jpg",
};

const TABS = [
  { id: "all", label: "Search All", icon: Compass, type: "ALL" },
  { id: "hotels", label: "Hotels & Stays", icon: Bed, type: "HOTEL" },
  { id: "things-to-do", label: "Experiences", icon: Ticket, type: "ATTRACTION" },
  { id: "restaurants", label: "Dining", icon: Utensils, type: "RESTAURANT" },
  { id: "flights", label: "Flights", icon: Plane, type: "FLIGHT" },
  { id: "holiday-homes", label: "Villas & Homes", icon: Home, type: "HOLIDAY_HOME" },
];

const TRENDING_TAGS = [
  { label: "Swiss Chalet Rentals", type: "HOLIDAY_HOME", query: "Switzerland" },
  { label: "Scottish Highlands Tour", type: "ATTRACTION", query: "Highlands" },
  { label: "Amalfi Coast Stays", type: "HOTEL", query: "Amalfi" },
  { label: "Bali Luxury Villas", type: "HOLIDAY_HOME", query: "Bali" },
  { label: "Tokyo Michelin Dining", type: "RESTAURANT", query: "Tokyo" },
];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("Aug 25 – Aug 30");
  const [guests, setGuests] = useState("2 adults, 1 room");
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const currentTab = TABS.find((t) => t.id === activeTab);
    const typeParam = currentTab?.type !== "ALL" ? `type=${currentTab?.type}` : "";
    const queryParam = location.trim() ? `query=${encodeURIComponent(location.trim())}` : "";
    const params = [typeParam, queryParam].filter(Boolean).join("&");
    router.push(`/listings${params ? `?${params}` : ""}`);
  };

  const handleQuickTagClick = (tag: typeof TRENDING_TAGS[0]) => {
    router.push(`/listings?type=${tag.type}&query=${encodeURIComponent(tag.query)}`);
  };

  return (
    <section
      className="relative w-full overflow-hidden min-h-[560px] sm:min-h-[640px] lg:min-h-[700px] flex items-center justify-center bg-background text-gray-900"
    >
      {/* Background Static Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={STATIC_HERO.image}
          alt={STATIC_HERO.title}
          fill
          quality={100}
          unoptimized={true}
          priority={true}
          sizes="100vw"
          className="object-cover object-center opacity-90"
        />
        
        {/* Top Fade out gradient to blend with header */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent pointer-events-none" />

        {/* Bottom Fade out gradient to blend with content */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>

      {/* Main Foreground Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-5xl text-center flex flex-col items-center justify-center space-y-6">
        
        {/* Static Slide Headline */}
        <div className="space-y-3 max-w-3xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-gray-900 leading-[1.06]">
            {STATIC_HERO.title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-800 font-bold max-w-2xl mx-auto leading-relaxed">
            {STATIC_HERO.subtitle}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="w-full max-w-4xl pt-2">
          <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center gap-2 no-scrollbar scroll-smooth">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer select-none shrink-0 backdrop-blur-md shadow-md ${
                    isActive
                      ? "bg-[#00af87] text-white border border-[#00eb5b]/50 shadow-lg scale-102 ring-2 ring-[#00eb5b]/30"
                      : "bg-black/60 text-gray-200 hover:bg-black/80 hover:text-white border border-white/15"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-[#00eb5b]"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Glassmorphic Search Form Card */}
          <form
            onSubmit={handleSearch}
            className="mt-4 bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-full shadow-2xl border border-white/60 p-2 sm:p-2.5 transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
              {/* Primary Location Input */}
              <div className="flex-1 flex items-center px-4 py-3 sm:py-2">
                <Search className="h-5 w-5 text-[#00af87] mr-3 shrink-0" />
                <div className="w-full text-left">
                  <label className="block text-[10px] font-bold uppercase text-gray-500 sm:hidden">
                    Destination or Keyword
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={
                      activeTab === "all"
                        ? "Where to? e.g. Switzerland, Scotland, Amalfi, Bali..."
                        : activeTab === "hotels"
                        ? "Destination or hotel name..."
                        : activeTab === "restaurants"
                        ? "Cuisine, neighborhood or restaurant..."
                        : activeTab === "flights"
                        ? "Departure or arrival city / airport..."
                        : activeTab === "holiday-homes"
                        ? "Beach villa, mountain chalet, apartment..."
                        : "Tours, day trips, boat excursions..."
                    }
                    className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-gray-900 placeholder:text-gray-400 font-semibold"
                  />
                </div>
              </div>

              {/* Secondary Pickers for Stays/Villas */}
              {(activeTab === "hotels" || activeTab === "holiday-homes") && (
                <>
                  <div className="flex items-center px-4 py-2 sm:py-1 cursor-pointer hover:bg-gray-50 sm:rounded-lg">
                    <Calendar className="h-4 w-4 text-[#00af87] mr-2 shrink-0" />
                    <div className="text-left">
                      <div className="text-[10px] font-bold text-gray-400 uppercase">Dates</div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-800 whitespace-nowrap">{dates}</div>
                    </div>
                  </div>

                  <div className="flex items-center px-4 py-2 sm:py-1 cursor-pointer hover:bg-gray-50 sm:rounded-lg">
                    <Users className="h-4 w-4 text-[#00af87] mr-2 shrink-0" />
                    <div className="text-left">
                      <div className="text-[10px] font-bold text-gray-400 uppercase">Guests</div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-800 whitespace-nowrap">{guests}</div>
                    </div>
                  </div>
                </>
              )}

              {/* Search Submit Button */}
              <div className="pt-2 sm:pt-0 sm:pl-2">
                <Button
                  type="submit"
                  className="w-full sm:w-auto rounded-xl sm:rounded-full bg-[#00af87] hover:bg-[#009673] text-white font-extrabold h-11 sm:h-12 px-8 text-sm sm:text-base shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Search</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>

          {/* Quick Trending Destination Tags */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-gray-200 font-bold flex items-center gap-1 drop-shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" /> Trending Now:
            </span>
            {TRENDING_TAGS.map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() => handleQuickTagClick(tag)}
                className="px-3.5 py-1 rounded-full bg-black/60 hover:bg-black/80 text-gray-100 hover:text-white font-semibold border border-white/20 backdrop-blur-md transition-all shadow-xs cursor-pointer hover:scale-105 active:scale-95"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}
