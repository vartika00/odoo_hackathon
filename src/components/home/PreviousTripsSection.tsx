"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Plus, MapPin, Heart } from "lucide-react";
import { Button } from "../ui/button";

const MOCK_PREVIOUS_TRIPS = [
  {
    id: "trip-1",
    name: "Summer in Santorini",
    date: "Aug 12 - Aug 18, 2025",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    cities: ["Fira", "Oia"]
  },
  {
    id: "trip-2",
    name: "Tokyo Adventure",
    date: "Nov 5 - Nov 15, 2024",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    cities: ["Tokyo", "Kyoto"]
  },
];

export function PreviousTripsSection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Previous Trips</h2>
          <p className="text-sm text-gray-500 mt-1">Revisit your past adventures and memories</p>
        </div>
        <Link href="/trips">
          <Button className="bg-[#00af87] hover:bg-[#009b77] text-white font-bold text-sm rounded-full h-10 px-5 flex items-center gap-2 shadow-md">
            <Plus className="w-4 h-4" />
            <span>Plan a trip</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PREVIOUS_TRIPS.map((trip) => (
          <Link key={trip.id} href="/trips" className="group">
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
              <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                <Image
                  src={trip.image}
                  alt={trip.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-4 h-4 text-rose-500" />
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black text-gray-900 group-hover:text-[#00af87] transition-colors">
                    {trip.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{trip.date}</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {trip.cities.map((city) => (
                    <span key={city} className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-[#00af87]" />
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* Empty State / Call to Action Card */}
        <div className="bg-emerald-50/50 rounded-3xl border border-dashed border-emerald-200 flex flex-col items-center justify-center p-8 text-center min-h-[280px]">
          <div className="w-12 h-12 bg-emerald-100 text-[#00af87] rounded-full flex items-center justify-center mb-4">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-emerald-900 mb-2">Plan your next adventure</h3>
          <p className="text-sm text-emerald-700 mb-6 max-w-[200px] font-medium">Create a new itinerary with our smart builder tool.</p>
          <Link href="/trips">
            <Button className="bg-white hover:bg-gray-50 text-[#00af87] border border-[#00af87] font-bold text-sm rounded-full h-10 px-6">
              Start Planning
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
