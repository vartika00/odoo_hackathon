"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
  ArrowRight,
  Compass,
  Globe2,
  Navigation,
  Star,
  X
} from "lucide-react";
import { Button } from "../ui/button";

const TABS = [
  { id: "all", label: "Search All", icon: Compass, type: "ALL" },
  { id: "hotels", label: "Hotels & Stays", icon: Bed, type: "HOTEL" },
  { id: "things-to-do", label: "Experiences", icon: Ticket, type: "ATTRACTION" },
  { id: "restaurants", label: "Dining", icon: Utensils, type: "RESTAURANT" },
  { id: "flights", label: "Flights", icon: Plane, type: "FLIGHT" },
  { id: "holiday-homes", label: "Villas & Homes", icon: Home, type: "HOLIDAY_HOME" },
];

const MAP_HOTSPOTS = [
  {
    id: "pin-1",
    name: "Paris, France",
    top: "32%",
    left: "49%",
    category: "Culture & Romance",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    query: "Paris",
  },
  {
    id: "pin-2",
    name: "Tokyo, Japan",
    top: "37%",
    left: "82%",
    category: "Modern Heritage",
    rating: "4.95",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    query: "Tokyo",
  },
  {
    id: "pin-3",
    name: "Bali, Indonesia",
    top: "58%",
    left: "79%",
    category: "Tropical Paradise",
    rating: "5.0",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    query: "Bali",
  },
  {
    id: "pin-4",
    name: "New York, USA",
    top: "36%",
    left: "26%",
    category: "Iconic Metropolis",
    rating: "4.88",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    query: "New York",
  },
  {
    id: "pin-5",
    name: "Rome, Italy",
    top: "36%",
    left: "52%",
    category: "Ancient Wonders",
    rating: "4.92",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    query: "Rome",
  },
];

