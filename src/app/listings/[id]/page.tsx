"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Share2,
  MapPin,
  Star,
  CheckCircle2,
  Calendar,
  Users,
  ShieldCheck,
  ChevronRight,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  Wifi,
  Coffee,
  Waves,
  Utensils,
  Car,
  Tv,
  ExternalLink,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DETAIL_DATA = {
  id: "stay-1",
  name: "The St. Regis Bali Resort",
  type: "Luxury Resort & Spa",
  location: "Kawasan Pariwisata Nusa Dua Lot S6, Nusa Dua 80363, Indonesia",
  rating: 5.0,
  reviewsCount: 3420,
  rank: "#1 of 185 Hotels in Nusa Dua",
  pricePerNight: 480,
  originalPrice: 580,
  images: [
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ],
  amenities: [
    { name: "Free High-Speed WiFi", icon: Wifi },
    { name: "Private White Sand Beach", icon: Waves },
    { name: "Signature Iridium Spa", icon: Sparkles },
    { name: "Free Gourmet Breakfast", icon: Coffee },
    { name: "Kayuputi Fine Dining", icon: Utensils },
    { name: "24/7 Personal Butler", icon: CheckCircle2 },
    { name: "Airport Limousine Service", icon: Car },
    { name: "4K Smart Streaming TV", icon: Tv },
  ],
  otas: [
    { name: "Tripadvisor Deals", price: 480, badge: "Best Price", link: "#" },
    { name: "Booking.com", price: 510, badge: "Free Cancellation", link: "#" },
    { name: "Agoda", price: 525, badge: "Member Price", link: "#" },
    { name: "Expedia", price: 540, badge: "", link: "#" },
    { name: "Hotels.com", price: 545, badge: "", link: "#" },
  ],
  reviews: [
    {
      id: "r1",
      author: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      country: "Sydney, Australia",
      rating: 5,
      date: "August 2026",
      tripType: "Traveled as a couple",
      title: "Exceeded every possible expectation",
      content:
        "The Lagoon Villa was paradise. Stepping right from our sun deck into the 9,220 sqm swimmable saltwater lagoon was unforgettable. Our butler Putu anticipated every need before we even asked. Breakfast at Boneka is the best hotel breakfast on Earth.",
      helpful: 42,
    },
    {
      id: "r2",
      author: "David Miller",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      country: "London, United Kingdom",
      rating: 5,
      date: "July 2026",
      tripType: "Traveled with family",
      title: "Pure luxury and heartfelt Balinese hospitality",
      content:
        "We celebrated our 10th anniversary here with our children. The staff treated our kids like royalty. The beachfront fire dance at sunset and dining at Kayuputi were culinary highlights. Worth every dollar.",
      helpful: 29,
    },
  ],
};

