"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight, Heart, Star, MapPin } from "lucide-react";

export interface Destination {
  id: string;
  name: string;
  image: string;
  tagline?: string;
  rating?: number;
  reviewsCount?: number;
  thingsCount?: number;
  category?: string;
}

interface DestinationCarouselProps {
  title: string;
  subtitle?: string;
  destinations: Destination[];
}

function NextArrow(props: any) {
  const { onClick, currentSlide, slideCount } = props;
  return (
    <button
      aria-label="Next destination"
      className="hidden md:flex absolute -right-3 lg:-right-4 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white text-gray-900 rounded-full p-2.5 shadow-lg border border-gray-200 transition-all hover:scale-110 active:scale-95 items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <ChevronRight className="h-5 w-5" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick, currentSlide } = props;
  return (
    <button
      aria-label="Previous destination"
      className="hidden md:flex absolute -left-3 lg:-left-4 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white text-gray-900 rounded-full p-2.5 shadow-lg border border-gray-200 transition-all hover:scale-110 active:scale-95 items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <ChevronLeft className="h-5 w-5" />
    </button>
  );
}

export function DestinationCarousel({ title, subtitle, destinations }: DestinationCarouselProps) {
  const [savedItems, setSavedItems] = useState<Record<string, boolean>>({});

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 450,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <section className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-950 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
              {subtitle}
            </p>
          )}
        </div>
        <Link
          href={`/listings?query=${encodeURIComponent(title)}`}
          className="text-xs sm:text-sm font-bold text-[#00af87] hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
        >
          <span>See all</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="relative px-0 sm:px-2">
        <Slider {...settings} className="-mx-2">
          {destinations.map((dest) => {
            const isSaved = !!savedItems[dest.id];
            return (
              <div key={dest.id} className="px-2 pb-6 pt-1">
                <Link
                  href={`/listings?query=${encodeURIComponent(dest.name)}`}
                  className="block group"
                >
                  <div className="relative w-full aspect-[4/3] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-100">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-108"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    {/* Top Badges & Save Heart Button */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      {dest.category ? (
                        <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-gray-900 text-[11px] font-bold shadow-xs">
                          {dest.category}
                        </span>
                      ) : <span />}

                      <button
                        type="button"
                        onClick={(e) => toggleSave(dest.id, e)}
                        aria-label="Save to trips"
                        className={`p-2 rounded-full backdrop-blur-md transition-all ${
                          isSaved
                            ? "bg-rose-500 text-white shadow-md scale-110"
                            : "bg-black/30 text-white hover:bg-black/50 hover:scale-105"
                        }`}
                      >
                        <Heart
                          className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
                        />
                      </button>
                    </div>

                    {/* Bottom Content Information */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 mb-0.5">
                        <MapPin className="h-3 w-3" />
                        <span>Destination</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black leading-tight tracking-tight drop-shadow-xs">
                        {dest.name}
                      </h3>
                      {dest.tagline && (
                        <p className="text-xs text-gray-200 line-clamp-1 mt-0.5 font-medium">
                          {dest.tagline}
                        </p>
                      )}
                      <div className="mt-2 flex items-center justify-between text-[11px] text-gray-200">
                        <span className="flex items-center gap-1 font-semibold">
                          <span className="h-2 w-2 rounded-full bg-[#00eb5b] inline-block" />
                          {dest.rating || "4.8"} ({dest.reviewsCount || "1.2k"}+ reviews)
                        </span>
                        <span className="text-white font-bold underline text-[11px] group-hover:text-[#00eb5b] transition-colors">
                          Explore &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
}
