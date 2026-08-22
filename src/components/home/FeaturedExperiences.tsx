"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Clock, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { useState } from "react";

const EXPERIENCES = [
  {
    id: "exp-1",
    title: "Eiffel Tower Summit Direct Access Tour with Guided Host",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 3420,
    price: 68,
    duration: "2.5 hours",
    badge: "Bestseller",
    freeCancel: true,
  },
  {
    id: "exp-2",
    title: "Mount Fuji, Lake Kawaguchi & Hakone Full-Day Sightseeing",
    location: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.95,
    reviewsCount: 5120,
    price: 95,
    duration: "10 hours",
    badge: "Travelers' Choice",
    freeCancel: true,
  },
  {
    id: "exp-3",
    title: "Nusa Penida Island Tour with Snorkeling Manta Rays",
    location: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.88,
    reviewsCount: 2890,
    price: 45,
    duration: "8 hours",
    badge: "Top Rated",
    freeCancel: true,
  },
  {
    id: "exp-4",
    title: "Colosseum & Roman Forum VIP Access with Gladiator Arena Floor",
    location: "Rome, Italy",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.92,
    reviewsCount: 6400,
    price: 79,
    duration: "3 hours",
    badge: "Likely to sell out",
    freeCancel: true,
  },
];

export function FeaturedExperiences() {
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00af87] uppercase tracking-wider mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Unforgettable Moments</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-950 tracking-tight">
            Top Rated Experiences Worldwide
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
            Book top-rated tours, skip-the-line tickets and curated day trips
          </p>
        </div>
        <Link
          href="/listings?type=ATTRACTION"
          className="text-xs sm:text-sm font-bold text-[#00af87] hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
        >
          <span>View all experiences</span>
          &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {EXPERIENCES.map((item) => {
          const isSaved = !!saved[item.id];
          return (
            <Link
              key={item.id}
              href={`/listings/${item.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200/90 hover:border-[#00af87]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-106"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-xs text-white text-[11px] font-bold">
                      {item.badge}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => toggleSave(item.id, e)}
                    aria-label="Save experience"
                    className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all ${
                      isSaved
                        ? "bg-rose-500 text-white shadow-md scale-110"
                        : "bg-white/80 hover:bg-white text-gray-700 shadow-xs"
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="text-xs font-semibold text-gray-500 mb-1">
                    {item.location}
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 line-clamp-2 leading-snug group-hover:text-[#00af87] transition-colors">
                    {item.title}
                  </h3>

                  {/* Rating Bubbles */}
                  <div className="mt-2.5 flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1 font-bold text-gray-900">
                      <div className="flex gap-0.5 text-[#00af87]">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#00af87] inline-block" />
                        ))}
                      </div>
                      <span>{item.rating}</span>
                    </div>
                    <span className="text-gray-400">({item.reviewsCount.toLocaleString()})</span>
                  </div>

                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {item.duration}
                    </span>
                    {item.freeCancel && (
                      <span className="flex items-center gap-1 text-emerald-700 font-medium">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Free cancellation
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Price Row */}
              <div className="p-4 pt-0 border-t border-gray-100 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-gray-500 block">from</span>
                  <div className="text-base sm:text-lg font-black text-gray-900">
                    ${item.price}{" "}
                    <span className="text-xs font-normal text-gray-500">/ person</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#00af87] group-hover:underline">
                  Check deals &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
