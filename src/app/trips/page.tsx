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
  ChevronRight,
  GripVertical,
  Car,
  Map as MapIcon,
  Layers,
  ArrowRight,
  Edit3,
  Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ItineraryItem {
  id: string;
  name: string;
  category: "Hotel" | "Attraction" | "Restaurant" | "Activity";
  location: string;
  image: string;
  time: string;
  notes: string;
  day: number; // 0 = Saved Pool, 1 = Day 1, 2 = Day 2, 3 = Day 3, 4 = Day 4
  lat: number;
  lng: number;
  durationMin: number;
}

const INITIAL_ITEMS: ItineraryItem[] = [
  {
    id: "item-1",
    name: "The St. Regis Bali Resort",
    category: "Hotel",
    location: "Nusa Dua, Bali",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    time: "02:00 PM",
    notes: "Lagoon villa check-in & welcome coconut drink",
    day: 1,
    lat: -8.805,
    lng: 115.228,
    durationMin: 90,
  },
  {
    id: "item-2",
    name: "Uluwatu Sunset Temple & Kecak Dance",
    category: "Attraction",
    location: "South Kuta, Bali",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    time: "05:30 PM",
    notes: "Sunset cliffside amphitheater tickets reserved",
    day: 1,
    lat: -8.829,
    lng: 115.084,
    durationMin: 120,
  },
  {
    id: "item-3",
    name: "Nusa Penida Speedboat & Manta Snorkel",
    category: "Activity",
    location: "Sanur Port, Bali",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    time: "07:30 AM",
    notes: "Meet captain at Harbor Gate 4. Bring waterproof bag.",
    day: 2,
    lat: -8.728,
    lng: 115.544,
    durationMin: 360,
  },
  {
    id: "item-4",
    name: "Kayuputi Beachfront Fine Dining",
    category: "Restaurant",
    location: "Nusa Dua, Bali",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    time: "08:00 PM",
    notes: "Degustation menu with oceanfront table booked",
    day: 2,
    lat: -8.806,
    lng: 115.229,
    durationMin: 120,
  },
  {
    id: "item-5",
    name: "Tegallalang Rice Terrace & Jungle Swing",
    category: "Attraction",
    location: "Ubud, Bali",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    time: "09:00 AM",
    notes: "Early morning hike before tourist crowds",
    day: 3,
    lat: -8.433,
    lng: 115.279,
    durationMin: 150,
  },
  {
    id: "item-6",
    name: "Locavore NXT Culinary Lab",
    category: "Restaurant",
    location: "Ubud, Bali",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    time: "01:00 PM",
    notes: "Hyper-local Indonesian botanical tasting menu",
    day: 3,
    lat: -8.507,
    lng: 115.263,
    durationMin: 120,
  },
  // Saved Unassigned Spots
  {
    id: "item-7",
    name: "Tirta Empul Holy Water Temple",
    category: "Attraction",
    location: "Manukaya, Bali",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    time: "10:00 AM",
    notes: "Traditional spiritual cleansing ceremony",
    day: 0,
    lat: -8.415,
    lng: 115.315,
    durationMin: 90,
  },
  {
    id: "item-8",
    name: "Potato Head Beach Club & Sunset Bar",
    category: "Restaurant",
    location: "Seminyak, Bali",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    time: "04:30 PM",
    notes: "Infinity pool daybed reservation",
    day: 0,
    lat: -8.686,
    lng: 115.152,
    durationMin: 180,
  },
];

