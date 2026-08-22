"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Heart,
  MapPin,
  Calendar,
  Clock,
  Trash2,
  Share2,
  Sparkles,
  Navigation,
  CheckCircle2,
  X,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TripItem {
  id: string;
  name: string;
  category: string;
  location: string;
  image: string;
  time?: string;
  notes?: string;
  dayIndex: number;
}

const INITIAL_TRIP_ITEMS: TripItem[] = [
  {
    id: "item-1",
    name: "The St. Regis Bali Resort",
    category: "Hotel Check-in",
    location: "Nusa Dua, Bali",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    time: "2:00 PM",
    notes: "Request high floor Lagoon access villa.",
    dayIndex: 1,
  },
  {
    id: "item-2",
    name: "Uluwatu Sunset Temple & Kecak Fire Dance",
    category: "Experience",
    location: "South Kuta, Bali",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    time: "5:30 PM",
    notes: "Arrive 30 mins early for best ocean sunset amphitheater seating.",
    dayIndex: 1,
  },
  {
    id: "item-3",
    name: "Nusa Penida Island Speedboat & Snorkeling",
    category: "Day Adventure",
    location: "Sanur Port, Bali",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    time: "7:00 AM",
    notes: "Bring waterproof camera and sunscreen.",
    dayIndex: 2,
  },
  {
    id: "item-4",
    name: "Kayuputi Beachfront Fine Dining",
    category: "Dinner Reservation",
    location: "Nusa Dua, Bali",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    time: "8:00 PM",
    notes: "Pan-Asian degustation menu with wine pairing booked.",
    dayIndex: 2,
  },
];

