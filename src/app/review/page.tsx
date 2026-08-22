"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PenLine,
  Search,
  CheckCircle2,
  UploadCloud,
  Star,
  MapPin,
  Sparkles,
  ShieldCheck,
  Info,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";

const RATING_LABELS: Record<number, string> = {
  1: "Terrible",
  2: "Poor",
  3: "Average",
  4: "Very Good",
  5: "Excellent",
};

export default function WriteReviewPage() {
  const [selectedPlace, setSelectedPlace] = useState("The St. Regis Bali Resort");
  const [placeQuery, setPlaceQuery] = useState("");
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [tripType, setTripType] = useState<string>("Couples");
  const [dateOfVisit, setDateOfVisit] = useState<string>("2026-08");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const tripTypes = ["Couples", "Family", "Friends", "Solo", "Business"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewTitle && reviewBody) {
      setIsSubmitted(true);
    }
  };

  const activeRatingDisplay = hoverRating || rating;

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Page Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#00af87] text-xs font-bold uppercase tracking-wider">
            <PenLine className="h-3.5 w-3.5" />
            <span>Community Contributions</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-gray-950">
            Write a Review
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-medium max-w-md mx-auto">
            Help millions of travelers make better decisions with your authentic experience and tips.
          </p>
        </div>

        {isSubmitted ? (
          /* Submission Success Card */
          <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 text-center space-y-4 shadow-lg animate-in zoom-in-95 duration-200">
            <div className="h-16 w-16 rounded-full bg-emerald-100 text-[#00af87] mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Thank you for your review!</h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Your contribution for <span className="font-bold text-gray-900">{selectedPlace}</span> has been published to our traveler community.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <Link href="/listings">
                <Button className="rounded-full bg-[#00af87] hover:bg-[#009673] text-white font-bold text-xs px-6">
                  Explore More Places
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSubmitted(false);
                  setReviewTitle("");
                  setReviewBody("");
                }}
                className="rounded-full text-xs font-bold"
              >
                Write Another Review
              </Button>
            </div>
          </div>
        ) : (
          /* Review Submission Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <form onSubmit={handleSubmit} className="lg:col-span-8 bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-xs">
              {/* Step 1: Selected Place */}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
                  1. What place are you reviewing?
                </label>
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white text-[#00af87] shadow-2xs">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{selectedPlace}</h4>
                      <span className="text-[11px] text-gray-500">Nusa Dua, Bali, Indonesia</span>
                    </div>
                  </div>
                  <span className="text-xs text-[#00af87] font-bold cursor-pointer hover:underline">
                    Change
                  </span>
                </div>
              </div>

              {/* Step 2: Rating Bubbles */}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                  2. How would you rate your experience?
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((bubble) => (
                    <button
                      key={bubble}
                      type="button"
                      onMouseEnter={() => setHoverRating(bubble)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => setRating(bubble)}
                      className="p-1 cursor-pointer transition-transform hover:scale-120 active:scale-95"
                    >
                      <div
                        className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 transition-all flex items-center justify-center ${
                          bubble <= activeRatingDisplay
                            ? "bg-[#00af87] border-[#00af87] shadow-sm"
                            : "bg-white border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <div
                          className={`h-3 w-3 rounded-full ${
                            bubble <= activeRatingDisplay ? "bg-white" : "bg-transparent"
                          }`}
                        />
                      </div>
                    </button>
                  ))}
                  <span className="ml-3 text-sm sm:text-base font-extrabold text-gray-800">
                    {RATING_LABELS[activeRatingDisplay]}
                  </span>
                </div>
              </div>

              {/* Step 3: Trip Type Chips */}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                  3. Who did you go with?
                </label>
                <div className="flex flex-wrap gap-2">
                  {tripTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTripType(type)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                        tripType === type
                          ? "bg-black text-white shadow-xs"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: When did you visit? */}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
                  4. When did you visit?
                </label>
                <input
                  type="month"
                  value={dateOfVisit}
                  onChange={(e) => setDateOfVisit(e.target.value)}
                  className="p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-semibold text-gray-800 outline-none focus:border-[#00af87]"
                />
              </div>

              {/* Step 5: Review Title & Content */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
                    5. Title of your review
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="Summarize your visit in one key headline..."
                    className="w-full p-3.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium outline-none focus:border-[#00af87]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
                    6. Your review details
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={reviewBody}
                    onChange={(e) => setReviewBody(e.target.value)}
                    placeholder="Tell other travelers about your stay: room quality, service, dining, location highlights, and insider tips..."
                    className="w-full p-3.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium outline-none focus:border-[#00af87] resize-none"
                  />
                  <div className="text-right text-[11px] text-gray-400 mt-1">
                    {reviewBody.length} characters (minimum 50 recommended)
                  </div>
                </div>
              </div>

              {/* Step 7: Photo upload preview */}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                  7. Add photos (optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 hover:border-[#00af87] rounded-2xl p-6 text-center cursor-pointer transition-colors bg-gray-50/50">
                  <UploadCloud className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-gray-700">Click to upload traveler photos</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">PNG, JPG, HEIC up to 10MB each</p>
                </div>
              </div>

              {/* Certification Checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-600 select-none pt-2">
                <input
                  type="checkbox"
                  required
                  defaultChecked
                  className="rounded text-[#00af87] accent-[#00af87] mt-0.5"
                />
                <span>
                  I certify that this review is based on my own genuine experience and that I have no personal or commercial relationship with this establishment.
                </span>
              </label>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full rounded-full bg-[#00af87] hover:bg-[#009673] text-white font-extrabold text-sm sm:text-base h-12 shadow-md transition-transform active:scale-98"
              >
                Submit Review
              </Button>
            </form>

            {/* Sidebar Guidelines */}
            <aside className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl border border-gray-200 p-6 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-[#00af87] font-bold text-sm">
                  <ShieldCheck className="h-5 w-5" />
                  <span>Review Guidelines</span>
                </div>

                <ul className="space-y-3 text-xs text-gray-600">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#00af87] shrink-0 mt-0.5" />
                    <span><strong>Be specific and factual:</strong> Share details about cleanliness, staff, and food.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#00af87] shrink-0 mt-0.5" />
                    <span><strong>Keep it helpful:</strong> What tips would you give a friend traveling there?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#00af87] shrink-0 mt-0.5" />
                    <span><strong>Family-friendly language:</strong> No hate speech, profanity, or commercial promotions.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-6 text-xs text-emerald-950 space-y-2">
                <span className="font-bold text-sm flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-[#00af87]" /> Travelers' Community
                </span>
                <p className="leading-relaxed">
                  Your review joins over 1 billion trusted traveler contributions worldwide, empowering honest travel discovery.
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
