"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/navigation";
import NextLink from "next/link";
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
  Bookmark,
  DollarSign,
  PieChart as PieChartIcon,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
  Copy,
  Check,
  AlertTriangle,
  ArrowUpDown,
  Utensils,
  Camera,
  Compass,
  Building,
  Plane,
  Eye,
  ListTodo
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- TYPES ---
export interface ActivityItem {
  id: string;
  name: string;
  category: "Hotel" | "Attraction" | "Restaurant" | "Activity" | "Transport";
  location: string;
  image: string;
  time: string;
  notes: string;
  cost: number;
  durationMin: number;
  lat: number;
  lng: number;
}

export interface CityStop {
  id: string;
  cityName: string;
  country: string;
  coverImage: string;
  dates: string;
  daysCount: number;
  expenseTier: "$" | "$$" | "$$$";
  popularityScore: number; // e.g. 98%
  activities: ActivityItem[];
}

export interface Trip {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  coverImage: string;
  targetBudget: number;
  stops: CityStop[];
}

// --- CURATED CITIES DATABASE FOR SEARCH ---
const GLOBAL_CITIES_SEARCH = [
  {
    id: "c-bali",
    name: "Bali",
    country: "Indonesia",
    expenseTier: "$" as const,
    popularityScore: 98,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    highlight: "Tropical beaches, Nusa Penida manta diving & volcanic temples"
  },
  {
    id: "c-paris",
    name: "Paris",
    country: "France",
    expenseTier: "$$$" as const,
    popularityScore: 99,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    highlight: "Eiffel Tower, Louvre Museum & Michelin dining"
  },
  {
    id: "c-rome",
    name: "Rome",
    country: "Italy",
    expenseTier: "$$" as const,
    popularityScore: 97,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    highlight: "Colosseum, Vatican City & authentic Trastevere trattorias"
  },
  {
    id: "c-tokyo",
    name: "Tokyo",
    country: "Japan",
    expenseTier: "$$" as const,
    popularityScore: 98,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    highlight: "Shibuya crossing, Tsukiji sushi & Mount Fuji day trips"
  },
  {
    id: "c-goa",
    name: "Goa",
    country: "India",
    expenseTier: "$" as const,
    popularityScore: 94,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    highlight: "Sun-kissed beaches, Portuguese villas & seafood shacks"
  },
  {
    id: "c-swiss",
    name: "Interlaken",
    country: "Switzerland",
    expenseTier: "$$$" as const,
    popularityScore: 96,
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    highlight: "Jungfraujoch Top of Europe, alpine skiing & glacial lakes"
  },
];

// --- CURATED ACTIVITIES DATABASE FOR SEARCH ---
const GLOBAL_ACTIVITIES_SEARCH = [
  {
    id: "act-1",
    name: "Private Sunset Catamaran & Snorkeling",
    category: "Activity" as const,
    location: "Coastline Harbor",
    cost: 140,
    durationMin: 240,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    type: "Adventure"
  },
  {
    id: "act-2",
    name: "5-Star Luxury Ocean Villa Check-in",
    category: "Hotel" as const,
    location: "Exclusive Coastal Bay",
    cost: 450,
    durationMin: 120,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    type: "Stay"
  },
  {
    id: "act-3",
    name: "Guided Michelin Tasting Menu Experience",
    category: "Restaurant" as const,
    location: "Historic Old Quarter",
    cost: 180,
    durationMin: 150,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    type: "Food"
  },
  {
    id: "act-4",
    name: "VIP Skip-The-Line Historic Monument Tour",
    category: "Attraction" as const,
    location: "City Landmark Center",
    cost: 65,
    durationMin: 180,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    type: "Sightseeing"
  },
  {
    id: "act-5",
    name: "First-Class Scenic High-Speed Rail Transfer",
    category: "Transport" as const,
    location: "Central Station",
    cost: 95,
    durationMin: 190,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    type: "Transport"
  },
  {
    id: "act-6",
    name: "Sunrise Hot Air Balloon Flight & Champagne",
    category: "Activity" as const,
    location: "Valley Launch Field",
    cost: 260,
    durationMin: 180,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    type: "Adventure"
  },
];

