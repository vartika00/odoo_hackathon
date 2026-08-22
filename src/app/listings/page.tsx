"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  Star,
  Heart,
  ExternalLink,
  ChevronDown,
  Check,
  X,
  Map as MapIcon,
  List,
  Sparkles,
  Wifi,
  Coffee,
  Waves,
  Utensils,
  Car,
  Tv,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_LISTINGS = [
  {
    id: "stay-1",
    type: "HOTEL",
    name: "The St. Regis Bali Resort",
    location: "Nusa Dua, Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviewsCount: 3420,
    rankText: "#1 Best Value of 185 luxury resorts in Bali",
    priceMin: 480,
    priceOriginal: 580,
    starRating: 5,
    badge: "Travelers' Choice Best of the Best",
    amenities: ["Free WiFi", "Private Beach", "Spa & Wellness", "Free Breakfast", "Infinity Pool"],
    otas: [
      { name: "Tripadvisor Deals", price: 480, isLowest: true },
      { name: "Booking.com", price: 510 },
      { name: "Agoda", price: 525 },
      { name: "Expedia", price: 540 },
    ],
  },
  {
    id: "stay-2",
    type: "HOTEL",
    name: "Hotel The Mitsui Kyoto - A Luxury Collection Hotel",
    location: "Nakagyo Ward, Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 1890,
    rankText: "#2 of 420 Hotels in Kyoto",
    priceMin: 620,
    priceOriginal: 710,
    starRating: 5,
    badge: "Travelers' Choice",
    amenities: ["Free WiFi", "Natural Onsen", "Garden View", "Michelin Dining"],
    otas: [
      { name: "Tripadvisor Deals", price: 620, isLowest: true },
      { name: "Hotels.com", price: 645 },
      { name: "Booking.com", price: 650 },
    ],
  },
  {
    id: "stay-3",
    type: "HOTEL",
    name: "Shangri-La Paris",
    location: "16th Arrondissement, Paris, France",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewsCount: 2950,
    rankText: "#3 with Eiffel Tower views in Paris",
    priceMin: 1150,
    priceOriginal: 1300,
    starRating: 5,
    badge: "Iconic Stay",
    amenities: ["Eiffel View", "Indoor Pool", "Free WiFi", "Spa", "Bar"],
    otas: [
      { name: "Direct Official", price: 1150, isLowest: true },
      { name: "Booking.com", price: 1210 },
      { name: "Expedia", price: 1220 },
    ],
  },
  {
    id: "stay-4",
    type: "ATTRACTION",
    name: "Louvre Museum Skip-the-Line Masterpieces Guided Tour",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 7820,
    rankText: "#1 Cultural Experience in Europe",
    priceMin: 72,
    priceOriginal: 85,
    starRating: 5,
    badge: "Bestseller",
    amenities: ["Skip The Line", "Expert Guide", "Audio Headset", "Small Group"],
    otas: [
      { name: "Viator Official", price: 72, isLowest: true },
      { name: "GetYourGuide", price: 78 },
    ],
  },
  {
    id: "stay-5",
    type: "RESTAURANT",
    name: "Le Gabriel - La Réserve Paris (3 Michelin Stars)",
    location: "Champs-Élysées, Paris, France",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.95,
    reviewsCount: 1420,
    rankText: "#1 Fine Dining in France",
    priceMin: 220,
    priceOriginal: 220,
    starRating: 5,
    badge: "Michelin 3 Stars",
    amenities: ["Table Reservation", "Wine Pairing", "Private Dining", "Valet Parking"],
    otas: [
      { name: "TheFork Instant Table", price: 220, isLowest: true },
    ],
  },
  {
    id: "stay-6",
    type: "HOLIDAY_HOME",
    name: "Cliffside Infinity Villa overlooking Nusa Ceningan",
    location: "Nusa Lembongan, Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.97,
    reviewsCount: 940,
    rankText: "#1 Vacation Rental in Bali Islands",
    priceMin: 340,
    priceOriginal: 420,
    starRating: 5,
    badge: "Superhost Villa",
    amenities: ["Private Pool", "Oceanfront", "Full Kitchen", "Butler Service", "Free WiFi"],
    otas: [
      { name: "Tripadvisor Direct", price: 340, isLowest: true },
      { name: "Vrbo", price: 365 },
    ],
  },
];

function ListingsContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || "ALL";
  const initialQuery = searchParams.get("query") || "";

  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const allAmenitiesList = ["Free WiFi", "Private Beach", "Free Breakfast", "Infinity Pool", "Spa & Wellness", "Eiffel View"];

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter((item) => {
      // Filter by Type
      if (selectedType !== "ALL" && item.type !== selectedType) return false;

      // Filter by Query
      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Filter by Rating
      if (minRating > 0 && item.rating < minRating) return false;

      // Filter by Price
      if (item.priceMin && item.priceMin > maxPrice) return false;

      // Filter by Amenities
      if (
        selectedAmenities.length > 0 &&
        !selectedAmenities.every((a) => item.amenities.includes(a))
      ) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return (a.priceMin || 0) - (b.priceMin || 0);
      if (sortBy === "price_desc") return (b.priceMin || 0) - (a.priceMin || 0);
      if (sortBy === "rating") return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount;
    });
  }, [selectedType, searchQuery, minRating, maxPrice, selectedAmenities, sortBy]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-16">
      {/* Top Search & Filter Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-18 sm:top-20 z-30 shadow-2xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          {/* Quick Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: "ALL", label: "All Places" },
              { id: "HOTEL", label: "Hotels" },
              { id: "ATTRACTION", label: "Things to Do" },
              { id: "RESTAURANT", label: "Restaurants" },
              { id: "HOLIDAY_HOME", label: "Holiday Homes" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedType === tab.id
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Controls: Mobile Filter Button, Sort Dropdown & Map/List Switch */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Mobile Filter Trigger */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden rounded-full font-bold text-xs gap-1.5 border-gray-300"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#00af87]" />
              <span>Filters</span>
              {(selectedAmenities.length > 0 || minRating > 0 || maxPrice < 1500) && (
                <span className="h-4 w-4 rounded-full bg-[#00af87] text-white text-[10px] flex items-center justify-center">
                  !
                </span>
              )}
            </Button>

            {/* Sort selector */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 rounded-full px-3.5 py-1.5 text-xs font-bold text-gray-800 outline-none hover:border-gray-400 focus:border-[#00af87] shadow-2xs"
              >
                <option value="featured">Sort: Featured</option>
                <option value="rating">Highest Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

            {/* View Mode Switcher (List / Map) */}
            <div className="hidden sm:flex items-center bg-gray-100 p-0.5 rounded-full border border-gray-200">
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-colors ${
                  viewMode === "list"
                    ? "bg-white text-black shadow-2xs"
                    : "text-gray-500 hover:text-black"
                }`}
                title="List View"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`p-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-colors ${
                  viewMode === "map"
                    ? "bg-white text-black shadow-2xs"
                    : "text-gray-500 hover:text-black"
                }`}
                title="Map View"
              >
                <MapIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs sticky top-36">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                  <Filter className="h-4 w-4 text-[#00af87]" />
                  <span>Filters</span>
                </h3>
                {(selectedAmenities.length > 0 || minRating > 0 || maxPrice < 1500) && (
                  <button
                    onClick={() => {
                      setSelectedAmenities([]);
                      setMinRating(0);
                      setMaxPrice(1500);
                    }}
                    className="text-xs text-[#00af87] font-semibold hover:underline"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Price Range Slider */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                  Max Price per Night: ${maxPrice}
                </label>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="25"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#00af87] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-gray-400 font-semibold">
                  <span>$50</span>
                  <span>$750</span>
                  <span>$1,500+</span>
                </div>
              </div>

              {/* Traveler Rating */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                  Guest Rating
                </label>
                <div className="space-y-1.5">
                  {[
                    { label: "All ratings", val: 0 },
                    { label: "4.5 & higher (Excellent)", val: 4.5 },
                    { label: "4.0 & higher (Very Good)", val: 4.0 },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setMinRating(item.val)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                        minRating === item.val
                          ? "bg-emerald-50 text-[#00af87] border border-[#00af87]/40 font-bold"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <span>{item.label}</span>
                      {minRating === item.val && <Check className="h-3.5 w-3.5 text-[#00af87]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                  Popular Amenities
                </label>
                <div className="space-y-1.5">
                  {allAmenitiesList.map((amenity) => {
                    const isChecked = selectedAmenities.includes(amenity);
                    return (
                      <label
                        key={amenity}
                        className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer text-xs font-medium text-gray-700 select-none"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAmenity(amenity)}
                          className="rounded text-[#00af87] focus:ring-[#00af87] accent-[#00af87] h-4 w-4 cursor-pointer"
                        />
                        <span>{amenity}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Results Column */}
          <main className="lg:col-span-9 space-y-4">
            {/* Results Header */}
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs">
              <div>
                <h1 className="text-lg sm:text-xl font-black text-gray-900">
                  {searchQuery ? `Places matching "${searchQuery}"` : "Top Stays & Experiences"}
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  Showing {filteredListings.length} matching verified results
                </p>
              </div>

              <div className="text-xs font-bold text-[#00af87] bg-emerald-50 px-3 py-1.5 rounded-full hidden sm:block">
                ⚡ Best Price Guarantee
              </div>
            </div>

            {/* If Map View selected */}
            {viewMode === "map" && (
              <div className="w-full h-80 sm:h-96 rounded-2xl bg-gray-200 overflow-hidden relative border border-gray-300 shadow-inner flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(#00af87_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                <div className="relative text-center p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 max-w-sm mx-4">
                  <MapPin className="h-8 w-8 text-[#00af87] mx-auto mb-2 animate-bounce" />
                  <h4 className="font-bold text-gray-900 text-sm">Interactive Map View</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Displaying coordinates for {filteredListings.length} properties in current map boundaries.
                  </p>
                  <Button
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="mt-3 rounded-full bg-black text-white text-xs font-bold"
                  >
                    Back to List View
                  </Button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredListings.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center space-y-3">
                <div className="h-14 w-14 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">No properties found</h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  Try adjusting your filters, clearing amenity requirements or changing your location search.
                </p>
                <Button
                  onClick={() => {
                    setSelectedAmenities([]);
                    setMinRating(0);
                    setMaxPrice(1500);
                    setSelectedType("ALL");
                    setSearchQuery("");
                  }}
                  className="rounded-full bg-[#00af87] text-white font-bold text-xs"
                >
                  Reset all filters
                </Button>
              </div>
            )}

            {/* Listings Grid / Cards */}
            <div className="space-y-4">
              {filteredListings.map((item) => {
                const isSaved = !!savedIds[item.id];

                return (
                  <div
                    key={item.id}
                    className="group bg-white rounded-2xl border border-gray-200 hover:border-[#00af87]/60 shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
                  >
                    {/* Image Column */}
                    <div className="relative md:w-80 h-56 md:h-auto shrink-0 bg-gray-100 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-cover transition-transform duration-500 group-hover:scale-106"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold">
                          {item.badge}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => toggleSave(item.id, e)}
                        aria-label="Save listing"
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                          isSaved
                            ? "bg-rose-500 text-white shadow-md scale-110"
                            : "bg-white/85 hover:bg-white text-gray-700 shadow-xs"
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    {/* Middle Info Column */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                          <MapPin className="h-3.5 w-3.5 text-[#00af87] shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </div>

                        <Link href={`/listings/${item.id}`}>
                          <h3 className="font-black text-base sm:text-lg text-gray-900 hover:text-[#00af87] transition-colors leading-snug">
                            {item.name}
                          </h3>
                        </Link>

                        {/* Rating Bubbles */}
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                          <div className="flex items-center gap-1 font-extrabold text-gray-900">
                            <div className="flex gap-0.5 text-[#00af87]">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`h-2.5 w-2.5 rounded-full inline-block ${
                                    i < Math.floor(item.rating) ? "bg-[#00af87]" : "bg-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span>{item.rating.toFixed(1)}</span>
                          </div>
                          <span className="text-gray-500 font-medium">
                            ({item.reviewsCount.toLocaleString()} reviews)
                          </span>
                        </div>

                        <div className="mt-1 text-xs font-semibold text-emerald-800">
                          {item.rankText}
                        </div>

                        {/* Amenities Chips */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.amenities.slice(0, 4).map((amenity) => (
                            <span
                              key={amenity}
                              className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[11px] font-medium"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Mobile Pricing Quick View */}
                      <div className="mt-4 pt-3 border-t border-gray-100 md:hidden flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">
                            Best Rate from
                          </span>
                          <span className="text-lg font-black text-gray-900">${item.priceMin}</span>
                          <span className="text-xs text-gray-500"> / night</span>
                        </div>

                        <Link href={`/listings/${item.id}`}>
                          <Button className="rounded-full bg-[#00af87] hover:bg-[#009673] text-white font-bold text-xs px-5 h-9">
                            View Deal &rarr;
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Right OTA Price Comparison Column (Desktop) */}
                    <div className="hidden md:flex w-64 p-5 bg-[#fafafa] border-l border-gray-100 flex-col justify-between shrink-0">
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                          Compare Deals
                        </span>

                        <div className="space-y-1.5">
                          {item.otas.map((ota) => (
                            <div
                              key={ota.name}
                              className={`flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-colors ${
                                ota.isLowest
                                  ? "bg-emerald-50 border border-[#00af87]/30 text-emerald-950 font-bold"
                                  : "text-gray-600 hover:bg-gray-100"
                              }`}
                            >
                              <span className="truncate pr-2">{ota.name}</span>
                              <span className="shrink-0 text-gray-900 font-extrabold">
                                ${ota.price}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-200 text-center">
                        <Link href={`/listings/${item.id}`}>
                          <Button className="w-full rounded-full bg-[#00af87] hover:bg-[#009673] text-white font-extrabold text-xs h-10 shadow-sm transition-transform active:scale-95">
                            View Deal &rarr;
                          </Button>
                        </Link>
                        <span className="text-[10px] text-gray-400 mt-1 block font-medium">
                          Free cancellation on most rooms
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filters Slide-in Bottom Sheet */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-3xl shadow-2xl flex flex-col z-50 animate-in slide-in-from-bottom duration-300">
            {/* Sheet Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-black text-lg text-gray-900">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Sheet Body */}
            <div className="p-5 overflow-y-auto space-y-6">
              {/* Price Slider */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                  Max Price: ${maxPrice}
                </label>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="25"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#00af87]"
                />
              </div>

              {/* Guest Rating */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                  Guest Rating
                </label>
                <div className="space-y-1">
                  {[
                    { label: "All ratings", val: 0 },
                    { label: "4.5 & higher (Excellent)", val: 4.5 },
                    { label: "4.0 & higher (Very Good)", val: 4.0 },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setMinRating(item.val)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                        minRating === item.val
                          ? "bg-emerald-50 text-[#00af87] font-bold"
                          : "text-gray-700"
                      }`}
                    >
                      <span>{item.label}</span>
                      {minRating === item.val && <Check className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                  Amenities
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {allAmenitiesList.map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 text-xs font-semibold text-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="rounded text-[#00af87] accent-[#00af87]"
                      />
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Sheet Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedAmenities([]);
                  setMinRating(0);
                  setMaxPrice(1500);
                }}
                className="flex-1 rounded-full text-xs font-bold"
              >
                Clear
              </Button>
              <Button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 rounded-full bg-[#00af87] hover:bg-[#009673] text-white text-xs font-bold"
              >
                Show Results ({filteredListings.length})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading listings...</div>}>
      <ListingsContent />
    </Suspense>
  );
}
