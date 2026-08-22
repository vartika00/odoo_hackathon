"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Home,
  Utensils,
  Plane,
  Ticket,
  Bed,
  Calendar,
  Users,
  MapPin,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Button } from "../ui/button";

const TABS = [
  { id: "all", label: "Search All", icon: Home, type: "ALL" },
  { id: "hotels", label: "Hotels", icon: Bed, type: "HOTEL" },
  { id: "things-to-do", label: "Things to Do", icon: Ticket, type: "ATTRACTION" },
  { id: "restaurants", label: "Restaurants", icon: Utensils, type: "RESTAURANT" },
  { id: "flights", label: "Flights", icon: Plane, type: "FLIGHT" },
  { id: "holiday-homes", label: "Holiday Homes", icon: Home, type: "HOLIDAY_HOME" },
];

const TRENDING_TAGS = [
  { label: "Goa Beach Resorts", type: "HOTEL", query: "Goa" },
  { label: "Paris Louvre Tour", type: "ATTRACTION", query: "Paris" },
  { label: "Tokyo Sushi Spots", type: "RESTAURANT", query: "Tokyo" },
  { label: "Bali Luxury Villas", type: "HOLIDAY_HOME", query: "Bali" },
  { label: "New York Rooftops", type: "RESTAURANT", query: "New York" },
];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("Aug 24 - Aug 28");
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
    <section className="relative w-full pt-8 pb-12 sm:pt-12 sm:pb-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">
        {/* Hero Title & Subtitle */}
        <div className="text-center space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-[#00af87] text-xs sm:text-sm font-bold tracking-wide uppercase mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Discover your next adventure</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-gray-950 leading-[1.08]">
            Where to next?
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium max-w-xl mx-auto">
            Compare stays, find award-winning restaurants, and discover unforgettable experiences.
          </p>
        </div>

        {/* Tab Navigation with responsive horizontal scroll */}
        <div className="w-full max-w-4xl">
          <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center gap-2 no-scrollbar scroll-smooth">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-150 cursor-pointer select-none shadow-xs shrink-0 ${
                    isActive
                      ? "bg-black text-white shadow-md scale-102"
                      : "bg-white text-gray-700 hover:bg-gray-100 hover:text-black border border-gray-200/80"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-[#00eb5b]" : "text-gray-500"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box Card */}
          <form
            onSubmit={handleSearch}
            className="mt-4 bg-white rounded-2xl sm:rounded-full shadow-lg hover:shadow-xl transition-shadow border border-gray-200 p-2 sm:p-2.5"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
              {/* Primary Location / Query Input */}
              <div className="flex-1 flex items-center px-4 py-3 sm:py-2">
                <Search className="h-5 w-5 text-gray-400 mr-3 shrink-0" />
                <div className="w-full">
                  <label className="block text-[10px] font-bold uppercase text-gray-400 sm:hidden">
                    Destination / Keyword
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={
                      activeTab === "all"
                        ? "Places to go, things to do, hotels..."
                        : activeTab === "hotels"
                        ? "Where to? e.g. Maldives, Rome, London"
                        : activeTab === "restaurants"
                        ? "Restaurant or cuisine in..."
                        : activeTab === "flights"
                        ? "Destination airport or city..."
                        : activeTab === "holiday-homes"
                        ? "Beach villa, mountain cabin..."
                        : "Attraction or activity name..."
                    }
                    className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-gray-900 placeholder:text-gray-400 font-medium"
                  />
                </div>
              </div>

              {/* Conditional secondary filters (Hotels / Rentals) */}
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
                  className="w-full sm:w-auto rounded-xl sm:rounded-full bg-[#00af87] hover:bg-[#009673] text-white font-bold h-11 sm:h-12 px-7 text-sm sm:text-base transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2"
                >
                  <span>Search</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>

          {/* Quick Trending Suggestions Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-gray-500 font-semibold flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-500" /> Popular now:
            </span>
            {TRENDING_TAGS.map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() => handleQuickTagClick(tag)}
                className="px-3 py-1 rounded-full bg-white hover:bg-gray-100 text-gray-700 font-medium border border-gray-200 shadow-2xs transition-colors cursor-pointer"
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