// --- INITIAL TRIPS DATA ---
const INITIAL_TRIPS: Trip[] = [
  {
    id: "trip-bali-2026",
    name: "Bali & Nusa Penida Island Expedition",
    description: "Cliffside ocean villas, manta ray snorkeling, Kecak temple dances & Michelin dining in Ubud.",
    startDate: "2026-09-10",
    endDate: "2026-09-18",
    coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    targetBudget: 3200,
    stops: [
      {
        id: "stop-nusa-dua",
        cityName: "Nusa Dua & Uluwatu",
        country: "Indonesia",
        coverImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        dates: "Sep 10 - Sep 13 (3 Days)",
        daysCount: 3,
        expenseTier: "$$",
        popularityScore: 98,
        activities: [
          {
            id: "a-1",
            name: "The St. Regis Bali Resort",
            category: "Hotel",
            location: "Nusa Dua Coastal Lagoon",
            image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            time: "02:00 PM",
            notes: "Oceanfront villa check-in & welcome drink",
            cost: 590,
            durationMin: 90,
            lat: -8.805,
            lng: 115.228
          },
          {
            id: "a-2",
            name: "Uluwatu Sunset Temple & Fire Dance",
            category: "Attraction",
            location: "South Kuta Cliffside",
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            time: "05:30 PM",
            notes: "Cliffside amphitheater reserved seating",
            cost: 45,
            durationMin: 120,
            lat: -8.829,
            lng: 115.084
          }
        ]
      },
      {
        id: "stop-nusa-penida",
        cityName: "Nusa Penida & Sanur",
        country: "Indonesia",
        coverImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        dates: "Sep 14 - Sep 18 (4 Days)",
        daysCount: 4,
        expenseTier: "$",
        popularityScore: 95,
        activities: [
          {
            id: "a-3",
            name: "Nusa Penida Speedboat & Manta Snorkel",
            category: "Activity",
            location: "Sanur Harbor Gate 4",
            image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            time: "07:30 AM",
            notes: "Bring waterproof bag & underwater camera",
            cost: 110,
            durationMin: 360,
            lat: -8.728,
            lng: 115.544
          },
          {
            id: "a-4",
            name: "Kayuputi Beachfront Degustation Dinner",
            category: "Restaurant",
            location: "Beachfront Boardwalk",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            time: "08:00 PM",
            notes: "Wine pairing table reserved",
            cost: 180,
            durationMin: 120,
            lat: -8.806,
            lng: 115.229
          }
        ]
      }
    ]
  },
  {
    id: "trip-europe-2026",
    name: "European Grand Journey: Paris & Swiss Alps",
    description: "High-speed rail from the Eiffel Tower to Europe's highest mountain peak.",
    startDate: "2026-10-05",
    endDate: "2026-10-15",
    coverImage: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    targetBudget: 4500,
    stops: [
      {
        id: "stop-paris",
        cityName: "Paris",
        country: "France",
        coverImage: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        dates: "Oct 05 - Oct 09 (4 Days)",
        daysCount: 4,
        expenseTier: "$$$",
        popularityScore: 99,
        activities: [
          {
            id: "ae-1",
            name: "Shangri-La Palace Stay",
            category: "Hotel",
            location: "10 Avenue d'Iéna",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            time: "03:00 PM",
            notes: "Eiffel tower terrace view",
            cost: 1150,
            durationMin: 120,
            lat: 48.863,
            lng: 2.293
          }
        ]
      },
      {
        id: "stop-interlaken",
        cityName: "Interlaken & Lauterbrunnen",
        country: "Switzerland",
        coverImage: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        dates: "Oct 10 - Oct 15 (5 Days)",
        daysCount: 5,
        expenseTier: "$$$",
        popularityScore: 96,
        activities: [
          {
            id: "ae-2",
            name: "Jungfraujoch - Top of Europe Glacier Tour",
            category: "Attraction",
            location: "Lauterbrunnen Rail Station",
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            time: "08:30 AM",
            notes: "High altitude panoramic train ticket",
            cost: 185,
            durationMin: 300,
            lat: 46.547,
            lng: 7.982
          }
        ]
      }
    ]
  }
];

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>(INITIAL_TRIPS);
  const [selectedTripId, setSelectedTripId] = useState<string>(INITIAL_TRIPS[0].id);
  const [viewTab, setViewTab] = useState<"gallery" | "builder" | "preview" | "timeline" | "budget">("builder");

  // --- MODAL STATES ---
  const [isCreateTripOpen, setIsCreateTripOpen] = useState(false);
  const [isAddCityOpen, setIsAddCityOpen] = useState(false);
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [activeStopIdForActivity, setActiveStopIdForActivity] = useState<string>("");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // --- CREATE TRIP FORM STATE ---
  const [newTripName, setNewTripName] = useState("");
  const [newTripDesc, setNewTripDesc] = useState("");
  const [newTripStart, setNewTripStart] = useState("2026-10-01");
  const [newTripEnd, setNewTripEnd] = useState("2026-10-10");
  const [newTripCover, setNewTripCover] = useState("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");
  const [newTripBudget, setNewTripBudget] = useState(2500);

  // --- CITY & ACTIVITY SEARCH QUERIES ---
  const [citySearchQuery, setCitySearchQuery] = useState("");
  const [activitySearchQuery, setActivitySearchQuery] = useState("");
  const [activityCategoryFilter, setActivityCategoryFilter] = useState("ALL");

  // Selected Active Trip
  const activeTrip = trips.find((t) => t.id === selectedTripId) || trips[0];

  // Calculate Costs
  const allActivities = activeTrip?.stops?.flatMap((s) => s.activities) || [];
  const totalTripCost = allActivities.reduce((acc, act) => acc + act.cost, 0);

  const costByCategory = {
    Hotel: allActivities.filter((a) => a.category === "Hotel").reduce((sum, a) => sum + a.cost, 0),
    Attraction: allActivities.filter((a) => a.category === "Attraction").reduce((sum, a) => sum + a.cost, 0),
    Restaurant: allActivities.filter((a) => a.category === "Restaurant").reduce((sum, a) => sum + a.cost, 0),
    Activity: allActivities.filter((a) => a.category === "Activity").reduce((sum, a) => sum + a.cost, 0),
    Transport: allActivities.filter((a) => a.category === "Transport").reduce((sum, a) => sum + a.cost, 0),
  };

  const isOverBudget = totalTripCost > activeTrip.targetBudget;

  // --- ACTIONS ---
  const handleCreateTripSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTripName) return;

    const newTrip: Trip = {
      id: `trip-${Date.now()}`,
      name: newTripName,
      description: newTripDesc || "Custom tailored adventure with Atlas smart planner.",
      startDate: newTripStart,
      endDate: newTripEnd,
      coverImage: newTripCover,
      targetBudget: Number(newTripBudget) || 2000,
      stops: [
        {
          id: `stop-${Date.now()}`,
          cityName: "First Destination",
          country: "Explore",
          coverImage: newTripCover,
          dates: `${newTripStart} - ${newTripEnd}`,
          daysCount: 4,
          expenseTier: "$$",
          popularityScore: 95,
          activities: []
        }
      ]
    };

    setTrips([newTrip, ...trips]);
    setSelectedTripId(newTrip.id);
    setIsCreateTripOpen(false);
    setViewTab("builder");
    // Reset
    setNewTripName("");
    setNewTripDesc("");
  };

  const handleDeleteTrip = (tripId: string) => {
    if (trips.length <= 1) {
      alert("You must keep at least one active trip.");
      return;
    }
    const filtered = trips.filter((t) => t.id !== tripId);
    setTrips(filtered);
    setSelectedTripId(filtered[0].id);
  };

  const handleDuplicateTrip = (trip: Trip) => {
    const duplicated: Trip = {
      ...trip,
      id: `trip-copy-${Date.now()}`,
      name: `${trip.name} (Copy)`,
    };
    setTrips([duplicated, ...trips]);
    setSelectedTripId(duplicated.id);
  };

  const handleAddCityStop = (city: typeof GLOBAL_CITIES_SEARCH[0]) => {
    const newStop: CityStop = {
      id: `stop-${Date.now()}`,
      cityName: city.name,
      country: city.country,
      coverImage: city.image,
      dates: "Custom Scheduled Dates",
      daysCount: 3,
      expenseTier: city.expenseTier,
      popularityScore: city.popularityScore,
      activities: []
    };

    const updatedStops = [...activeTrip.stops, newStop];
    const updatedTrips = trips.map((t) =>
      t.id === activeTrip.id ? { ...t, stops: updatedStops } : t
    );
    setTrips(updatedTrips);
    setIsAddCityOpen(false);
  };

  const handleRemoveCityStop = (stopId: string) => {
    const updatedStops = activeTrip.stops.filter((s) => s.id !== stopId);
    const updatedTrips = trips.map((t) =>
      t.id === activeTrip.id ? { ...t, stops: updatedStops } : t
    );
    setTrips(updatedTrips);
  };

  const handleMoveCityStop = (index: number, direction: "up" | "down") => {
    const stops = [...activeTrip.stops];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= stops.length) return;

    const temp = stops[index];
    stops[index] = stops[targetIndex];
    stops[targetIndex] = temp;

    const updatedTrips = trips.map((t) =>
      t.id === activeTrip.id ? { ...t, stops } : t
    );
    setTrips(updatedTrips);
  };

  const handleAddActivityToStop = (activity: typeof GLOBAL_ACTIVITIES_SEARCH[0]) => {
    if (!activeStopIdForActivity) return;

    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      name: activity.name,
      category: activity.category,
      location: activity.location,
      image: activity.image,
      time: "10:00 AM",
      notes: "Custom booked activity on Atlas",
      cost: activity.cost,
      durationMin: activity.durationMin,
      lat: 0,
      lng: 0
    };

    const updatedStops = activeTrip.stops.map((stop) => {
      if (stop.id === activeStopIdForActivity) {
        return { ...stop, activities: [...stop.activities, newAct] };
      }
      return stop;
    });

    const updatedTrips = trips.map((t) =>
      t.id === activeTrip.id ? { ...t, stops: updatedStops } : t
    );
    setTrips(updatedTrips);
    setIsAddActivityOpen(false);
  };

  const handleRemoveActivity = (stopId: string, activityId: string) => {
    const updatedStops = activeTrip.stops.map((stop) => {
      if (stop.id === stopId) {
        return {
          ...stop,
          activities: stop.activities.filter((a) => a.id !== activityId)
        };
      }
      return stop;
    });

    const updatedTrips = trips.map((t) =>
      t.id === activeTrip.id ? { ...t, stops: updatedStops } : t
    );
    setTrips(updatedTrips);
  };

  const handleCopyShareLink = () => {
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}/trips/share/${activeTrip.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Filtered Cities & Activities
  const filteredCities = GLOBAL_CITIES_SEARCH.filter(
    (c) =>
      c.name.toLowerCase().includes(citySearchQuery.toLowerCase()) ||
      c.country.toLowerCase().includes(citySearchQuery.toLowerCase())
  );

  const filteredActivities = GLOBAL_ACTIVITIES_SEARCH.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(activitySearchQuery.toLowerCase()) ||
      a.location.toLowerCase().includes(activitySearchQuery.toLowerCase());
    const matchesCat =
      activityCategoryFilter === "ALL" || a.category.toUpperCase() === activityCategoryFilter.toUpperCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#fbf9f5] pb-24 text-gray-900">
      {/* Top Header Banner */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Trip Selector & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00af87] text-white flex items-center justify-center shadow-md shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <select
                  value={selectedTripId}
                  onChange={(e) => setSelectedTripId(e.target.value)}
                  className="font-black text-base sm:text-lg text-gray-900 bg-transparent hover:bg-gray-100/80 rounded-lg px-1.5 py-0.5 border border-transparent hover:border-gray-200 cursor-pointer focus:outline-none transition max-w-[220px] sm:max-w-md truncate"
                >
                  {trips.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <span className="text-[11px] font-bold text-[#00af87] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                  {activeTrip.stops.length} {activeTrip.stops.length === 1 ? "Stop" : "Stops"}
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">
                {activeTrip.startDate} &bull; Est. Cost: ${totalTripCost} / ${activeTrip.targetBudget}
              </p>
            </div>
          </div>

          {/* Quick Actions & Navigation Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              size="sm"
              onClick={() => setIsCreateTripOpen(true)}
              className="bg-black hover:bg-gray-800 text-white text-xs font-bold rounded-2xl h-9 px-3.5 flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Trip</span>
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsShareModalOpen(true)}
              className="border-gray-300 text-gray-700 text-xs font-bold rounded-2xl h-9 px-3.5 flex items-center gap-1.5 hover:bg-gray-50"
            >
              <Share2 className="w-3.5 h-3.5 text-[#00af87]" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        {/* View Switcher Sub-Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2 border-t border-gray-100">
          <button
            onClick={() => setViewTab("gallery")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
              viewTab === "gallery"
                ? "bg-[#00af87] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>My Trips ({trips.length})</span>
          </button>

          <button
            onClick={() => setViewTab("builder")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
              viewTab === "builder"
                ? "bg-[#00af87] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Itinerary Builder</span>
          </button>

          <button
            onClick={() => setViewTab("preview")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
              viewTab === "preview"
                ? "bg-[#00af87] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Mode</span>
          </button>

          <button
            onClick={() => setViewTab("timeline")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
              viewTab === "timeline"
                ? "bg-[#00af87] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Calendar & Timeline</span>
          </button>

          <button
            onClick={() => setViewTab("budget")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
              viewTab === "budget"
                ? "bg-[#00af87] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <PieChartIcon className="w-3.5 h-3.5" />
            <span>Budget & Charts</span>
            {isOverBudget && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* ========================================================================= */}
        {/* TAB 1: MY TRIPS GALLERY (Feature #4) */}
        {/* ========================================================================= */}
        {viewTab === "gallery" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">My Travel Itineraries</h2>
                <p className="text-xs text-gray-500 mt-1">
                  Manage all your ongoing, planned, and archived multi-city adventures.
                </p>
              </div>
              <Button
                onClick={() => setIsCreateTripOpen(true)}
                className="bg-[#00af87] hover:bg-[#009b77] text-white font-bold text-xs rounded-2xl h-10 px-5 shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Trip</span>
              </Button>
            </div>

            {/* Trip Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => {
                const totalActs = trip.stops.flatMap((s) => s.activities).length;
                const cost = trip.stops.flatMap((s) => s.activities).reduce((acc, a) => acc + a.cost, 0);

                return (
                  <div
                    key={trip.id}
                    className={`bg-white rounded-3xl border overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col group ${
                      trip.id === selectedTripId ? "ring-2 ring-[#00af87] border-transparent" : "border-gray-200"
                    }`}
                  >
                    {/* Cover Photo */}
                    <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                      <Image
                        src={trip.coverImage}
                        alt={trip.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-gray-900 shadow-sm flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-[#00af87]" />
                        <span>{trip.startDate}</span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                          {trip.stops.length} Cities &bull; {totalActs} Activities
                        </span>
                        <h3 className="text-base font-black text-white leading-tight truncate mt-0.5">
                          {trip.name}
                        </h3>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <p className="text-xs text-gray-500 line-clamp-2 font-medium">
                        {trip.description}
                      </p>

                      {/* Stops Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {trip.stops.map((stop) => (
                          <span
                            key={stop.id}
                            className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1"
                          >
                            <MapPin className="w-2.5 h-2.5 text-[#00af87]" />
                            {stop.cityName}
                          </span>
                        ))}
                      </div>

                      {/* Budget Meter */}
                      <div className="pt-2 border-t border-gray-100">
                        <div className="flex items-center justify-between text-[11px] font-bold text-gray-600 mb-1">
                          <span>Est. Spend</span>
                          <span className={cost > trip.targetBudget ? "text-rose-600" : "text-gray-900"}>
                            ${cost} / ${trip.targetBudget}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              cost > trip.targetBudget ? "bg-rose-500" : "bg-[#00af87]"
                            }`}
                            style={{ width: `${Math.min((cost / trip.targetBudget) * 100, 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="pt-2 flex items-center justify-between gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedTripId(trip.id);
                            setViewTab("builder");
                          }}
                          className="flex-1 bg-[#00af87] hover:bg-[#009b77] text-white text-xs font-bold rounded-xl h-9"
                        >
                          Open Builder
                        </Button>

                        <button
                          title="Duplicate Trip"
                          onClick={() => handleDuplicateTrip(trip)}
                          className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition"
                        >
                          <Copy className="w-4 h-4" />
                        </button>

                        <button
                          title="Delete Trip"
                          onClick={() => handleDeleteTrip(trip.id)}
                          className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ITINERARY BUILDER (Features #5, #7, #8) */}
        {/* ========================================================================= */}
        {viewTab === "builder" && (
          <div className="space-y-6">
            {/* Trip Hero Header */}
            <div className="relative rounded-3xl overflow-hidden bg-gray-900 text-white min-h-[160px] p-6 sm:p-8 flex flex-col justify-between shadow-md">
              <Image
                src={activeTrip.coverImage}
                alt={activeTrip.name}
                fill
                className="object-cover opacity-35"
              />
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Atlas Itinerary Planner &bull; {activeTrip.startDate} to {activeTrip.endDate}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    {activeTrip.name}
                  </h1>
                  <p className="text-xs text-gray-300 mt-1 max-w-2xl font-medium">
                    {activeTrip.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    onClick={() => {
                      setIsAddCityOpen(true);
                      setCitySearchQuery("");
                    }}
                    className="bg-[#00af87] hover:bg-[#009b77] text-white text-xs font-bold rounded-2xl h-10 px-4 shadow-lg flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add City Stop</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* City Stops List */}
            <div className="space-y-6">
              {activeTrip.stops.map((stop, index) => (
                <div
                  key={stop.id}
                  className="bg-white rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden"
                >
                  {/* Stop Header Banner */}
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-gray-50 via-white to-emerald-50/40 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-black text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-black text-base text-gray-900">
                            {stop.cityName}, {stop.country}
                          </h3>
                          <span className="text-[10px] font-bold text-[#00af87] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            {stop.expenseTier} &bull; {stop.popularityScore}% Popularity
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 font-medium">
                          {stop.dates} &bull; {stop.activities.length} planned activities
                        </p>
                      </div>
                    </div>

                    {/* Reordering & Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        title="Move Stop Up"
                        disabled={index === 0}
                        onClick={() => handleMoveCityStop(index, "up")}
                        className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30 rounded-lg hover:bg-gray-100"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        title="Move Stop Down"
                        disabled={index === activeTrip.stops.length - 1}
                        onClick={() => handleMoveCityStop(index, "down")}
                        className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30 rounded-lg hover:bg-gray-100"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setActiveStopIdForActivity(stop.id);
                          setIsAddActivityOpen(true);
                          setActivitySearchQuery("");
                        }}
                        className="h-8 text-xs font-bold rounded-xl border-gray-300 hover:border-[#00af87] hover:text-[#00af87] flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Activity</span>
                      </Button>

                      <button
                        title="Remove Stop"
                        onClick={() => handleRemoveCityStop(stop.id)}
                        className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Stop Activities List */}
                  <div className="p-4 sm:p-5 space-y-3">
                    {stop.activities.length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                        <Compass className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-xs font-bold text-gray-600">No activities added for {stop.cityName} yet</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Add hotels, sightseeing tours, and culinary spots</p>
                        <Button
                          size="sm"
                          onClick={() => {
                            setActiveStopIdForActivity(stop.id);
                            setIsAddActivityOpen(true);
                          }}
                          className="mt-3 bg-[#00af87] text-white text-xs font-bold rounded-xl h-8"
                        >
                          + Browse Activities & Stays
                        </Button>
                      </div>
                    ) : (
                      stop.activities.map((act) => (
                        <div
                          key={act.id}
                          className="p-3.5 sm:p-4 rounded-2xl bg-gray-50/70 hover:bg-emerald-50/30 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition group"
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-200">
                              <Image
                                src={act.image}
                                alt={act.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full text-white ${
                                  act.category === "Hotel" ? "bg-indigo-600" :
                                  act.category === "Restaurant" ? "bg-amber-600" :
                                  act.category === "Transport" ? "bg-sky-600" : "bg-[#00af87]"
                                }`}>
                                  {act.category}
                                </span>
                                <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {act.time} ({act.durationMin}m)
                                </span>
                              </div>
                              <h4 className="font-bold text-xs sm:text-sm text-gray-900 mt-0.5 group-hover:text-[#00af87] transition">
                                {act.name}
                              </h4>
                              <p className="text-[11px] text-gray-500 truncate max-w-sm">
                                {act.location} &bull; <span className="italic">{act.notes}</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-200">
                            <span className="font-black text-xs sm:text-sm text-gray-900">
                              ${act.cost}
                            </span>
                            <button
                              onClick={() => handleRemoveActivity(stop.id, act.id)}
                              className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PREVIEW MODE (Feature #6) */}
        {/* ========================================================================= */}
        {viewTab === "preview" && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-8">
            <div className="border-b border-gray-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#00af87] uppercase tracking-wider">
                  Finished Itinerary Preview &bull; {activeTrip.startDate} to {activeTrip.endDate}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">{activeTrip.name}</h2>
                <p className="text-xs text-gray-500 mt-1 font-medium">{activeTrip.description}</p>
              </div>
              <Button
                onClick={() => window.print()}
                variant="outline"
                className="rounded-2xl border-gray-300 text-xs font-bold h-10 px-4"
              >
                Print / Save as PDF
              </Button>
            </div>

            {/* Stops Grouped */}
            <div className="space-y-8">
              {activeTrip.stops.map((stop, sIdx) => (
                <div key={stop.id} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#00af87] text-white font-black text-xs flex items-center justify-center">
                      {sIdx + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-gray-900">{stop.cityName}, {stop.country}</h3>
                      <p className="text-xs text-gray-500 font-medium">{stop.dates}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
                    {stop.activities.map((act) => (
                      <div key={act.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 flex gap-3">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                          <Image src={act.image} alt={act.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-[#00af87] uppercase">{act.category}</span>
                            <span className="text-xs font-black text-gray-900">${act.cost}</span>
                          </div>
                          <h4 className="font-bold text-xs text-gray-900 truncate mt-0.5">{act.name}</h4>
                          <p className="text-[10px] text-gray-500 truncate">{act.location}</p>
                          <p className="text-[10px] text-gray-400 mt-1 italic truncate">"{act.notes}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: CALENDAR & TIMELINE (Feature #10) */}
        {/* ========================================================================= */}
        {viewTab === "timeline" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Vertical Timeline */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-gray-900">Trip Day-by-Day Timeline</h2>
                  <p className="text-xs text-gray-500">Chronological flow of scheduled activities</p>
                </div>
              </div>

              <div className="relative pl-6 border-l-2 border-dashed border-[#00af87] space-y-8 my-4">
                {allActivities.map((act, i) => (
                  <div key={act.id} className="relative group">
                    {/* Circle Node */}
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#00af87] group-hover:scale-125 transition-transform" />

                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-gray-200">
                          <Image src={act.image} alt={act.name} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-[#00af87]">{act.time}</span>
                            <span className="text-[10px] font-bold text-gray-400">&bull; {act.durationMin} mins</span>
                          </div>
                          <h4 className="font-bold text-xs sm:text-sm text-gray-900">{act.name}</h4>
                          <p className="text-[11px] text-gray-500">{act.location}</p>
                        </div>
                      </div>
                      <div className="text-right font-black text-xs text-gray-900 shrink-0">
                        ${act.cost}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Quick Calendar Overview */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs space-y-4">
              <h3 className="font-black text-sm text-gray-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#00af87]" />
                <span>Trip Calendar Grid</span>
              </h3>

              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 py-2 border-b border-gray-100">
                <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {Array.from({ length: 31 }).map((_, i) => {
                  const dayNum = i + 1;
                  const isScheduled = dayNum >= 10 && dayNum <= 18;
                  return (
                    <div
                      key={i}
                      className={`h-9 flex items-center justify-center rounded-xl font-bold ${
                        isScheduled
                          ? "bg-[#00af87] text-white shadow-xs"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {dayNum}
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-xs text-emerald-900">
                  <strong>✨ Pro Tip:</strong> Your schedule has an average of 2-3 activities per day for optimal pacing.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: TRIP BUDGET & COST BREAKDOWN (Feature #9) */}
        {/* ========================================================================= */}
        {viewTab === "budget" && (
          <div className="space-y-6">
            {/* Top Budget Alert Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-2xs">
                <span className="text-xs font-bold text-gray-400 uppercase">Target Budget</span>
                <h3 className="text-2xl font-black text-gray-900 mt-1">${activeTrip.targetBudget}</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">Pre-set trip allowance</p>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-2xs">
                <span className="text-xs font-bold text-gray-400 uppercase">Total Estimated Spend</span>
                <h3 className={`text-2xl font-black mt-1 ${isOverBudget ? "text-rose-600" : "text-[#00af87]"}`}>
                  ${totalTripCost}
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {isOverBudget ? "⚠️ Over budget by $" + (totalTripCost - activeTrip.targetBudget) : "Under budget by $" + (activeTrip.targetBudget - totalTripCost)}
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-2xs">
                <span className="text-xs font-bold text-gray-400 uppercase">Daily Average</span>
                <h3 className="text-2xl font-black text-gray-900 mt-1">
                  ${Math.round(totalTripCost / Math.max(activeTrip.stops.reduce((s, c) => s + c.daysCount, 0), 1))}
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5">Per day across all stops</p>
              </div>
            </div>

            {/* Category Breakdown & Progress Bars */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-2xs space-y-5">
                <h3 className="text-base font-black text-gray-900">Spending by Category</h3>

                <div className="space-y-4">
                  {Object.entries(costByCategory).map(([cat, amt]) => {
                    const pct = totalTripCost > 0 ? Math.round((amt / totalTripCost) * 100) : 0;
                    return (
                      <div key={cat} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                          <span className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${
                              cat === "Hotel" ? "bg-indigo-600" :
                              cat === "Restaurant" ? "bg-amber-600" :
                              cat === "Transport" ? "bg-sky-600" :
                              cat === "Attraction" ? "bg-purple-600" : "bg-[#00af87]"
                            }`} />
                            {cat}
                          </span>
                          <span>${amt} ({pct}%)</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              cat === "Hotel" ? "bg-indigo-600" :
                              cat === "Restaurant" ? "bg-amber-600" :
                              cat === "Transport" ? "bg-sky-600" :
                              cat === "Attraction" ? "bg-purple-600" : "bg-[#00af87]"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Over Budget Alerts & Advice */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-2xs flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-black text-gray-900 mb-2">Smart Budget Insights</h3>
                  {isOverBudget ? (
                    <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs space-y-1.5">
                      <div className="flex items-center gap-2 font-black">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        <span>Daily Over-Budget Alert</span>
                      </div>
                      <p>
                        Your trip total (${totalTripCost}) exceeds your allowance (${activeTrip.targetBudget}). Consider swapping high-end luxury stays or finding bundled tour packages.
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs space-y-1.5">
                      <div className="flex items-center gap-2 font-black">
                        <CheckCircle2 className="w-4 h-4 text-[#00af87]" />
                        <span>Optimal Budget Health</span>
                      </div>
                      <p>
                        You are ${activeTrip.targetBudget - totalTripCost} below your ceiling. You have room for an extra fine dining experience or private transfer!
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-2">
                  <span className="font-bold text-gray-700">Cost Breakdown Tips:</span>
                  <ul className="text-gray-500 space-y-1 list-disc list-inside text-[11px]">
                    <li>Lodging accounts for the majority of the cost ({Math.round((costByCategory.Hotel / (totalTripCost || 1)) * 100)}%).</li>
                    <li>Booking tours 2 weeks in advance saves an average of 15%.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: CREATE TRIP (Feature #3) */}
      {/* ========================================================================= */}
      {isCreateTripOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsCreateTripOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-black text-gray-900">Create New Trip Shell</h3>
            <p className="text-xs text-gray-500 mt-1 mb-5">
              Set the foundation for your next custom travel itinerary.
            </p>

            <form onSubmit={handleCreateTripSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Trip Name</label>
                <input
                  type="text"
                  value={newTripName}
                  onChange={(e) => setNewTripName(e.target.value)}
                  placeholder="e.g. 10 Days in Tokyo & Kyoto"
                  required
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00af87]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newTripStart}
                    onChange={(e) => setNewTripStart(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00af87]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={newTripEnd}
                    onChange={(e) => setNewTripEnd(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00af87]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Target Budget ($)</label>
                <input
                  type="number"
                  value={newTripBudget}
                  onChange={(e) => setNewTripBudget(Number(e.target.value))}
                  placeholder="2500"
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00af87]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                  value={newTripDesc}
                  onChange={(e) => setNewTripDesc(e.target.value)}
                  placeholder="What is the goal of this journey?"
                  rows={2}
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00af87]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Select Cover Image</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  ].map((url, i) => (
                    <div
                      key={i}
                      onClick={() => setNewTripCover(url)}
                      className={`relative h-16 rounded-xl overflow-hidden cursor-pointer border-2 transition ${
                        newTripCover === url ? "border-[#00af87] ring-2 ring-[#00af87]" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={url} alt="Cover" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-[#00af87] hover:bg-[#009b77] text-white font-bold text-xs rounded-2xl shadow-lg mt-2"
              >
                Create Trip & Open Itinerary
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CITY SEARCH (Feature #7) */}
      {/* ========================================================================= */}
      {isAddCityOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 relative max-h-[85vh] flex flex-col">
            <button
              onClick={() => setIsAddCityOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-black text-gray-900">Add City Stop</h3>
            <p className="text-xs text-gray-500 mt-0.5 mb-4">
              Explore cities with expense ratings and traveler popularity
            </p>

            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={citySearchQuery}
                onChange={(e) => setCitySearchQuery(e.target.value)}
                placeholder="Search city or country (e.g. Bali, Paris, Goa, Tokyo)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00af87]"
              />
            </div>

            {/* City Search Results */}
            <div className="overflow-y-auto space-y-3 flex-1 pr-1">
              {filteredCities.map((city) => (
                <div
                  key={city.id}
                  className="p-3.5 rounded-2xl bg-gray-50 hover:bg-emerald-50/50 border border-gray-200/90 flex items-center justify-between gap-3 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                      <Image src={city.image} alt={city.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-xs sm:text-sm text-gray-900">{city.name}</h4>
                        <span className="text-[10px] text-gray-500 font-medium">({city.country})</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                        <span className="font-black text-[#00af87]">Cost: {city.expenseTier}</span>
                        <span>&bull;</span>
                        <span>★ {city.popularityScore}% Popularity</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => handleAddCityStop(city)}
                    className="bg-[#00af87] hover:bg-[#009b77] text-white text-xs font-bold rounded-xl h-8 px-3 shrink-0"
                  >
                    + Add Stop
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ACTIVITY SEARCH (Feature #8) */}
      {/* ========================================================================= */}
      {isAddActivityOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-gray-200 relative max-h-[85vh] flex flex-col">
            <button
              onClick={() => setIsAddActivityOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-black text-gray-900">Add Activity & Stays</h3>
            <p className="text-xs text-gray-500 mt-0.5 mb-4">
              Filter by category, duration, and estimated cost
            </p>

            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={activitySearchQuery}
                  onChange={(e) => setActivitySearchQuery(e.target.value)}
                  placeholder="Search activities, dining, tickets..."
                  className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00af87]"
                />
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {["ALL", "HOTEL", "RESTAURANT", "ATTRACTION", "ACTIVITY", "TRANSPORT"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActivityCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-xl text-[10px] font-bold transition shrink-0 ${
                      activityCategoryFilter === cat
                        ? "bg-[#00af87] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="overflow-y-auto space-y-3 flex-1 pr-1">
              {filteredActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-3.5 rounded-2xl bg-gray-50 hover:bg-emerald-50/50 border border-gray-200/90 flex items-center justify-between gap-3 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                      <Image src={act.image} alt={act.name} fill className="object-cover" />
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase text-[#00af87]">{act.category}</span>
                      <h4 className="font-bold text-xs sm:text-sm text-gray-900">{act.name}</h4>
                      <p className="text-[10px] text-gray-500">
                        {act.location} &bull; {act.durationMin}m duration &bull; <strong>${act.cost}</strong>
                      </p>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => handleAddActivityToStop(act)}
                    className="bg-[#00af87] hover:bg-[#009b77] text-white text-xs font-bold rounded-xl h-8 px-3 shrink-0"
                  >
                    + Add
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: SHARE PUBLIC LINK (Feature #11) */}
      {/* ========================================================================= */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#00af87] flex items-center justify-center mb-4">
              <Share2 className="w-5 h-5" />
            </div>

            <h3 className="text-xl font-black text-gray-900">Share Public Itinerary</h3>
            <p className="text-xs text-gray-500 mt-1 mb-5">
              Anyone with this link can view this trip and 1-click clone it into their own account!
            </p>

            <div className="space-y-4">
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between gap-2">
                <span className="text-xs text-gray-600 font-mono truncate">
                  {typeof window !== "undefined" ? window.location.origin : ""}/trips/share/{activeTrip.id}
                </span>
                <Button
                  size="sm"
                  onClick={handleCopyShareLink}
                  className="bg-[#00af87] hover:bg-[#009b77] text-white text-xs font-bold rounded-xl h-8 px-3 shrink-0 flex items-center gap-1"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "Copied!" : "Copy"}</span>
                </Button>
              </div>

              <NextLink
                href={`/trips/share/${activeTrip.id}`}
                target="_blank"
                className="w-full py-2.5 px-4 bg-gray-900 hover:bg-black text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <span>Open Public View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </NextLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