export default function TripsPage() {
  const [activeTab, setActiveTab] = useState<"itinerary" | "saved">("itinerary");
  const [selectedDay, setSelectedDay] = useState(1);
  const [tripItems, setTripItems] = useState<TripItem[]>(INITIAL_TRIP_ITEMS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTripTitle, setNewTripTitle] = useState("");
  const [newTripDestination, setNewTripDestination] = useState("");

  const days = [1, 2, 3, 4];

  const currentDayItems = tripItems.filter((item) => item.dayIndex === selectedDay);

  const removeItem = (id: string) => {
    setTripItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleCreateTrip = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTripTitle.trim()) {
      alert(`Trip "${newTripTitle}" created successfully!`);
      setIsCreateModalOpen(false);
      setNewTripTitle("");
      setNewTripDestination("");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-16">
      {/* Header Banner */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#00af87] uppercase tracking-wide mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Trip Planner & Itineraries</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-gray-950">
                Bali Summer Escape 2026 🌴
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                Aug 24 – Aug 30, 2026 • 2 Travelers • 4 Days Planned
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="rounded-full border-gray-300 text-xs font-bold gap-1.5"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: "My Bali Trip", url: window.location.href });
                  } else {
                    alert("Itinerary link copied to clipboard!");
                  }
                }}
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Share Trip</span>
              </Button>

              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="rounded-full bg-[#00af87] hover:bg-[#009673] text-white text-xs font-bold gap-1.5 px-5 shadow-sm"
              >
                <Plus className="h-4 w-4" />
                <span>New Trip</span>
              </Button>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="mt-6 flex items-center gap-2 border-b border-gray-100">
            <button
              onClick={() => setActiveTab("itinerary")}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
                activeTab === "itinerary"
                  ? "border-[#00af87] text-[#00af87]"
                  : "border-transparent text-gray-600 hover:text-black"
              }`}
            >
              Day-by-Day Itinerary ({tripItems.length} items)
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
                activeTab === "saved"
                  ? "border-[#00af87] text-[#00af87]"
                  : "border-transparent text-gray-600 hover:text-black"
              }`}
            >
              Saved Places (6)
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "itinerary" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Days Sidebar / Selector */}
            <div className="lg:col-span-3 space-y-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Itinerary Schedule
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-2">
                {days.map((day) => {
                  const dayItemsCount = tripItems.filter((i) => i.dayIndex === day).length;
                  const isActive = selectedDay === day;
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`p-3 rounded-2xl text-left transition-all border ${
                        isActive
                          ? "bg-white border-[#00af87] shadow-sm ring-2 ring-[#00af87]/20"
                          : "bg-white/80 border-gray-200 hover:bg-white text-gray-600"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-black text-sm ${isActive ? "text-[#00af87]" : "text-gray-900"}`}>
                          Day {day}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                          {dayItemsCount} {dayItemsCount === 1 ? "activity" : "activities"}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-400 block mt-0.5">
                        {day === 1 ? "Arrival & Nusa Dua" : day === 2 ? "Islands & Fine Dining" : day === 3 ? "Ubud Temples & Spas" : "Beach & Departure"}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 mt-4 text-xs space-y-1">
                <span className="font-bold text-emerald-900 block flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#00af87]" /> Smart Route Optimization
                </span>
                <p className="text-emerald-800 text-[11px]">
                  All activities on Day {selectedDay} are within 25 mins travel radius to minimize driving.
                </p>
              </div>
            </div>

            {/* Day Items List */}
            <div className="lg:col-span-9 space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
                <div>
                  <h2 className="text-lg font-black text-gray-900">
                    Day {selectedDay} Schedule
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">
                    {currentDayItems.length} activities scheduled
                  </p>
                </div>

                <Link href="/listings?query=Bali">
                  <Button
                    size="sm"
                    className="rounded-full bg-[#00af87] hover:bg-[#009673] text-white text-xs font-bold gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add to Day {selectedDay}</span>
                  </Button>
                </Link>
              </div>

              {currentDayItems.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center space-y-3">
                  <p className="text-sm font-semibold text-gray-600">No activities added for Day {selectedDay} yet.</p>
                  <Link href="/listings?query=Bali">
                    <Button className="rounded-full bg-black text-white text-xs font-bold">
                      Explore Bali Activities & Stays
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {currentDayItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start gap-4"
                    >
                      {/* Number Index Badge */}
                      <div className="h-7 w-7 rounded-full bg-[#00af87] text-white flex items-center justify-center text-xs font-black shrink-0">
                        {index + 1}
                      </div>

                      {/* Photo Thumbnail */}
                      <div className="relative w-full sm:w-40 h-36 sm:h-28 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Content Details */}
                      <div className="flex-1 space-y-1.5 w-full">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[10px] font-bold uppercase">
                            {item.category}
                          </span>
                          {item.time && (
                            <span className="flex items-center gap-1 text-xs font-bold text-gray-700">
                              <Clock className="h-3.5 w-3.5 text-[#00af87]" />
                              {item.time}
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-base text-gray-900">
                          {item.name}
                        </h3>

                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="h-3.5 w-3.5 text-gray-400" />
                          <span>{item.location}</span>
                        </div>

                        {item.notes && (
                          <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 font-medium mt-2">
                            💡 {item.notes}
                          </div>
                        )}
                      </div>

                      {/* Delete action */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-rose-500 rounded-full hover:bg-rose-50 transition-colors self-end sm:self-start"
                        title="Remove from itinerary"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Saved Places Tab */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tripItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2.5 right-2.5 p-2 rounded-full bg-rose-500 text-white shadow-md">
                      <Heart className="h-4 w-4 fill-current" />
                    </div>
                  </div>

                  <div className="p-4">
                    <span className="text-[10px] font-bold uppercase text-gray-400 block">{item.category}</span>
                    <h3 className="font-bold text-sm text-gray-900 mt-0.5">{item.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <MapPin className="h-3.5 w-3.5 text-gray-400" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <Link href={`/listings/${item.id}`}>
                    <Button className="w-full rounded-full bg-[#00af87] hover:bg-[#009673] text-white text-xs font-bold h-9">
                      View Details &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create New Trip Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsCreateModalOpen(false)}
          />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl z-10 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-xl text-gray-900">Create a New Trip</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTrip} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">
                  Trip Name
                </label>
                <input
                  type="text"
                  required
                  value={newTripTitle}
                  onChange={(e) => setNewTripTitle(e.target.value)}
                  placeholder="e.g. Tokyo Autumn Adventure"
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium outline-none focus:border-[#00af87]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">
                  Primary Destination
                </label>
                <input
                  type="text"
                  value={newTripDestination}
                  onChange={(e) => setNewTripDestination(e.target.value)}
                  placeholder="e.g. Tokyo, Japan"
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium outline-none focus:border-[#00af87]"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 rounded-full text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 rounded-full bg-[#00af87] hover:bg-[#009673] text-white text-xs font-bold"
                >
                  Create Trip
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
