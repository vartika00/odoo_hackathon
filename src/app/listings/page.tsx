"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
  ArrowUpDown,
  Loader2,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlaceListing {
  id: string;
  type: "HOTEL" | "RESTAURANT" | "ATTRACTION" | "HOLIDAY_HOME";
  name: string;
  location: string;
  city: string;
  country: string;
  description: string;
  image: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  rankText: string;
  priceMin?: number;
  priceOriginal?: number;
  starRating?: number;
  lat: number;
  lng: number;
  badge?: string;
  amenities: string[];
  otas: {
    name: string;
    price: number;
    isLowest?: boolean;
  }[];
}

function ListingsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialType = searchParams.get("type") || "ALL";
  const initialQuery = searchParams.get("query") || "";

  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchInput, setSearchInput] = useState(initialQuery);
  const [listings, setListings] = useState<PlaceListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});

  // Sync state when URL params change
  useEffect(() => {
    const q = searchParams.get("query") || "";
    const t = searchParams.get("type") || "ALL";
    setSearchQuery(q);
    setSearchInput(q);
    setSelectedType(t);
  }, [searchParams]);

  // Fetch places from API
  useEffect(() => {
    let isMounted = true;
    async function fetchPlaces() {
      setIsLoading(true);
      try {
        const queryParam = searchQuery.trim() ? `query=${encodeURIComponent(searchQuery.trim())}` : "";
        const typeParam = selectedType !== "ALL" ? `type=${selectedType}` : "";
        const params = [queryParam, typeParam].filter(Boolean).join("&");

        const res = await fetch(`/api/places${params ? `?${params}` : ""}`);
        const data = await res.json();
        if (isMounted && data.success) {
          setListings(data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch places:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchPlaces();
    return () => {
      isMounted = false;
    };
  }, [searchQuery, selectedType]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    const typeParam = selectedType !== "ALL" ? `type=${selectedType}` : "";
    const queryParam = searchInput.trim() ? `query=${encodeURIComponent(searchInput.trim())}` : "";
    const params = [typeParam, queryParam].filter(Boolean).join("&");
    router.push(`/listings${params ? `?${params}` : ""}`);
  };

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

  const allAmenitiesList = [
    "Free WiFi",
    "Private Beach",
    "Free Breakfast",
    "Infinity Pool",
    "Spa & Wellness",
    "Eiffel View",
    "Mountain View",
    "Skip The Line",
    "Swiss Fondue",
    "Fireplace"
  ];

  const filteredListings = useMemo(() => {
    return listings
      .filter((item) => {
        // Filter by Rating
        if (minRating > 0 && item.rating < minRating) return false;

        // Filter by Price
        if (item.priceMin && item.priceMin > maxPrice) return false;

        // Filter by Amenities
        if (
          selectedAmenities.length > 0 &&
          !selectedAmenities.every((a) => item.amenities?.includes(a))
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return (a.priceMin || 0) - (b.priceMin || 0);
        if (sortBy === "price_desc") return (b.priceMin || 0) - (a.priceMin || 0);
        if (sortBy === "rating") return b.rating - a.rating;
        return b.reviewsCount - a.reviewsCount;
      });
  }, [listings, minRating, maxPrice, selectedAmenities, sortBy]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-16">
      {/* Top Search & Filter Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-18 sm:top-20 z-30 shadow-2xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          
          {/* Live Search Form Input directly on Listings Page */}
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80 md:w-96">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-[#00af87]" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search any destination, hotel, city..."
              className="w-full h-10 pl-9 pr-20 bg-gray-100 focus:bg-white border border-gray-200 focus:border-[#00af87] rounded-full text-xs font-semibold text-gray-900 outline-none transition-all"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3.5 bg-[#00af87] hover:bg-[#009673] text-white rounded-full text-xs font-bold transition-colors"
            >
              Search
            </button>
          </form>

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
                onClick={() => {
                  setSelectedType(tab.id);
                  const typeParam = tab.id !== "ALL" ? `type=${tab.id}` : "";
                  const queryParam = searchQuery.trim() ? `query=${encodeURIComponent(searchQuery.trim())}` : "";
                  const params = [typeParam, queryParam].filter(Boolean).join("&");
                  router.push(`/listings${params ? `?${params}` : ""}`);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedType === tab.id
                    ? "bg-black text-white shadow-xs"
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
                className="bg-white border border-gray-300 rounded-full px-3.5 py-1.5 text-xs font-bold text-gray-800 outline-none hover:border-gray-400 focus:border-[#00af87] shadow-2xs cursor-pointer"
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
                className={`p-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
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
                className={`p-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
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
            <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-xs sticky top-36">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
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
                  Max Price: ${maxPrice}
                </label>
                <input
                  type="range"
                  min="40"
                  max="1500"
                  step="20"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#00af87] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-gray-400 font-semibold">
                  <span>$40</span>
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
                    { label: "4.8 & higher (Exceptional)", val: 4.8 },
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
                  Amenities & Perks
                </label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
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
            <div className="flex items-center justify-between bg-white p-4 sm:p-5 rounded-3xl border border-gray-200/90 shadow-2xs">
              <div>
                <h1 className="text-lg sm:text-xl font-black text-gray-900">
                  {searchQuery ? `Places in "${searchQuery}"` : "Top Stays, Tours & Dining"}
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  {isLoading ? "Searching places database..." : `Found ${filteredListings.length} matching places`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-xs font-bold text-[#00af87] bg-emerald-50 px-3 py-1.5 rounded-full hidden sm:block">
                  ⚡ 200+ Booking Sites Compared
                </div>
              </div>
            </div>

            {/* Loading Spinner */}
            {isLoading && (
              <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center space-y-3 shadow-xs">
                <Loader2 className="h-8 w-8 text-[#00af87] animate-spin mx-auto" />
                <h3 className="font-bold text-sm text-gray-800">Fetching live places for "{searchQuery || "all"}"...</h3>
                <p className="text-xs text-gray-400">Loading hotel deals, tour tickets & traveler reviews</p>
              </div>
            )}

            {/* Interactive Map View */}
            {!isLoading && viewMode === "map" && (
              <div className="w-full h-80 sm:h-96 rounded-3xl bg-[#e6e2dc] overflow-hidden relative border border-gray-300 shadow-inner flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(#00af87_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-30" />
                
                {/* Dynamic Pins on Map */}
                {filteredListings.map((spot, i) => (
                  <div
                    key={spot.id}
                    style={{
                      left: `${20 + ((i * 22) % 65)}%`,
                      top: `${25 + ((i * 18) % 55)}%`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  >
                    <div className="p-2 rounded-full bg-[#00af87] text-white shadow-xl flex items-center gap-1 font-black text-xs group-hover:scale-125 transition-transform ring-2 ring-white">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>${spot.priceMin || 50}</span>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 hidden group-hover:block z-30 pointer-events-none">
                      <div className="bg-black/90 text-white text-[11px] font-bold px-3 py-1 rounded-xl shadow-2xl whitespace-nowrap">
                        {spot.name} • ★ {spot.rating}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-md flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-900">
                    Showing coordinates for {filteredListings.length} properties
                  </span>
                  <Button
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-full bg-black text-white text-xs font-bold h-8"
                  >
                    Back to List View
                  </Button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredListings.length === 0 && (
              <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center space-y-3 shadow-xs">
                <div className="h-14 w-14 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">No properties found</h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  Try adjusting your filters or searching for another destination like "Switzerland", "Paris", "Bali", "Tokyo", or "Scotland".
                </p>
                <Button
                  onClick={() => {
                    setSelectedAmenities([]);
                    setMinRating(0);
                    setMaxPrice(1500);
                    setSelectedType("ALL");
                    setSearchQuery("");
                    setSearchInput("");
                  }}
                  className="rounded-full bg-[#00af87] text-white font-bold text-xs"
                >
                  Reset all filters
                </Button>
              </div>
            )}

            {/* Listings Grid / Cards */}
            {!isLoading && (
              <div className="space-y-4">
                {filteredListings.map((item) => {
                  const isSaved = !!savedIds[item.id];

                  return (
                    <div
                      key={item.id}
                      className="group bg-white rounded-3xl border border-gray-200 hover:border-[#00af87]/60 shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
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
                        {item.badge && (
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold">
                              {item.badge}
                            </span>
                          </div>
                        )}

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
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
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

                          <p className="text-xs text-gray-600 line-clamp-2 mt-1.5">
                            {item.description}
                          </p>

                          {/* Amenities Chips */}
                          {item.amenities && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {item.amenities.slice(0, 4).map((amenity) => (
                                <span
                                  key={amenity}
                                  className="px-2.5 py-0.5 rounded-lg bg-gray-100 text-gray-600 text-[11px] font-semibold"
                                >
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Mobile Pricing Quick View */}
                        <div className="pt-3 border-t border-gray-100 md:hidden flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-gray-400 uppercase font-bold block">
                              Rate from
                            </span>
                            <span className="text-lg font-black text-gray-900">${item.priceMin || 50}</span>
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
                            {item.otas?.map((ota) => (
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
            )}
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
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-black text-lg text-gray-900">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                  Max Price: ${maxPrice}
                </label>
                <input
                  type="range"
                  min="40"
                  max="1500"
                  step="20"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#00af87]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                  Guest Rating
                </label>
                <div className="space-y-1">
                  {[
                    { label: "All ratings", val: 0 },
                    { label: "4.8 & higher (Exceptional)", val: 4.8 },
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
    <Suspense fallback={<div className="p-12 text-center text-sm font-bold text-gray-500">Loading places...</div>}>
      <ListingsContent />
    </Suspense>
  );
}
