"use client";

import Link from "next/link";
import { Bed, Ticket, Utensils, Plane, Home, Compass, Sparkles, Ship } from "lucide-react";

const CATEGORIES = [
  {
    name: "Hotels",
    desc: "Luxury resorts to cozy boutique stays",
    icon: Bed,
    href: "/listings?type=HOTEL",
    bg: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    tag: "200k+ stays",
  },
  {
    name: "Things to Do",
    desc: "Tours, attractions & day adventures",
    icon: Ticket,
    href: "/listings?type=ATTRACTION",
    bg: "bg-amber-50 text-amber-700 hover:bg-amber-100",
    tag: "Top rated",
  },
  {
    name: "Restaurants",
    desc: "Michelin stars to local street gems",
    icon: Utensils,
    href: "/listings?type=RESTAURANT",
    bg: "bg-rose-50 text-rose-700 hover:bg-rose-100",
    tag: "Table booking",
  },
  {
    name: "Holiday Homes",
    desc: "Private villas, cabins & beach houses",
    icon: Home,
    href: "/listings?type=HOLIDAY_HOME",
    bg: "bg-purple-50 text-purple-700 hover:bg-purple-100",
    tag: "Family friendly",
  },
  {
    name: "Cheap Flights",
    desc: "Compare 500+ airlines for lowest fares",
    icon: Plane,
    href: "/listings?type=FLIGHT",
    bg: "bg-sky-50 text-sky-700 hover:bg-sky-100",
    tag: "Price alerts",
  },
  {
    name: "Cruises & Boats",
    desc: "Island hopping & luxury ocean liners",
    icon: Ship,
    href: "/listings?type=ATTRACTION&query=cruise",
    bg: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
    tag: "Scenic routes",
  },
];

export function CategoryGrid() {
  return (
    <section className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-950 tracking-tight">
            Explore by Category
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
            Everything you need for an unforgettable journey
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.name}
              href={cat.href}
              className="group p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/90 hover:border-[#00af87] shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center justify-between min-h-[140px] sm:min-h-[160px]"
            >
              <div className={`p-3 rounded-2xl ${cat.bg} transition-transform group-hover:scale-110`}>
                <Icon className="h-6 w-6" />
              </div>

              <div className="mt-3">
                <h3 className="font-black text-sm sm:text-base text-gray-900 group-hover:text-[#00af87] transition-colors">
                  {cat.name}
                </h3>
                <span className="inline-block mt-1 text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {cat.tag}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
