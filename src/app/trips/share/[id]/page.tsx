"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Calendar,
  MapPin,
  Clock,
  Copy,
  Check,
  Share2,
  Sparkles,
  Compass,
  ArrowRight,
  User,
  Heart,
  Globe2,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SharedItineraryPage() {
  const router = useRouter();
  const params = useParams();
  const [copied, setCopied] = useState(false);
  const [cloned, setCloned] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCloneTrip = () => {
    setCloned(true);
    setTimeout(() => {
      router.push("/trips");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f5] pb-24 text-gray-900">
      {/* Top Floating Share Navigation */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-[#00af87] flex items-center justify-center text-white shadow-xs">
              <Compass className="w-4 h-4" />
            </div>
            <span className="font-black text-lg tracking-tight text-gray-900">
              Atlas<span className="text-[#00af87]">.</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyLink}
              className="h-9 rounded-2xl text-xs font-bold border-gray-300 flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00af87]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? "Link Copied" : "Share"}</span>
            </Button>

            <Button
              size="sm"
              onClick={handleCloneTrip}
              className="h-9 rounded-2xl text-xs font-bold bg-[#00af87] hover:bg-[#009b77] text-white shadow-md flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{cloned ? "Cloning Trip..." : "Copy to My Trips"}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 pt-6 sm:pt-8 space-y-6 sm:space-y-8">
        {/* Hero Header Card */}
        <div className="relative rounded-3xl overflow-hidden bg-gray-950 text-white p-6 sm:p-10 shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Trip Cover"
            fill
            className="object-cover opacity-40"
          />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                Public Shared Travel Plan
              </span>
              <span>&bull;</span>
              <span>8 Days &bull; 2 Cities</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Bali & Nusa Penida Island Expedition
            </h1>

            <p className="text-xs sm:text-sm text-gray-200 max-w-2xl font-medium">
              Cliffside ocean villas, manta ray snorkeling, Kecak temple dances & Michelin dining in Ubud.
            </p>

            {/* Creator Badge */}
            <div className="pt-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden relative border-2 border-white shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="Creator"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Curated by Elena Rostova</span>
                <span className="text-[10px] text-emerald-300 font-medium">Atlas Verified Travel Ambassador</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clone Banner */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-3xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-black text-sm text-emerald-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#00af87]" />
              <span>Love this itinerary?</span>
            </h3>
            <p className="text-xs text-emerald-800 mt-0.5">
              Copy this exact travel plan to your account, customize dates, or swap activities with 1 click.
            </p>
          </div>

          <Button
            onClick={handleCloneTrip}
            className="bg-[#00af87] hover:bg-[#009b77] text-white font-bold text-xs rounded-2xl h-10 px-5 shadow-md flex items-center gap-2 shrink-0"
          >
            <Copy className="w-4 h-4" />
            <span>{cloned ? "Duplicating into your Planner..." : "Clone Trip Plan (Free)"}</span>
          </Button>
        </div>

        {/* Day-by-Day Stops */}
        <div className="space-y-6">
          <h2 className="text-xl font-black text-gray-900">Complete Itinerary Breakdown</h2>

          {/* Stop 1 */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="w-8 h-8 rounded-full bg-[#00af87] text-white font-black text-xs flex items-center justify-center">
                1
              </div>
              <div>
                <h3 className="font-black text-base text-gray-900">Nusa Dua & Uluwatu, Indonesia</h3>
                <p className="text-xs text-gray-500 font-medium">Days 1 - 3 &bull; Luxury Coastline & Sunsets</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex gap-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Hotel"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase">Hotel Check-in</span>
                  <h4 className="font-bold text-xs text-gray-900 mt-0.5">The St. Regis Bali Resort</h4>
                  <p className="text-[11px] text-gray-500">Nusa Dua Coastal Lagoon &bull; $590/night</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex gap-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Attraction"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#00af87] uppercase">Attraction</span>
                  <h4 className="font-bold text-xs text-gray-900 mt-0.5">Uluwatu Sunset Temple & Fire Dance</h4>
                  <p className="text-[11px] text-gray-500">South Kuta Cliffside &bull; $45/ticket</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stop 2 */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="w-8 h-8 rounded-full bg-[#00af87] text-white font-black text-xs flex items-center justify-center">
                2
              </div>
              <div>
                <h3 className="font-black text-base text-gray-900">Nusa Penida & Sanur, Indonesia</h3>
                <p className="text-xs text-gray-500 font-medium">Days 4 - 8 &bull; Snorkeling, Reefs & Dining</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex gap-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Tour"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#00af87] uppercase">Adventure Activity</span>
                  <h4 className="font-bold text-xs text-gray-900 mt-0.5">Nusa Penida Speedboat & Manta Snorkel</h4>
                  <p className="text-[11px] text-gray-500">Sanur Harbor &bull; $110/person</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex gap-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Dining"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-600 uppercase">Dining</span>
                  <h4 className="font-bold text-xs text-gray-900 mt-0.5">Kayuputi Beachfront Degustation Dinner</h4>
                  <p className="text-[11px] text-gray-500">Oceanfront Boardwalk &bull; $180/guest</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