export default function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [checkInDate, setCheckInDate] = useState("2026-08-25");
  const [checkOutDate, setCheckOutDate] = useState("2026-08-30");
  const [guestCount, setGuestCount] = useState("2 Adults, 1 Room");
  const [activeTab, setActiveTab] = useState<"overview" | "amenities" | "reviews" | "deals">("overview");

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24 lg:pb-16">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <Link href="/" className="hover:text-black shrink-0">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <Link href="/listings?type=HOTEL" className="hover:text-black shrink-0">Hotels</Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <Link href="/listings?query=Bali" className="hover:text-black shrink-0">Bali</Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <span className="text-gray-900 font-bold truncate">{DETAIL_DATA.name}</span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#00af87] text-xs font-bold uppercase tracking-wide">
                  {DETAIL_DATA.type}
                </span>
                <span className="text-xs font-semibold text-emerald-800">
                  🏆 Travelers' Choice Best of the Best 2026
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-950 mt-1">
                {DETAIL_DATA.name}
              </h1>

              {/* Rating & Location */}
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-1 font-extrabold text-gray-900">
                  <div className="flex gap-0.5 text-[#00af87]">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="h-3 w-3 rounded-full bg-[#00af87] inline-block" />
                    ))}
                  </div>
                  <span>{DETAIL_DATA.rating.toFixed(1)}</span>
                </div>
                <span className="text-gray-500 font-medium">
                  ({DETAIL_DATA.reviewsCount.toLocaleString()} reviews)
                </span>
                <span className="text-gray-400">•</span>
                <span className="font-semibold text-gray-700">{DETAIL_DATA.rank}</span>
              </div>

              <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                <MapPin className="h-3.5 w-3.5 text-[#00af87] shrink-0" />
                <span>{DETAIL_DATA.location}</span>
              </div>
            </div>

            {/* Actions: Save / Share / Review */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2.5 rounded-full border transition-all flex items-center gap-1.5 text-xs font-bold ${
                  isSaved
                    ? "bg-rose-50 border-rose-200 text-rose-600"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Heart className={`h-4 w-4 ${isSaved ? "fill-current text-rose-500" : ""}`} />
                <span>{isSaved ? "Saved" : "Save"}</span>
              </button>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: DETAIL_DATA.name, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }
                }}
                className="p-2.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors flex items-center gap-1.5 text-xs font-bold"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>

              <Link href="/review">
                <Button className="rounded-full bg-black hover:bg-gray-800 text-white text-xs font-bold px-4 h-9">
                  Write a Review
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery - Desktop Grid / Mobile Carousel */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Desktop 5-Photo Collage */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-3 h-[420px] rounded-3xl overflow-hidden shadow-md">
          <div className="col-span-2 row-span-2 relative bg-gray-200 group cursor-pointer">
            <Image
              src={DETAIL_DATA.images[0]}
              alt="Main stay photo"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-103"
            />
          </div>
          {DETAIL_DATA.images.slice(1, 5).map((img, idx) => (
            <div key={idx} className="relative bg-gray-200 group cursor-pointer">
              <Image
                src={img}
                alt={`Photo ${idx + 2}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {idx === 3 && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center text-white font-bold text-sm hover:bg-black/60 transition-colors">
                  + 184 Photos
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Swipeable Gallery */}
        <div className="md:hidden relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md bg-gray-100">
          <Image
            src={DETAIL_DATA.images[selectedPhotoIndex]}
            alt="Stay photo"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-full font-bold">
            {selectedPhotoIndex + 1} / {DETAIL_DATA.images.length}
          </div>

          <button
            onClick={() => setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : DETAIL_DATA.images.length - 1))}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setSelectedPhotoIndex((prev) => (prev < DETAIL_DATA.images.length - 1 ? prev + 1 : 0))}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content & Booking Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Details, Amenities, Reviews */}
          <div className="lg:col-span-8 space-y-8">
            {/* Quick Sticky Subnav */}
            <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
              {[
                { id: "overview", label: "Overview" },
                { id: "deals", label: "Deals & Rates" },
                { id: "amenities", label: "Amenities" },
                { id: "reviews", label: "Reviews (3.4k)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                    activeTab === tab.id
                      ? "bg-black text-white"
                      : "text-gray-600 hover:text-black hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Overview Section */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl font-black text-gray-900">About the Property</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                Nestled on the pristine white-sand beach of Nusa Dua, The St. Regis Bali Resort is an ultra-luxury haven featuring bespoke 24-hour butler service, private lagoon villas, and world-class dining. Enjoy the 9,220-square-meter saltwater lagoon pool, indulge in the award-winning Iridium Spa, and savor Michelin-caliber beachfront gastronomy at Kayuputi.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100 text-center">
                <div className="p-3 bg-gray-50 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Property Style</span>
                  <span className="font-bold text-xs sm:text-sm text-gray-900">Oceanfront Luxury</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Languages</span>
                  <span className="font-bold text-xs sm:text-sm text-gray-900">English, Indonesian, Japanese</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Airport Proximity</span>
                  <span className="font-bold text-xs sm:text-sm text-gray-900">20 min (DPS Airport)</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Cleanliness</span>
                  <span className="font-bold text-xs sm:text-sm text-[#00af87]">5.0 / 5.0 Rating</span>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl font-black text-gray-900">Featured Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {DETAIL_DATA.amenities.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.name} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50/80 border border-gray-100">
                      <div className="p-2 rounded-xl bg-white text-[#00af87] shadow-2xs">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-bold text-xs sm:text-sm text-gray-800">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-gray-900">Traveler Reviews</h2>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    Authentic feedback from verified guests
                  </p>
                </div>
                <Link href="/review">
                  <Button className="rounded-full bg-[#00af87] hover:bg-[#009673] text-white text-xs font-bold px-5">
                    Write a Review
                  </Button>
                </Link>
              </div>

              {/* Review Score Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl">
                <div className="text-center">
                  <div className="text-xl font-black text-gray-900">5.0</div>
                  <div className="text-[11px] font-semibold text-gray-600">Location</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-black text-gray-900">5.0</div>
                  <div className="text-[11px] font-semibold text-gray-600">Cleanliness</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-black text-gray-900">4.9</div>
                  <div className="text-[11px] font-semibold text-gray-600">Service</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-black text-gray-900">4.8</div>
                  <div className="text-[11px] font-semibold text-gray-600">Value</div>
                </div>
              </div>

              {/* Review List */}
              <div className="space-y-6 pt-2">
                {DETAIL_DATA.reviews.map((rev) => (
                  <div key={rev.id} className="border-b border-gray-100 pb-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                          <Image src={rev.avatar} alt={rev.author} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-gray-900">{rev.author}</h4>
                          <span className="text-[11px] text-gray-500">{rev.country} • {rev.tripType}</span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">{rev.date}</span>
                    </div>

                    <div className="flex text-[#00af87] gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#00af87] inline-block" />
                      ))}
                    </div>

                    <h5 className="font-bold text-sm sm:text-base text-gray-900">{rev.title}</h5>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{rev.content}</p>

                    <div className="flex items-center gap-2 pt-1 text-xs text-gray-500">
                      <button className="flex items-center gap-1 font-semibold hover:text-[#00af87]">
                        <ThumbsUp className="h-3.5 w-3.5" />
                        <span>Helpful ({rev.helpful})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget (Desktop) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg sticky top-28 space-y-5">
              <div className="flex items-end justify-between border-b border-gray-100 pb-4">
                <div>
                  <span className="text-xs text-gray-400 uppercase font-bold block">Rates starting at</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-gray-950">${DETAIL_DATA.pricePerNight}</span>
                    <span className="text-sm line-through text-gray-400">${DETAIL_DATA.originalPrice}</span>
                    <span className="text-xs text-gray-500">/ night</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
                  Save 17%
                </span>
              </div>

              {/* Date & Guest Pickers */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                    <label className="text-[10px] uppercase font-bold text-gray-500 block">Check In</label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-gray-800 outline-none"
                    />
                  </div>
                  <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                    <label className="text-[10px] uppercase font-bold text-gray-500 block">Check Out</label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-gray-800 outline-none"
                    />
                  </div>
                </div>

                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                  <label className="text-[10px] uppercase font-bold text-gray-500 block">Guests</label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-gray-800 outline-none"
                  >
                    <option value="1 Adult, 1 Room">1 Adult, 1 Room</option>
                    <option value="2 Adults, 1 Room">2 Adults, 1 Room</option>
                    <option value="2 Adults, 2 Children">2 Adults, 2 Children</option>
                    <option value="4 Adults, 2 Rooms">4 Adults, 2 Rooms</option>
                  </select>
                </div>
              </div>

              {/* OTA Rates List */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Compare Booking Sites
                </span>

                {DETAIL_DATA.otas.map((ota, i) => (
                  <div
                    key={ota.name}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                      i === 0
                        ? "bg-emerald-50/70 border-[#00af87] shadow-xs"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-gray-900">{ota.name}</span>
                        {ota.badge && (
                          <span className="px-1.5 py-0.2 rounded bg-emerald-600 text-white text-[9px] font-bold">
                            {ota.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-500">Free cancellation</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-gray-900">${ota.price}</span>
                      <Button
                        size="sm"
                        className={`rounded-full text-xs font-bold h-8 px-3 ${
                          i === 0 ? "bg-[#00af87] hover:bg-[#009673] text-white" : "bg-black text-white hover:bg-gray-800"
                        }`}
                      >
                        View Deal
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center text-xs text-gray-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#00af87]" />
                <span>Price Match & Secure Booking Protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Booking Bar (Mobile & Tablet) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 z-40 shadow-2xl flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Rates from</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-gray-900">${DETAIL_DATA.pricePerNight}</span>
            <span className="text-xs text-gray-500">/ night</span>
          </div>
        </div>

        <Button
          onClick={() => alert("Redirecting to best booking deal...")}
          className="rounded-full bg-[#00af87] hover:bg-[#009673] text-white font-extrabold text-sm px-7 h-11 shadow-lg"
        >
          View Deals ({DETAIL_DATA.otas.length})
        </Button>
      </div>
    </div>
  );
}
