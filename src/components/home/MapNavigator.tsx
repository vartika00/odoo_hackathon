"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  MapPin,
  Sparkles,
  ArrowRight,
  Plane,
  Clock,
  Star,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { Button } from "../ui/button";

const EXPEDITIONS = [
  {
    continent: "Europe",
    title: "The Grand European Cultural Odyssey",
    route: "Paris ➔ Rome ➔ Santorini ➔ Barcelona",
    duration: "14 Days",
    stops: 4,
    rating: 4.96,
    reviewsCount: 1840,
    highlights: ["Eiffel Tower VIP Tour", "Vatican & Colosseum", "Oia Sunset Cruise", "Sagrada Família"],
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    query: "Paris",
  },
  {
    continent: "Asia",
    title: "Ancient Temples & Tropical Islands Expedition",
    route: "Tokyo ➔ Kyoto ➔ Bali ➔ Maldives",
    duration: "16 Days",
    stops: 4,
    rating: 4.98,
    reviewsCount: 2210,
    highlights: ["Kyoto Bamboo Shrines", "Mount Fuji Sunrise", "Nusa Penida Manta Rays", "Overwater Villas"],
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    query: "Tokyo",
  },
  {
    continent: "Americas",
    title: "Skylines, Coastal Canyons & Latin Wonders",
    route: "New York ➔ Grand Canyon ➔ Rio de Janeiro",
    duration: "12 Days",
    stops: 3,
    rating: 4.92,
    reviewsCount: 1450,
    highlights: ["Broadway & Manhattan", "Helicopter Canyon Tour", "Copacabana & Christ the Redeemer"],
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    query: "New York",
  },
];

export function MapNavigator() {
  const [selectedContinent, setSelectedContinent] = useState("Europe");

  const currentExpedition = EXPEDITIONS.find((e) => e.continent === selectedContinent) || EXPEDITIONS[0];

  return (
    <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#053a1a] uppercase tracking-wider mb-1">
            <Compass className="h-4 w-4" />
            <span>Curated Worldwide Itineraries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-950 tracking-tight">
            Epic Multi-Destination Journeys
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
            Seamless travel routes crafted from top-rated traveler reviews and community itineraries
          </p>
        </div>

        <Link
          href="/trips"
          className="text-xs sm:text-sm font-bold text-[#053a1a] hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Open Trip Planner</span>
          &rarr;
        </Link>
      </div>

      {/* Main Container Card */}
      <div className="relative bg-gradient-to-br from-[#002b11] via-[#033a18] to-[#011c0b] text-white rounded-3xl overflow-hidden shadow-2xl border border-emerald-900/40 p-6 sm:p-10">
        {/* Background Ambient Glow */}
        <div className="absolute -right-16 -top-16 w-96 h-96 rounded-full bg-[#00eb5b]/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 -bottom-20 w-80 h-80 rounded-full bg-[#053a1a]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8">
          {/* Continent Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {EXPEDITIONS.map((exp) => (
              <button
                key={exp.continent}
                onClick={() => setSelectedContinent(exp.continent)}
                className={`px-5 py-2 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedContinent === exp.continent
                    ? "bg-[#053a1a] text-white shadow-lg ring-2 ring-[#00eb5b]/40 scale-102"
                    : "bg-white/10 hover:bg-white/20 text-amber-100 border border-white/10"
                }`}
              >
                {exp.continent} Route
              </button>
            ))}
          </div>

          {/* Expedition Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 text-xs font-bold">
                <Plane className="h-3.5 w-3.5" />
                <span>{currentExpedition.duration} • {currentExpedition.stops} Signature Stops</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-50 leading-tight">
                {currentExpedition.title}
              </h3>

              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#00eb5b] shrink-0" />
                <span className="font-bold text-xs sm:text-sm text-amber-100 tracking-wide">
                  {currentExpedition.route}
                </span>
              </div>

              {/* Highlights Chips */}
              <div>
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-2">
                  Key Experiences Included:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentExpedition.highlights.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-medium text-amber-100 border border-white/10 flex items-center gap-1.5"
                    >
                      <Sparkles className="h-3 w-3 text-[#00eb5b]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rating & CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex text-[#053a1a] gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="h-3 w-3 rounded-full bg-[#00eb5b] inline-block" />
                    ))}
                  </div>
                  <span className="font-black text-sm text-white">{currentExpedition.rating}</span>
                  <span className="text-xs text-gray-400">({currentExpedition.reviewsCount} reviews)</span>
                </div>

                <Link href={`/listings?query=${encodeURIComponent(currentExpedition.query)}`}>
                  <Button className="w-full sm:w-auto rounded-full bg-[#053a1a] hover:bg-[#032b13] text-white font-extrabold px-6 h-11 text-xs sm:text-sm shadow-lg gap-2">
                    <span>View Itinerary Stays & Tours</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-5">
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 group">
                <Image
                  src={currentExpedition.image}
                  alt={currentExpedition.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-bold text-[#00eb5b] uppercase">Featured Route</div>
                  <h4 className="font-black text-lg sm:text-xl drop-shadow-md">
                    {currentExpedition.continent} Masterpiece Tour
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
