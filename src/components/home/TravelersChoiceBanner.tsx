"use client";

import Link from "next/link";
import Image from "next/image";
import { Award, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export function TravelersChoiceBanner() {
  return (
    <section className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#002b11] via-[#00471b] to-[#001f0c] text-white p-6 sm:p-10 lg:p-14 shadow-xl">
        {/* Background decorative elements */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#00af87]/20 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-16 w-60 h-60 rounded-full bg-[#00eb5b]/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text content */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#00eb5b] text-xs font-bold uppercase tracking-wider">
              <Award className="h-4 w-4" />
              <span>Travelers' Choice Awards 2026</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Best of the Best: Top destinations picked by millions
            </h2>

            <p className="text-sm sm:text-base text-gray-200 font-medium max-w-xl mx-auto lg:mx-0">
              Every year, we analyze millions of traveler reviews, ratings, and saves worldwide to crown the highest-ranked hotels, destinations, and culinary experiences.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Link href="/listings?type=HOTEL&badge=TRAVELERS_CHOICE">
                <Button className="rounded-full bg-[#00eb5b] hover:bg-[#00d050] text-black font-extrabold px-7 h-12 text-sm sm:text-base transition-transform active:scale-95 shadow-md flex items-center gap-2">
                  <span>Explore Winners</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <Link href="/trips">
                <Button variant="outline" className="rounded-full border-white/30 hover:bg-white/10 text-white font-bold px-6 h-12 text-sm sm:text-base">
                  See Saved Rankings
                </Button>
              </Link>
            </div>
          </div>

          {/* Award Badge & Card Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-amber-400 text-black flex items-center justify-center font-black text-xl shadow-lg">
                  🏆
                </div>
                <div>
                  <div className="text-xs font-bold text-[#00eb5b] uppercase">#1 Global Destination</div>
                  <h4 className="font-extrabold text-lg text-white">Bali, Indonesia</h4>
                </div>
              </div>

              <div className="relative h-44 rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Bali"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-xs text-white">
                  <span className="font-semibold">99.4% Positive Traveler Rating</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-300 pt-1">
                <span>Over 185,000 Verified Reviews</span>
                <span className="text-[#00eb5b] font-bold">2026 Winner</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
