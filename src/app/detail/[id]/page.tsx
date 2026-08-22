import Image from "next/image";
import Link from "next/link";
import { BubbleRating } from "@/components/ui/rating";
import { Button } from "@/components/ui/button";
import { 
  MapPin, Share, Heart, Check, Wifi, 
  Car, Coffee, UserCircle2, ArrowRight
} from "lucide-react";

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  // Mock Data
  const images = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?fit=crop&w=1200&q=80", // Hero
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40eb591366?fit=crop&w=600&q=80"
  ];

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-6">
        {/* Top Header Section */}
        <div className="mb-4">
          <nav className="text-sm text-gray-500 mb-2 font-medium">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><span>›</span></li>
              <li><Link href="/search" className="hover:underline">Paris Hotels</Link></li>
              <li><span>›</span></li>
              <li className="text-foreground">Grand Hotel & Spa</li>
            </ol>
          </nav>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-black mb-2" style={{ fontFamily: 'var(--font-acworth)' }}>Grand Hotel & Spa</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-1.5 cursor-pointer hover:underline">
                  <BubbleRating rating={4.5} />
                  <span className="font-bold text-gray-700">1,284 reviews</span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center font-bold text-gray-700">
                  #4 of 1,200 hotels in Paris
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-2 font-medium cursor-pointer hover:underline">
                <MapPin className="w-4 h-4" />
                12 Rue de Rivoli, 75004 Paris, France
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-full font-bold shadow-sm hidden md:flex">
                <Share className="w-4 h-4 mr-2" /> Share
              </Button>
              <Button variant="outline" className="rounded-full font-bold shadow-sm">
                <Heart className="w-4 h-4 mr-2" /> Save
              </Button>
            </div>
          </div>
        </div>

        {/* Media Gallery (Hero + 2x2 grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 h-[450px] mb-8 rounded-xl overflow-hidden cursor-pointer">
          <div className="relative w-full h-full group">
            <Image src={images[0]} alt="Hero" fill className="object-cover group-hover:opacity-90 transition-opacity" />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <Button variant="secondary" className="bg-white/90 text-black font-bold border border-white backdrop-blur-md">
                View all 45 photos
              </Button>
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-2 grid-rows-2 gap-2 h-full">
            {images.slice(1).map((src, i) => (
              <div key={i} className="relative w-full h-full group">
                <Image src={src} alt="Gallery" fill className="object-cover group-hover:opacity-90 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Column */}
          <div className="flex-1 space-y-8">
            
            {/* About Section */}
            <section>
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed font-medium">
                Experience the epitome of luxury at the Grand Hotel & Spa. Located in the heart of Paris, this 5-star haven offers unparalleled views of the city skyline. Enjoy our world-class spa, Michelin-starred dining, and sumptuously decorated rooms embodying classic French elegance.
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* Amenities Section */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Property amenities</h2>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-gray-700 font-medium">
                <div className="flex items-center gap-3"><Wifi className="w-5 h-5 text-gray-500" /> Free High Speed Internet (WiFi)</div>
                <div className="flex items-center gap-3"><Coffee className="w-5 h-5 text-gray-500" /> Free breakfast</div>
                <div className="flex items-center gap-3"><Car className="w-5 h-5 text-gray-500" /> Free parking</div>
                <div className="flex items-center gap-3"><Check className="w-5 h-5 text-gray-500" /> Pool</div>
              </div>
              <Button variant="outline" className="mt-4 rounded-full font-bold">Show more</Button>
            </section>

            <hr className="border-gray-200" />

            {/* Location & Map Section */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Location</h2>
              {/* Fake Interactive Map Box */}
              <div className="w-full h-64 bg-gray-200 rounded-xl relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3')] bg-cover bg-center cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="p-3 bg-white rounded-full shadow-lg">
                      <MapPin className="text-brand w-6 h-6" fill="#053a1a" color="white" />
                   </div>
                </div>
              </div>
              <p className="mt-3 text-sm font-medium text-gray-600">12 Rue de Rivoli, 75004 Paris France</p>
            </section>

            <hr className="border-gray-200" />

            {/* Reviews Section */}
            <section id="reviews">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Reviews</h2>
                <Link href="/user-review">
                  <Button className="bg-black hover:bg-gray-800 text-white rounded-full font-bold">
                    Write a review
                  </Button>
                </Link>
              </div>

              {/* Review Highlights & Breakdown */}
              <div className="flex gap-12 mb-8 items-start">
                <div className="text-center">
                  <div className="text-5xl font-black mb-2">4.5</div>
                  <BubbleRating rating={4.5} size={20} />
                  <div className="text-xs text-gray-500 font-medium mt-1">1,284 reviews</div>
                </div>
                
                <div className="flex-1 max-w-sm space-y-2">
                  {[
                    { label: "Excellent", count: 850, percent: "70%" },
                    { label: "Very good", count: 250, percent: "25%" },
                    { label: "Average", count: 100, percent: "4%" },
                    { label: "Poor", count: 50, percent: "1%" },
                    { label: "Terrible", count: 34, percent: "0%" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-3 text-sm font-medium text-gray-600 cursor-pointer hover:underline group">
                      <span className="w-16 whitespace-nowrap">{row.label}</span>
                      <div className="flex-1 h-3 bg-gray-200 rounded-sm overflow-hidden">
                        <div className="h-full bg-brand" style={{ width: row.percent }} />
                      </div>
                      <span className="w-8 text-right group-hover:text-black">{row.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mock Review List */}
              <div className="space-y-6">
                {[
                  { name: "Sarah M.", date: "Aug 2026", text: "Amazing views and perfect location. The breakfast was exquisite and the staff were incredibly helpful. Will definitely be returning!", title: "Incredible stay in Paris!" },
                  { name: "John D.", date: "Jul 2026", text: "Very luxurious, but you pay a premium for it. The rooms are a bit small by American standards, but the decor makes up for it. Highly recommend checking out the spa.", title: "Luxury at a premium" }
                ].map((r, idx) => (
                  <div key={idx} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <UserCircle2 className="w-10 h-10 text-gray-400" />
                      <div>
                        <div className="font-bold text-sm">{r.name}</div>
                        <div className="text-xs text-gray-500 font-medium">wrote a review {r.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center mb-2">
                      <BubbleRating rating={5} />
                    </div>
                    <h4 className="font-bold text-lg mb-1">{r.title}</h4>
                    <p className="text-gray-700">{r.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sticky Sidebar (Booking Widget) */}
          <aside className="w-full lg:w-[340px] flex-shrink-0">
            <div className="sticky top-24 bg-white border border-gray-200 rounded-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <div className="flex justify-between items-end mb-4">
                <div className="text-3xl font-black">$299</div>
                <div className="text-gray-500 font-medium">/ night</div>
              </div>
              
              {/* Date/Guest Selection Mock */}
              <div className="border border-gray-300 rounded-lg mb-4 text-sm font-medium">
                <div className="grid grid-cols-2 border-b border-gray-300">
                  <div className="p-3 border-r border-gray-300">
                    <div className="text-xs text-gray-500 uppercase font-bold">Check In</div>
                    10/12/26
                  </div>
                  <div className="p-3">
                    <div className="text-xs text-gray-500 uppercase font-bold">Check Out</div>
                    10/15/26
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-xs text-gray-500 uppercase font-bold">Guests</div>
                  2 adults, 0 children
                </div>
              </div>

              {/* OTA Rates */}
              <div className="space-y-3 mb-6">
                {[
                  { name: "Booking.com", price: "$299" },
                  { name: "Expedia", price: "$310" },
                  { name: "Hotels.com", price: "$310" }
                ].map((ota, i) => (
                  <div key={ota.name} className="flex items-center justify-between py-1 group cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded">
                    <div className="flex items-center gap-2 font-bold text-[15px]">
                      {i === 0 && <span className="bg-brand w-1 h-4 rounded" />}
                      <span className={i === 0 ? "text-brand" : "text-gray-700"}>{ota.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="font-bold text-lg">{ota.price}</span>
                       <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full h-12 bg-brand hover:bg-brand-dark text-white rounded-full font-bold text-base shadow-sm">
                View deal
              </Button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
