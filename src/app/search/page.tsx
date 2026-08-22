"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { BubbleRating } from "@/components/ui/rating";
import { Button } from "@/components/ui/button";
import { Map, List, Heart, ChevronLeft, ChevronRight, Check } from "lucide-react";

// Mock Data
const MOCK_LISTINGS = [
  {
    id: "1",
    name: "Grand Hotel & Spa",
    location: "Downtown, Paris",
    rating: 4.5,
    reviews: 1284,
    price: "$299",
    amenities: ["Free Wifi", "Pool", "Spa"],
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
    sponsored: false,
  },
  {
    id: "2",
    name: "Boutique Ocean Resort",
    location: "Bali, Indonesia",
    rating: 5,
    reviews: 4520,
    price: "$450",
    amenities: ["Beachfront", "Breakfast included", "Free parking"],
    images: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
    sponsored: true,
  },
  {
    id: "3",
    name: "Urban City Hostel",
    location: "Berlin, Germany",
    rating: 3.5,
    reviews: 890,
    price: "$45",
    amenities: ["Free Wifi", "Bar", "Air conditioning"],
    images: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
    sponsored: false,
  },
];

export default function SearchResultsPage() {
  const [mapView, setMapView] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      {/* Search Header / Map Toggle */}
      <div className="bg-white border-b border-gray-200 py-4 sticky top-20 z-40">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Properties matching your search</h1>
          <Button 
            variant="outline" 
            className="rounded-full font-bold shadow-sm"
            onClick={() => setMapView(!mapView)}
          >
            {mapView ? <><List className="w-4 h-4 mr-2" /> List View</> : <><Map className="w-4 h-4 mr-2" /> Map View</>}
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex gap-8">
        {/* Left Sidebar Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          {/* Map Widget Snippet */}
          <div className="w-full h-32 bg-gray-200 rounded-xl mb-6 relative overflow-hidden cursor-pointer bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center" onClick={() => setMapView(true)}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button variant="secondary" className="bg-white text-black font-bold rounded-full">View on map</Button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-3 border-b border-gray-200 pb-2">Price</h3>
              <div className="h-2 bg-gray-200 rounded-full w-full mb-4 relative">
                <div className="absolute left-0 w-2/3 h-full bg-brand rounded-full"></div>
                <div className="w-4 h-4 bg-white border-2 border-brand rounded-full absolute -top-1 left-0 shadow-sm cursor-pointer" />
                <div className="w-4 h-4 bg-white border-2 border-brand rounded-full absolute -top-1 left-2/3 shadow-sm cursor-pointer" />
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 font-medium">
                <span>$0</span>
                <span>$500+</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 border-b border-gray-200 pb-2">Guest rating</h3>
              <div className="space-y-2">
                {[5, 4, 3].map((star) => (
                  <label key={star} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center group-hover:border-black">
                      {star === 5 && <Check className="w-3.5 h-3.5 text-black" />} {/* Checked example */}
                    </div>
                    <div className="flex-1 flex justify-between items-center text-sm">
                      <BubbleRating rating={star} size={14} />
                      <span className="text-gray-400 text-xs">{(star * 123).toString()}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 border-b border-gray-200 pb-2">Amenities</h3>
              <div className="space-y-3">
                {["Free Wifi", "Pool", "Spa", "Breakfast included", "Free parking"].map((amenity) => (
                  <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center group-hover:border-black" />
                    <span className="text-sm">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Listing View (or Split map) */}
        <main className={`flex-1 ${mapView ? 'hidden' : 'block'}`}>
          <div className="space-y-4">
            {MOCK_LISTINGS.map((listing) => (
              <div key={listing.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col md:flex-row h-full">
                  
                  {/* Image Gallery (Simplified to single for now, mapping a hover carousel later) */}
                  <div className="relative w-full md:w-72 h-64 md:h-auto bg-gray-100 flex-shrink-0">
                    <Image 
                      src={listing.images[0]} 
                      alt={listing.name} 
                      fill 
                      className="object-cover"
                    />
                    <button className="absolute top-3 right-3 bg-white/50 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition-colors">
                      <Heart className="w-5 h-5 text-black" />
                    </button>
                    {listing.sponsored && (
                      <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-1 rounded">
                        SPONSORED
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <Link href={`/detail/${listing.id}`}>
                          <h2 className="text-xl font-bold text-foreground hover:underline mr-2">{listing.name}</h2>
                        </Link>
                        <div className="flex items-center gap-2 mt-1.5 group cursor-pointer lg:w-max">
                          <BubbleRating rating={listing.rating} />
                          <span className="text-sm text-gray-500 font-medium group-hover:underline">{listing.reviews} reviews</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">{listing.location}</p>
                      </div>
                    </div>
                    
                    {/* Amenities / Description excerpt */}
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2 text-xs font-medium text-gray-600">
                        {listing.amenities.map(i => (
                          <span key={i} className="flex items-center gap-1 border border-gray-200 px-2 py-1 rounded-sm">{i}</span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-4 flex items-end justify-between border-t border-gray-100 mt-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-0.5">Top Deal</div>
                        <div className="text-2xl font-bold">{listing.price}</div>
                        <div className="text-xs text-gray-500">per night</div>
                      </div>
                      <Button className="bg-brand hover:bg-brand-dark rounded-full font-bold px-6">
                        View Deal
                      </Button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </main>
        
        {/* Placeholder for Map View Layout */}
        {mapView && (
          <div className="flex-1 bg-gray-100 rounded-xl flex items-center justify-center aspect-video min-h-[600px] border border-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://miro.medium.com/max/1400/1*qYUvh-dpT4qw3inWvS2tYA.png')] bg-cover bg-center opacity-30" />
            <div className="z-10 bg-white p-4 rounded-xl shadow-lg font-bold text-center">
              Interactive Map Widget <br />
              <span className="text-sm text-gray-500 font-normal">(Mapbox / Google Maps integration point)</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