export default function TripsPage() {
  const [items, setItems] = useState<ItineraryItem[]>(INITIAL_ITEMS);
  const [selectedMapDay, setSelectedMapDay] = useState<number | "ALL">(1);
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);
  const [isAddSpotModalOpen, setIsAddSpotModalOpen] = useState(false);
  const [mobileView, setMobileView] = useState<"board" | "map" | "saved">("board");

  // Form state for new custom spot
  const [newSpotName, setNewSpotName] = useState("");
  const [newSpotCategory, setNewSpotCategory] = useState<"Hotel" | "Attraction" | "Restaurant" | "Activity">("Attraction");
  const [newSpotDay, setNewSpotDay] = useState(1);
  const [newSpotTime, setNewSpotTime] = useState("10:00 AM");
  const [newSpotNotes, setNewSpotNotes] = useState("");

  const days = [1, 2, 3];

  // Move item to another day or saved pool
  const moveItemToDay = (id: string, targetDay: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, day: targetDay } : item))
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddSpot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpotName.trim()) return;

    const newItem: ItineraryItem = {
      id: `spot-${Date.now()}`,
      name: newSpotName.trim(),
      category: newSpotCategory,
      location: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      time: newSpotTime,
      notes: newSpotNotes,
      day: newSpotDay,
      lat: -8.5 + (Math.random() - 0.5) * 0.4,
      lng: 115.2 + (Math.random() - 0.5) * 0.4,
      durationMin: 90,
    };

    setItems((prev) => [...prev, newItem]);
    setIsAddSpotModalOpen(false);
    setNewSpotName("");
    setNewSpotNotes("");
  };

  // Map spots filtered by selected map day
  const mapSpots = items.filter((item) =>
    selectedMapDay === "ALL" ? item.day > 0 : item.day === selectedMapDay
  );

  const savedPoolItems = items.filter((item) => item.day === 0);

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-16">
      {/* Header Banner */}
      <div className="bg-white border-b border-gray-200 sticky top-18 sm:top-20 z-20 shadow-2xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#00af87] uppercase tracking-wide">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Trip Planner & Route Board</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-gray-950 mt-0.5">
                Bali Summer Escape 🌴
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Aug 24 – Aug 30, 2026 • 2 Travelers • 6 Scheduled Places • 2 Saved Spots
              </p>
            </div>

            {/* Actions & View Controls */}
            <div className="flex items-center gap-2">
              {/* Mobile View Toggle */}
              <div className="flex lg:hidden bg-gray-100 p-1 rounded-full border border-gray-200">
                <button
                  onClick={() => setMobileView("board")}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                    mobileView === "board" ? "bg-white text-black shadow-xs" : "text-gray-600"
                  }`}
                >
                  Board
                </button>
                <button
                  onClick={() => setMobileView("map")}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                    mobileView === "map" ? "bg-white text-black shadow-xs" : "text-gray-600"
                  }`}
                >
                  Route Map
                </button>
                <button
                  onClick={() => setMobileView("saved")}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                    mobileView === "saved" ? "bg-white text-black shadow-xs" : "text-gray-600"
                  }`}
                >
                  Saved ({savedPoolItems.length})
                </button>
              </div>

              <Button
                variant="outline"
                className="hidden sm:flex rounded-full border-gray-300 text-xs font-bold gap-1.5"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: "Bali Trip Itinerary", url: window.location.href });
                  } else {
                    alert("Itinerary link copied to clipboard!");
                  }
                }}
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Share</span>
              </Button>

              <Button
                onClick={() => setIsAddSpotModalOpen(true)}
                className="rounded-full bg-[#00af87] hover:bg-[#009673] text-white text-xs font-bold gap-1.5 px-4 shadow-sm"
              >
                <Plus className="h-4 w-4" />
                <span>Add Spot</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Board & Interactive Route Map */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Multi-Day Itinerary Board & Saved Pool (8 Cols on Desktop) */}
          <div
            className={`lg:col-span-7 xl:col-span-8 space-y-6 ${
              mobileView === "map" ? "hidden lg:block" : ""
            } ${mobileView === "saved" ? "hidden lg:block" : ""}`}
          >
            {/* Unassigned Saved Spots Drawer / Bar */}
            <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4 text-[#00af87]" />
                  <h3 className="font-extrabold text-sm text-gray-900">
                    Saved Spots ({savedPoolItems.length})
                  </h3>
                  <span className="text-[11px] text-gray-400 font-medium">
                    Move spots into specific days
                  </span>
                </div>
                <Link href="/listings?query=Bali" className="text-xs text-[#00af87] font-bold hover:underline">
                  + Find more places
                </Link>
              </div>

              {savedPoolItems.length === 0 ? (
                <div className="p-4 rounded-2xl bg-gray-50 border border-dashed border-gray-200 text-center text-xs text-gray-500">
                  All saved spots are assigned to your days! Search places to add more.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {savedPoolItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl bg-gray-50/80 border border-gray-200 hover:border-[#00af87] transition-all flex items-center justify-between gap-3 shadow-2xs group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="relative h-10 w-10 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="truncate">
                          <h4 className="font-bold text-xs text-gray-900 truncate">{item.name}</h4>
                          <span className="text-[10px] text-gray-500">{item.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <select
                          onChange={(e) => moveItemToDay(item.id, Number(e.target.value))}
                          defaultValue=""
                          className="bg-white border border-gray-300 rounded-lg px-2 py-1 text-[11px] font-bold text-[#00af87] outline-none shadow-2xs cursor-pointer"
                        >
                          <option value="" disabled>Move to...</option>
                          <option value="1">Day 1</option>
                          <option value="2">Day 2</option>
                          <option value="3">Day 3</option>
                        </select>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-gray-400 hover:text-rose-500 rounded-md"
                          title="Remove spot"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Days Itinerary Columns */}
            <div className="space-y-6">
              {days.map((dayNum) => {
                const dayItems = items.filter((i) => i.day === dayNum);

                return (
                  <div
                    key={dayNum}
                    className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 shadow-xs space-y-4"
                  >
                    {/* Day Header */}
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-2xl bg-black text-white flex items-center justify-center font-black text-sm shadow-sm">
                          D{dayNum}
                        </div>
                        <div>
                          <h3 className="font-black text-base sm:text-lg text-gray-900">
                            Day {dayNum} — {dayNum === 1 ? "Nusa Dua & South Coast" : dayNum === 2 ? "Islands & Fine Dining" : "Ubud Culture & Sacred Temples"}
                          </h3>
                          <p className="text-xs text-gray-500 font-medium">
                            {dayItems.length} activities scheduled
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedMapDay(dayNum)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
                          selectedMapDay === dayNum
                            ? "bg-[#00af87] text-white border-[#00af87]"
                            : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        Focus on Map
                      </button>
                    </div>

                    {/* Day Activity Cards */}
                    {dayItems.length === 0 ? (
                      <div className="p-8 rounded-2xl border-2 border-dashed border-gray-200 text-center space-y-2">
                        <p className="text-xs font-semibold text-gray-500">
                          No activities scheduled for Day {dayNum} yet.
                        </p>
                        <Button
                          size="sm"
                          onClick={() => {
                            setNewSpotDay(dayNum);
                            setIsAddSpotModalOpen(true);
                          }}
                          className="rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 text-xs font-bold"
                        >
                          + Add a spot to Day {dayNum}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {dayItems.map((item, idx) => {
                          const isHighlighted = highlightedItemId === item.id;

                          return (
                            <div key={item.id}>
                              {/* Itinerary Item Card */}
                              <div
                                onMouseEnter={() => setHighlightedItemId(item.id)}
                                onMouseLeave={() => setHighlightedItemId(null)}
                                className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row items-start gap-4 ${
                                  isHighlighted
                                    ? "bg-emerald-50/60 border-[#00af87] shadow-md ring-2 ring-[#00af87]/20"
                                    : "bg-white border-gray-200/90 hover:border-gray-300 shadow-2xs"
                                }`}
                              >
                                {/* Drag Handle & Stop Number Badge */}
                                <div className="flex items-center gap-2 shrink-0">
                                  <div className="h-7 w-7 rounded-xl bg-[#00af87] text-white flex items-center justify-center font-black text-xs shadow-2xs">
                                    {idx + 1}
                                  </div>
                                </div>

                                {/* Thumbnail */}
                                <div className="relative w-full sm:w-28 h-28 sm:h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                  <span className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded bg-black/75 text-white text-[9px] font-bold">
                                    {item.category}
                                  </span>
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0 space-y-1 w-full">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-extrabold text-sm sm:text-base text-gray-900 truncate">
                                      {item.name}
                                    </h4>
                                    <span className="flex items-center gap-1 text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-lg shrink-0">
                                      <Clock className="h-3 w-3 text-[#00af87]" />
                                      {item.time}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                                    <span className="truncate">{item.location}</span>
                                  </div>

                                  {item.notes && (
                                    <p className="text-xs text-gray-600 bg-amber-50/70 border border-amber-200/50 p-2 rounded-xl mt-1">
                                      💡 {item.notes}
                                    </p>
                                  )}
                                </div>

                                {/* Item Actions */}
                                <div className="flex sm:flex-col items-center justify-between sm:justify-start gap-1 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                                  <select
                                    value={item.day}
                                    onChange={(e) => moveItemToDay(item.id, Number(e.target.value))}
                                    className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-[11px] font-semibold text-gray-700 outline-none cursor-pointer"
                                  >
                                    <option value="1">Day 1</option>
                                    <option value="2">Day 2</option>
                                    <option value="3">Day 3</option>
                                    <option value="0">Unassign (Saved)</option>
                                  </select>

                                  <button
                                    onClick={() => removeItem(item.id)}
                                    className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                                    title="Remove"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>

                              {/* Drive time indicator to next stop */}
                              {idx < dayItems.length - 1 && (
                                <div className="py-1 px-8 flex items-center gap-2 text-[11px] font-semibold text-gray-400">
                                  <div className="w-0.5 h-4 bg-gray-200 ml-3" />
                                  <Car className="h-3 w-3 text-emerald-600" />
                                  <span>approx. 20–35 min drive to next stop</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Route Map with Canvas Visuals (4/5 Cols on Desktop) */}
          <div
            className={`lg:col-span-5 xl:col-span-4 sticky top-36 space-y-4 ${
              mobileView === "board" ? "hidden lg:block" : ""
            }`}
          >
            <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <MapIcon className="h-5 w-5 text-[#00af87]" />
                  <h3 className="font-extrabold text-sm sm:text-base text-gray-900">
                    Interactive Route Map
                  </h3>
                </div>

                {/* Filter Route by Day */}
                <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-full text-xs">
                  <button
                    onClick={() => setSelectedMapDay("ALL")}
                    className={`px-2.5 py-1 rounded-full font-bold transition-colors ${
                      selectedMapDay === "ALL" ? "bg-black text-white" : "text-gray-600"
                    }`}
                  >
                    All Days
                  </button>
                  {days.map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedMapDay(d)}
                      className={`px-2.5 py-1 rounded-full font-bold transition-colors ${
                        selectedMapDay === d ? "bg-[#00af87] text-white" : "text-gray-600"
                      }`}
                    >
                      D{d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Map Canvas Simulation */}
              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-[#e5e3df] border border-gray-300 shadow-inner">
                {/* Visual Map Texture */}
                <div className="absolute inset-0 bg-[radial-gradient(#00af87_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-30" />
                
                {/* Bali Island Vector Silhouette Representation */}
                <svg
                  className="absolute inset-0 w-full h-full text-emerald-100/80 pointer-events-none"
                  viewBox="0 0 400 300"
                  fill="currentColor"
                >
                  <path d="M 50 150 Q 120 80 220 100 Q 340 110 360 180 Q 320 240 200 230 Q 100 250 50 150 Z" />
                </svg>

                {/* SVG Route Connecting Path Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
                  <path
                    d={
                      selectedMapDay === 1
                        ? "M 230 220 L 160 250"
                        : selectedMapDay === 2
                        ? "M 320 170 L 230 220"
                        : selectedMapDay === 3
                        ? "M 210 120 L 200 150"
                        : "M 230 220 L 160 250 L 320 170 L 210 120 L 200 150"
                    }
                    fill="none"
                    stroke="#00af87"
                    strokeWidth="3"
                    strokeDasharray="6,4"
                    className="animate-pulse"
                  />
                </svg>

                {/* Waypoint Markers */}
                {mapSpots.map((spot, idx) => {
                  const isHighlighted = highlightedItemId === spot.id;
                  // Map coordinates approximation to SVG canvas box (400x300)
                  const leftPercent = ((spot.lng - 115.0) / 0.6) * 100;
                  const topPercent = ((-spot.lat - 8.3) / 0.6) * 100;

                  return (
                    <div
                      key={spot.id}
                      style={{
                        left: `${Math.max(10, Math.min(85, leftPercent))}%`,
                        top: `${Math.max(15, Math.min(85, topPercent))}%`,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                      onClick={() => setHighlightedItemId(spot.id)}
                    >
                      <div
                        className={`relative flex items-center justify-center rounded-full font-black text-xs shadow-lg transition-transform ${
                          isHighlighted
                            ? "h-9 w-9 bg-black text-white scale-125 ring-4 ring-[#00af87]"
                            : spot.day === 1
                            ? "h-7 w-7 bg-[#00af87] text-white hover:scale-110"
                            : spot.day === 2
                            ? "h-7 w-7 bg-amber-500 text-white hover:scale-110"
                            : "h-7 w-7 bg-purple-600 text-white hover:scale-110"
                        }`}
                      >
                        {idx + 1}
                      </div>

                      {/* Map Popup Tooltip */}
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 hidden group-hover:block z-30 pointer-events-none">
                        <div className="bg-black/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-xl whitespace-nowrap">
                          {spot.name} • {spot.time}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Bottom Route Stats Overlay */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-md border border-gray-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">
                      {selectedMapDay === "ALL" ? "Total Full Trip Route" : `Day ${selectedMapDay} Route Summary`}
                    </span>
                    <span className="font-extrabold text-gray-900">
                      {mapSpots.length} Stops • {mapSpots.length * 18} km Total
                    </span>
                  </div>

                  <div className="flex items-center gap-1 font-bold text-[#00af87]">
                    <Car className="h-4 w-4" />
                    <span>~{mapSpots.length * 25} min travel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Custom Spot Modal */}
      {isAddSpotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsAddSpotModalOpen(false)}
          />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl z-10 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-lg text-gray-900">Add Spot to Itinerary</h3>
              <button
                onClick={() => setIsAddSpotModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddSpot} className="space-y-4 text-xs font-medium">
              <div>
                <label className="font-bold text-gray-700 uppercase block mb-1">Place Name</label>
                <input
                  type="text"
                  required
                  value={newSpotName}
                  onChange={(e) => setNewSpotName(e.target.value)}
                  placeholder="e.g. Mount Batur Sunrise Trek"
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold outline-none focus:border-[#00af87]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 uppercase block mb-1">Category</label>
                  <select
                    value={newSpotCategory}
                    onChange={(e) => setNewSpotCategory(e.target.value as any)}
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold outline-none"
                  >
                    <option value="Attraction">Attraction</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Activity">Activity</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 uppercase block mb-1">Assign to</label>
                  <select
                    value={newSpotDay}
                    onChange={(e) => setNewSpotDay(Number(e.target.value))}
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold outline-none"
                  >
                    <option value="1">Day 1</option>
                    <option value="2">Day 2</option>
                    <option value="3">Day 3</option>
                    <option value="0">Saved Unassigned</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 uppercase block mb-1">Scheduled Time</label>
                <input
                  type="text"
                  value={newSpotTime}
                  onChange={(e) => setNewSpotTime(e.target.value)}
                  placeholder="e.g. 10:00 AM"
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold outline-none focus:border-[#00af87]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 uppercase block mb-1">Notes & Tips</label>
                <textarea
                  rows={3}
                  value={newSpotNotes}
                  onChange={(e) => setNewSpotNotes(e.target.value)}
                  placeholder="e.g. Book guide in advance, dress code requirements..."
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold outline-none focus:border-[#00af87] resize-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddSpotModalOpen(false)}
                  className="flex-1 rounded-full text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 rounded-full bg-[#00af87] hover:bg-[#009673] text-white text-xs font-bold"
                >
                  Save to Itinerary
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
