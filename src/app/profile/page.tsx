"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  ThumbsUp,
  Award,
  Globe2,
  Heart,
  MessageSquare,
  Share2,
  CheckCircle2,
  Sparkles,
  Camera,
  Star,
  Users,
  Compass,
  Bookmark,
  ChevronRight,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PROFILE_DATA = {
  name: "Elena Rostova",
  handle: "@elena_travels",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  location: "London, United Kingdom",
  joined: "March 2021",
  bio: "Luxury resort enthusiast, avid scuba diver & Michelin culinary explorer. Over 18 countries documented with unbiased reviews and traveler tips.",
  stats: {
    followers: 2480,
    following: 192,
    reviewsCount: 48,
    helpfulVotes: 120400,
    countriesVisited: 18,
    citiesExplored: 64,
    photosUploaded: 420,
  },
  badges: [
    { id: "b1", title: "Top Contributor Level 6", icon: "🏆", desc: "Top 1% of global review contributors", color: "bg-amber-100 text-amber-900 border-amber-300" },
    { id: "b2", title: "Passport Master", icon: "🗺️", desc: "18 countries & 64 cities documented", color: "bg-emerald-100 text-emerald-900 border-emerald-300" },
    { id: "b3", title: "Photo Pro", icon: "📸", desc: "400+ high-res traveler photos", color: "bg-sky-100 text-sky-900 border-sky-300" },
    { id: "b4", title: "Culinary Scout", icon: "🍽️", desc: "Reviewed 30+ Michelin and local eateries", color: "bg-rose-100 text-rose-900 border-rose-300" },
    { id: "b5", title: "Helpful Hero", icon: "❤️", desc: "120,000+ helpful votes from community", color: "bg-purple-100 text-purple-900 border-purple-300" },
  ],
  visitedPlaces: [
    { country: "Indonesia", city: "Bali & Nusa Penida", flag: "🇮🇩", year: "2026" },
    { country: "Japan", city: "Tokyo & Kyoto", flag: "🇯🇵", year: "2025" },
    { country: "France", city: "Paris & Nice", flag: "🇫🇷", year: "2025" },
    { country: "Italy", city: "Rome & Florence", flag: "🇮🇹", year: "2024" },
    { country: "United States", city: "New York & Hawaii", flag: "🇺🇸", year: "2024" },
    { country: "Spain", city: "Barcelona & Madrid", flag: "🇪🇸", year: "2023" },
    { country: "Greece", city: "Santorini & Athens", flag: "🇬🇷", year: "2023" },
    { country: "Maldives", city: "North Malé Atoll", flag: "🇲🇻", year: "2023" },
  ],
  reviews: [
    {
      id: "pr-1",
      place: "The St. Regis Bali Resort",
      category: "Hotel",
      location: "Nusa Dua, Bali, Indonesia",
      rating: 5,
      date: "August 2026",
      title: "Pure paradise with unmatched hospitality and lagoon villas",
      body: "The lagoon villas are breathtaking. From the personal butler service to the sunrise breakfast at Boneka by the ocean, every detail was immaculate. The saltwater lagoon pool is a masterpiece.",
      helpfulVotes: 48,
      photos: [
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ],
    },
    {
      id: "pr-2",
      place: "Le Gabriel - La Réserve Paris (3 Michelin Stars)",
      category: "Restaurant",
      location: "Paris, France",
      rating: 5,
      date: "June 2026",
      title: "Sublime gastronomic journey near the Champs-Élysées",
      body: "Chef Jérôme Banctel crafts pure art. The pigeon and artichoke dish accompanied by vintage Burgundy wine was the highlight of our Europe trip. Service is whisper-quiet yet attentive.",
      helpfulVotes: 64,
      photos: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ],
    },
    {
      id: "pr-3",
      place: "Fushimi Inari Taisha Sunrise Trek",
      category: "Attraction",
      location: "Kyoto, Japan",
      rating: 5,
      date: "March 2026",
      title: "Hike early at 6:30 AM before tourist crowds arrive!",
      body: "Walking through thousands of vermilion torii gates with morning mountain mist is hypnotic. Take the full 2-hour summit trail for panoramic views of Kyoto valley.",
      helpfulVotes: 92,
      photos: [
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ],
    },
  ],
  collections: [
    {
      id: "col-1",
      title: "Bali Luxury Stays & Villas 2026",
      itemCount: 8,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "col-2",
      title: "Parisian Michelin Star Hotspots",
      itemCount: 12,
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "col-3",
      title: "Kyoto Heritage Shrines & Gardens",
      itemCount: 6,
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
  ],
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"reviews" | "map" | "badges" | "collections">("reviews");
  const [isFollowing, setIsFollowing] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<string>("ALL");
  const [helpfulLikes, setHelpfulLikes] = useState<Record<string, number>>({});

  const toggleHelpful = (id: string, initialVotes: number) => {
    setHelpfulLikes((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialVotes) + 1,
    }));
  };

  const filteredReviews = PROFILE_DATA.reviews.filter((r) =>
    reviewFilter === "ALL" ? true : r.category.toUpperCase() === reviewFilter
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-16">
      {/* Cover Banner */}
      <div className="relative h-48 sm:h-64 lg:h-72 w-full bg-gray-900">
        <Image
          src={PROFILE_DATA.cover}
          alt="Profile Cover"
          fill
          priority
          className="object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
      </div>

      {/* Main Profile Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl -mt-16 sm:-mt-20 relative z-10">
        {/* User Card Header */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            {/* Avatar & Basic Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-3xl border-4 border-white shadow-xl overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={PROFILE_DATA.avatar}
                  alt={PROFILE_DATA.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-gray-950">
                    {PROFILE_DATA.name}
                  </h1>
                  <span className="p-1 rounded-full bg-[#00af87] text-white" title="Verified Top Contributor">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                </div>
                <div className="text-xs text-gray-500 font-semibold mt-0.5 flex flex-wrap items-center gap-2">
                  <span>{PROFILE_DATA.handle}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-[#00af87]" />
                    {PROFILE_DATA.location}
                  </span>
                  <span>•</span>
                  <span>Joined {PROFILE_DATA.joined}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 self-stretch sm:self-auto">
              <Button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`flex-1 sm:flex-initial rounded-full font-extrabold text-xs px-6 h-10 transition-all ${
                  isFollowing
                    ? "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300"
                    : "bg-[#00af87] hover:bg-[#009673] text-white shadow-sm"
                }`}
              >
                {isFollowing ? "Following" : "+ Follow"}
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: PROFILE_DATA.name, url: window.location.href });
                  } else {
                    alert("Profile link copied!");
                  }
                }}
                className="rounded-full border-gray-300 h-10 w-10"
              >
                <Share2 className="h-4 w-4 text-gray-700" />
              </Button>
            </div>
          </div>

          {/* User Bio */}
          <p className="text-sm text-gray-700 leading-relaxed font-medium">
            {PROFILE_DATA.bio}
          </p>

          {/* Key Traveler Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-gray-100 text-center">
            <div className="p-3 bg-gray-50 rounded-2xl">
              <span className="text-lg sm:text-xl font-black text-gray-900 block">
                {PROFILE_DATA.stats.countriesVisited}
              </span>
              <span className="text-[11px] font-bold text-gray-500 uppercase">Countries</span>
            </div>

            <div className="p-3 bg-gray-50 rounded-2xl">
              <span className="text-lg sm:text-xl font-black text-gray-900 block">
                {PROFILE_DATA.stats.citiesExplored}
              </span>
              <span className="text-[11px] font-bold text-gray-500 uppercase">Cities</span>
            </div>

            <div className="p-3 bg-gray-50 rounded-2xl">
              <span className="text-lg sm:text-xl font-black text-gray-900 block">
                {PROFILE_DATA.stats.reviewsCount}
              </span>
              <span className="text-[11px] font-bold text-gray-500 uppercase">Reviews</span>
            </div>

            <div className="p-3 bg-gray-50 rounded-2xl">
              <span className="text-lg sm:text-xl font-black text-[#00af87] block">
                {(PROFILE_DATA.stats.helpfulVotes / 1000).toFixed(0)}k
              </span>
              <span className="text-[11px] font-bold text-gray-500 uppercase">Helpful Votes</span>
            </div>

            <div className="p-3 bg-gray-50 rounded-2xl">
              <span className="text-lg sm:text-xl font-black text-gray-900 block">
                {PROFILE_DATA.stats.followers.toLocaleString()}
              </span>
              <span className="text-[11px] font-bold text-gray-500 uppercase">Followers</span>
            </div>

            <div className="p-3 bg-gray-50 rounded-2xl">
              <span className="text-lg sm:text-xl font-black text-gray-900 block">
                {PROFILE_DATA.stats.photosUploaded}
              </span>
              <span className="text-[11px] font-bold text-gray-500 uppercase">Photos</span>
            </div>
          </div>
        </div>

        {/* Profile Navigation Tabs */}
        <div className="mt-8 flex items-center gap-2 border-b border-gray-200 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: "reviews", label: `Reviews (${PROFILE_DATA.stats.reviewsCount})`, icon: MessageSquare },
            { id: "map", label: `Travel Map (${PROFILE_DATA.stats.countriesVisited} Countries)`, icon: Globe2 },
            { id: "badges", label: `Badges (${PROFILE_DATA.badges.length})`, icon: Award },
            { id: "collections", label: `Trips & Lists (${PROFILE_DATA.collections.length})`, icon: Bookmark },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-black text-white shadow-sm"
                    : "bg-white text-gray-600 hover:text-black border border-gray-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Review Feeds */}
        {activeTab === "reviews" && (
          <div className="mt-6 space-y-6">
            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {["ALL", "HOTEL", "RESTAURANT", "ATTRACTION"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setReviewFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    reviewFilter === cat
                      ? "bg-[#00af87] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {cat === "ALL" ? "All Reviews" : cat === "HOTEL" ? "Hotels" : cat === "RESTAURANT" ? "Dining" : "Attractions"}
                </button>
              ))}
            </div>

            {/* Reviews Cards List */}
            <div className="space-y-5">
              {filteredReviews.map((rev) => {
                const currentHelpful = helpfulLikes[rev.id] ?? rev.helpfulVotes;

                return (
                  <div
                    key={rev.id}
                    className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow space-y-4"
                  >
                    {/* Place and Rating Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#00af87] tracking-wider block">
                          {rev.category} Review
                        </span>
                        <h3 className="text-lg font-black text-gray-900 mt-0.5">
                          {rev.place}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span>{rev.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <div className="flex text-[#00af87] gap-0.5">
                          {[...Array(rev.rating)].map((_, i) => (
                            <span key={i} className="h-3 w-3 rounded-full bg-[#00af87] inline-block" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400 font-semibold">{rev.date}</span>
                      </div>
                    </div>

                    {/* Review Title & Body */}
                    <div>
                      <h4 className="text-base font-bold text-gray-900 mb-1">
                        "{rev.title}"
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        {rev.body}
                      </p>
                    </div>

                    {/* Photos Attached */}
                    {rev.photos && rev.photos.length > 0 && (
                      <div className="flex gap-3 overflow-x-auto pb-1 pt-1">
                        {rev.photos.map((photo, i) => (
                          <div
                            key={i}
                            className="relative h-32 w-48 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200"
                          >
                            <Image src={photo} alt="Review photo" fill className="object-cover" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Helpful Votes Count */}
                    <div className="pt-2 flex items-center justify-between text-xs text-gray-500">
                      <span>Written by verified traveler</span>
                      <button
                        onClick={() => toggleHelpful(rev.id, rev.helpfulVotes)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-[#00af87] hover:bg-emerald-100 font-bold transition-colors"
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                        <span>Helpful ({currentHelpful})</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Personalized Travel Map */}
        {activeTab === "map" && (
          <div className="mt-6 bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-gray-900">
                  Elena's Interactive World Travel Map
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  18 / 195 Countries Visited • 9.2% of the Globe Explored
                </p>
              </div>

              <div className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#00af87] text-xs font-bold self-start sm:self-auto">
                🗺️ Global Traveler Level 6
              </div>
            </div>

            {/* Travel Map Graphic Visualization */}
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-[#24150b] border border-amber-900/40 shadow-inner">
              <Image
                src="/vintage-map-bg.jpg"
                alt="Personalized World Map"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b0d06]/80 via-transparent" />

              {/* Pin Beacons on Visited Countries */}
              {[
                { name: "Bali 🇮🇩", top: "60%", left: "78%" },
                { name: "Tokyo 🇯🇵", top: "38%", left: "83%" },
                { name: "Paris 🇫🇷", top: "33%", left: "49%" },
                { name: "Rome 🇮🇹", top: "37%", left: "52%" },
                { name: "New York 🇺🇸", top: "37%", left: "27%" },
                { name: "Santorini 🇬🇷", top: "40%", left: "54%" },
                { name: "Maldives 🇲🇻", top: "54%", left: "68%" },
              ].map((pin) => (
                <div
                  key={pin.name}
                  style={{ top: pin.top, left: pin.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                >
                  <div className="h-4 w-4 rounded-full bg-[#00eb5b] border-2 border-white shadow-lg animate-pulse" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden group-hover:block bg-black/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg whitespace-nowrap z-20">
                    {pin.name}
                  </div>
                </div>
              ))}

              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-md flex items-center justify-between text-xs">
                <span className="font-bold text-gray-900">8 Regions Pinned & Active</span>
                <span className="text-[#00af87] font-extrabold">+ Add New Trip Pin</span>
              </div>
            </div>

            {/* Visited Country Badges List */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-gray-900">Visited Destinations:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PROFILE_DATA.visitedPlaces.map((place) => (
                  <div
                    key={place.country}
                    className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{place.flag}</span>
                      <div>
                        <span className="font-bold text-xs text-gray-900 block">{place.country}</span>
                        <span className="text-[10px] text-gray-500">{place.city}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400">{place.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Badges & Achievements */}
        {activeTab === "badges" && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROFILE_DATA.badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-5 rounded-3xl border ${badge.color} shadow-xs flex items-start gap-3.5`}
              >
                <div className="text-3xl">{badge.icon}</div>
                <div>
                  <h4 className="font-black text-sm">{badge.title}</h4>
                  <p className="text-xs opacity-80 mt-1 leading-snug">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Saved Lists & Collections */}
        {activeTab === "collections" && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PROFILE_DATA.collections.map((col) => (
              <div
                key={col.id}
                className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="relative h-44 w-full bg-gray-100">
                  <Image src={col.image} alt={col.title} fill className="object-cover" />
                  <div className="absolute bottom-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {col.itemCount} places saved
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-black text-sm text-gray-900 leading-snug">{col.title}</h4>
                  <Link href="/trips">
                    <Button className="w-full rounded-full bg-[#00af87] hover:bg-[#009673] text-white text-xs font-bold h-9">
                      View Collection &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
