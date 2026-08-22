"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Check, ImagePlus } from "lucide-react";

export default function WriteReviewPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [tripType, setTripType] = useState("");

  const tripTypes = ["Business", "Couples", "Family", "Friends", "Solo"];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Strict White Header for Auth/Forms */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center max-w-4xl">
          <Link href="/" className="flex items-center gap-2">
           <div className="bg-brand text-white rounded-full p-1.5 flex items-center justify-center h-8 w-8">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
            <span className="font-black text-xl text-foreground hidden sm:block">Tripadvisor</span>
          </Link>
          <span className="font-bold text-gray-500">Write a review</span>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 max-w-2xl flex-1">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10">
          
          <div className="mb-8 border-b border-gray-200 pb-6">
             <h1 className="text-2xl font-black mb-1">Tell us, how was your visit?</h1>
             <p className="text-gray-500 font-medium">Grand Hotel & Spa • Paris, France</p>
          </div>

          <form className="space-y-10" onSubmit={e => e.preventDefault()}>
            
            {/* Rating */}
            <section>
              <h2 className="text-lg font-bold mb-4">How would you rate your experience?</h2>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    className="cursor-pointer transition-transform hover:scale-110" 
                    width="42" 
                    height="42" 
                    viewBox="0 0 24 24" 
                    fill={(hoverRating || rating) >= star ? "#053a1a" : "none"}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle 
                      cx="12" cy="12" r="10" 
                      stroke={(hoverRating || rating) >= star ? "#053a1a" : "#E0E0E0"} 
                      strokeWidth="2" 
                    />
                  </svg>
                ))}
              </div>
            </section>

            {/* When did you go */}
            <section>
              <h2 className="text-lg font-bold mb-4">When did you go?</h2>
              <select defaultValue="" className="w-full md:w-1/2 h-12 px-4 border border-gray-300 rounded-lg outline-none focus:border-brand font-medium">
                <option value="" disabled>Select a month and year</option>
                <option>August 2026</option>
                <option>July 2026</option>
                <option>June 2026</option>
              </select>
            </section>

            {/* Trip Type */}
            <section>
              <h2 className="text-lg font-bold mb-4">Who did you go with?</h2>
              <div className="flex flex-wrap gap-3">
                {tripTypes.map(type => (
                  <Button
                    key={type}
                    type="button"
                    variant="outline"
                    className={`rounded-full h-11 px-6 font-bold border-2 transition-all ${
                      tripType === type 
                        ? "border-black bg-black text-white hover:bg-gray-800"
                        : "border-gray-200 text-gray-600 hover:border-black"
                    }`}
                    onClick={() => setTripType(type)}
                  >
                    {tripType === type && <Check className="w-4 h-4 mr-2" />}
                    {type}
                  </Button>
                ))}
              </div>
            </section>

            {/* Review text */}
            <section>
              <h2 className="text-lg font-bold mb-4">Write your review</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Title of your review</label>
                  <input 
                    type="text" 
                    placeholder="Summarize your visit or highlight an interesting detail"
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg outline-none focus:border-black font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Your review</label>
                  <textarea 
                    rows={6}
                    placeholder="Tell people about your experience: your room, location, amenities?"
                    className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-black font-medium resize-y"
                  ></textarea>
                </div>
              </div>
            </section>

            {/* Photo Upload */}
            <section>
              <h2 className="text-lg font-bold mb-4">Add some photos</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="bg-brand/10 p-4 rounded-full mb-4">
                  <ImagePlus className="w-8 h-8 text-brand" />
                </div>
                <h3 className="font-bold text-lg mb-1">Click to add photos</h3>
                <p className="text-gray-500 font-medium text-sm">Or drag and drop them here</p>
              </div>
            </section>

            <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
               <Link href="/detail/1" className="font-bold text-gray-600 hover:underline">Cancel</Link>
               <Button className="rounded-full bg-black hover:bg-gray-800 text-white font-bold h-12 text-lg px-8">
                 Submit review
               </Button>
            </div>
          </form>

        </div>
      </main>
    </div>
  );
}