const TRENDING_TAGS = [
  { label: "Bali Luxury Villas", type: "HOLIDAY_HOME", query: "Bali" },
  { label: "Paris Eiffel Tour", type: "ATTRACTION", query: "Paris" },
  { label: "Tokyo Sushi Spots", type: "RESTAURANT", query: "Tokyo" },
  { label: "Rome Historic Stays", type: "HOTEL", query: "Rome" },
  { label: "Maldives Overwater", type: "HOTEL", query: "Maldives" },
];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("Aug 25 – Aug 30");
  const [guests, setGuests] = useState("2 adults, 1 room");
  const [activePin, setActivePin] = useState<typeof MAP_HOTSPOTS[0] | null>(null);
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
    <section className="relative w-full overflow-hidden border-b border-amber-950/15 bg-[#e8dac1]">
      {/* Vintage World Map Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/vintage-map-bg.jpg"
          alt="Vintage World Map"
          fill
          priority
          className="object-cover object-center opacity-85 scale-102 transition-transform duration-1000 ease-out"
        />
        {/* Soft Sepia & Vignette Gradient Overlays for optimal readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2b180d]/40 via-[#26150a]/25 to-[#1a0c06]/60 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_30%,rgba(20,10,5,0.6)_100%)]" />
      </div>

      {/* Interactive Map Hotspot Pins (Visible on tablet & desktop) */}
      <div className="hidden md:block absolute inset-0 z-10 pointer-events-none">
        <div className="relative w-full h-full max-w-7xl mx-auto">
          {MAP_HOTSPOTS.map((pin) => (
            <div
              key={pin.id}
              style={{ top: pin.top, left: pin.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto group"
            >
              {/* Pulsing Beacon Marker */}
              <button
                type="button"
                onClick={() => setActivePin(activePin?.id === pin.id ? null : pin)}
                aria-label={`View ${pin.name}`}
                className="relative flex items-center justify-center p-2 rounded-full cursor-pointer focus:outline-none"
              >
                <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-[#00eb5b] opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#00af87] border-2 border-white shadow-md shadow-black/50 group-hover:scale-125 transition-transform" />
              </button>

              {/* Hover Pin Popup Tooltip */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                <div className="bg-[#1c120c]/95 text-white backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/30 shadow-2xl text-xs whitespace-nowrap flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-[#00eb5b]" />
                  <span className="font-bold">{pin.name}</span>
                  <span className="text-amber-300 font-semibold">★ {pin.rating}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Active Pin Card Popup Modal */}
          {activePin && (
            <div
              style={{ top: activePin.top, left: activePin.left }}
              className="absolute -translate-x-1/2 -translate-y-full -mt-4 z-40 pointer-events-auto animate-in zoom-in-95 duration-200"
            >
              <div className="w-64 bg-[#1e130c]/95 backdrop-blur-md rounded-2xl border border-amber-500/40 p-3 shadow-2xl text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-[#00eb5b] tracking-wider">
                    {activePin.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActivePin(null)}
                    className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="relative h-28 w-full rounded-xl overflow-hidden mb-2">
                  <Image src={activePin.image} alt={activePin.name} fill className="object-cover" />
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] font-bold text-amber-300">
                    ★ {activePin.rating}
                  </div>
                </div>
                <h4 className="font-bold text-sm text-amber-100">{activePin.name}</h4>
                <Link href={`/listings?query=${encodeURIComponent(activePin.query)}`}>
                  <Button
                    size="sm"
                    className="w-full mt-2 rounded-xl bg-[#00af87] hover:bg-[#009673] text-white font-bold text-xs h-8"
                  >
                    Explore {activePin.name.split(",")[0]} &rarr;
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Hero Foreground Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-20 sm:pb-24 max-w-6xl">
        <div className="flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8">
          
          {/* Badge & Typography */}
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c120c]/80 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-extrabold tracking-wider uppercase shadow-lg">
              <Compass className="h-4 w-4 text-[#00eb5b] animate-spin-slow" />
              <span>Chart Your Next Great Journey</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-[1.08]">
              Where to next?
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-amber-100/90 font-medium max-w-2xl mx-auto drop-shadow-md leading-relaxed">
              Explore legendary destinations, compare 200+ booking sites for lowest rates, and discover authentic traveler-recommended experiences across the globe.
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
                    className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer select-none shrink-0 backdrop-blur-md shadow-md ${
                      isActive
                        ? "bg-[#00af87] text-white border border-[#00eb5b]/50 shadow-lg scale-102 ring-2 ring-[#00eb5b]/30"
                        : "bg-[#1f130b]/85 text-amber-100 hover:bg-[#2e1c11] hover:text-white border border-amber-900/40"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-[#00eb5b]"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Premium Glassmorphic Search Box */}
            <form
              onSubmit={handleSearch}
              className="mt-4 bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-full shadow-2xl border border-amber-100/80 p-2 sm:p-2.5 transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                {/* Primary Destination / Search Query Input */}
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
                          ? "Where to? e.g. Bali, Paris, Tokyo, Rome..."
                          : activeTab === "hotels"
                          ? "Destination or hotel name..."
                          : activeTab === "restaurants"
                          ? "Cuisine, neighborhood or restaurant..."
                          : activeTab === "flights"
                          ? "Departure or arrival city / airport..."
                          : activeTab === "holiday-homes"
                          ? "Beach villa, mountain chalet, apartment..."
                          : "Things to do, tours, day trips..."
                      }
                      className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-gray-900 placeholder:text-gray-400 font-semibold"
                    />
                  </div>
                </div>

                {/* Secondary Filters for Hotels/Stays */}
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

                {/* Search Button */}
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

            {/* Quick Trending Destinations Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-amber-200/90 font-bold flex items-center gap-1 drop-shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" /> Popular Expeditions:
              </span>
              {TRENDING_TAGS.map((tag) => (
                <button
                  key={tag.label}
                  type="button"
                  onClick={() => handleQuickTagClick(tag)}
                  className="px-3.5 py-1 rounded-full bg-[#1c120c]/80 hover:bg-[#2b1a10] text-amber-100 hover:text-white font-semibold border border-amber-500/30 backdrop-blur-md transition-all shadow-xs cursor-pointer hover:scale-105 active:scale-95"
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
