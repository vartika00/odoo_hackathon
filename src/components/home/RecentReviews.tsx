"use client";

import Image from "next/image";
import Link from "next/link";
import { ThumbsUp, MapPin, CheckCircle2, MessageSquare } from "lucide-react";
import { useState } from "react";

const COMMUNITY_REVIEWS = [
  {
    id: "rev-1",
    author: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "London, UK",
    badge: "Top Contributor",
    place: "The St. Regis Bali Resort",
    placeType: "Hotel",
    rating: 5,
    title: "Pure paradise with unmatched hospitality",
    body: "The lagoon villas are breathtaking. From the personal butler service to the sunrise breakfast by the ocean, every detail was immaculate.",
    helpfulVotes: 48,
    date: "2 days ago",
    photo: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rev-2",
    author: "Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Singapore",
    badge: "Verified Traveler",
    place: "Le Jules Verne",
    placeType: "Restaurant",
    rating: 5,
    title: "Dining inside the Eiffel Tower was surreal",
    body: "Exceptional tasting menu with panoramic views of the illuminated Paris skyline. Worth every single penny for a special anniversary.",
    helpfulVotes: 62,
    date: "4 days ago",
    photo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rev-3",
    author: "Sophia Martinez",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Madrid, Spain",
    badge: "Food & Wine Explorer",
    place: "Kyoto Fushimi Inari Early Morning Trek",
    placeType: "Attraction",
    rating: 5,
    title: "Go at 6:30 AM before the crowds!",
    body: "Walking through thousands of vermilion torii gates in the quiet morning mist is an experience that will stay with me forever.",
    helpfulVotes: 35,
    date: "1 week ago",
    photo: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
];

export function RecentReviews() {
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [likedState, setLikedState] = useState<Record<string, boolean>>({});

  const handleHelpful = (id: string, initialCount: number) => {
    if (likedState[id]) {
      setLikes((prev) => ({ ...prev, [id]: (prev[id] ?? initialCount) - 1 }));
      setLikedState((prev) => ({ ...prev, [id]: false }));
    } else {
      setLikes((prev) => ({ ...prev, [id]: (prev[id] ?? initialCount) + 1 }));
      setLikedState((prev) => ({ ...prev, [id]: true }));
    }
  };

  return (
    <section className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-950 tracking-tight">
            Latest Reviews from Real Travelers
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
            Real stories, authentic photos, and unbiased advice from our community
          </p>
        </div>
        <Link
          href="/review"
          className="text-xs sm:text-sm font-bold text-[#00af87] hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Write a Review</span>
          &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COMMUNITY_REVIEWS.map((rev) => {
          const currentLikes = likes[rev.id] ?? rev.helpfulVotes;
          const isLiked = likedState[rev.id];

          return (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 rounded-full overflow-hidden shrink-0 border border-gray-200">
                    <Image
                      src={rev.avatar}
                      alt={rev.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-gray-900">{rev.author}</h4>
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#00af87]" />
                    </div>
                    <div className="text-[11px] text-gray-500 flex items-center gap-1">
                      <span>{rev.location}</span>
                      <span>•</span>
                      <span className="text-[#00af87] font-semibold">{rev.badge}</span>
                    </div>
                  </div>
                </div>

                {/* Reviewed Place */}
                <div className="mt-4 p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                  <div className="truncate pr-2">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">
                      {rev.placeType}
                    </span>
                    <span className="text-xs font-bold text-gray-800 truncate block">
                      {rev.place}
                    </span>
                  </div>
                  <div className="flex text-[#00af87] gap-0.5 shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="h-2 w-2 rounded-full bg-[#00af87] inline-block" />
                    ))}
                  </div>
                </div>

                {/* Review Body */}
                <div className="mt-3">
                  <h5 className="font-bold text-sm text-gray-900 leading-snug">
                    "{rev.title}"
                  </h5>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed line-clamp-3">
                    {rev.body}
                  </p>
                </div>

                {/* Review Photo */}
                <div className="relative h-32 rounded-xl overflow-hidden mt-3 bg-gray-100">
                  <Image
                    src={rev.photo}
                    alt={rev.place}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Footer / Helpful Button */}
              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>{rev.date}</span>
                <button
                  type="button"
                  onClick={() => handleHelpful(rev.id, rev.helpfulVotes)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                    isLiked
                      ? "bg-emerald-50 text-[#00af87] border border-[#00af87]/30"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <ThumbsUp className={`h-3 w-3 ${isLiked ? "fill-current" : ""}`} />
                  <span>Helpful ({currentLikes})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
