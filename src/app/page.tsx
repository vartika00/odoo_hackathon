import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { DestinationCarousel } from "@/components/home/DestinationCarousel";
import { MapNavigator } from "@/components/home/MapNavigator";
import { FeaturedExperiences } from "@/components/home/FeaturedExperiences";
import { TravelersChoiceBanner } from "@/components/home/TravelersChoiceBanner";
import { RecentReviews } from "@/components/home/RecentReviews";

const MOCK_TOP_DESTINATIONS = [
  {
    id: "1",
    name: "Bali, Indonesia",
    tagline: "Tropical beaches, volcanic temples & wellness retreats",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.95,
    reviewsCount: 3200,
    category: "Tropical Paradise",
  },
  {
    id: "2",
    name: "Tokyo, Japan",
    tagline: "Neon-lit skylines, historic shrines & Michelin dining",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.92,
    reviewsCount: 4500,
    category: "Culture & Tech",
  },
  {
    id: "3",
    name: "Paris, France",
    tagline: "Art galleries, iconic landmarks & world-class cafes",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.88,
    reviewsCount: 5100,
    category: "Romantic Escape",
  },
  {
    id: "4",
    name: "New York City, USA",
    tagline: "Broadway shows, skyline viewpoints & culinary hotspots",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.86,
    reviewsCount: 6200,
    category: "Iconic City",
  },
  {
    id: "5",
    name: "London, UK",
    tagline: "Royal palaces, West End theatre & historic museums",
    image: "https://images.unsplash.com/photo-1513635269975-59693e2d09aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.87,
    reviewsCount: 4800,
    category: "Historic Hub",
  },
  {
    id: "6",
    name: "Rome, Italy",
    tagline: "Ancient wonders, Renaissance art & authentic trattorias",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.91,
    reviewsCount: 5300,
    category: "Ancient Wonders",
  },
];

const MOCK_TRENDING_SUMMER = [
  {
    id: "t1",
    name: "Maldives",
    tagline: "Overwater bungalows & crystalline coral reefs",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.98,
    reviewsCount: 2900,
    category: "Luxury Island",
  },
  {
    id: "t2",
    name: "Kyoto, Japan",
    tagline: "Bamboo groves, Zen gardens & traditional tea houses",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.94,
    reviewsCount: 3800,
    category: "Serene Heritage",
  },
  {
    id: "t3",
    name: "Barcelona, Spain",
    tagline: "Gaudí architecture, tapas bars & Mediterranean breeze",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77ef244?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.89,
    reviewsCount: 4100,
    category: "Coastal Culture",
  },
  {
    id: "t4",
    name: "Santorini, Greece",
    tagline: "Whitewashed cliffs, sapphire seas & sunset vistas",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.96,
    reviewsCount: 3600,
    category: "Aegean Dream",
  },
  {
    id: "t5",
    name: "Dubai, UAE",
    tagline: "Futuristic skyscrapers, desert safaris & mega malls",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.84,
    reviewsCount: 4700,
    category: "Modern Luxury",
  },
];

export default function Home() {
  return (
    <main className="flex-1 bg-background overflow-x-hidden">
      {/* Hero Landing Section with Vintage World Map Background & Hotspot Beacons */}
      <HeroSection />

      {/* Quick Category Grid */}
      <CategoryGrid />

      {/* Top Destinations Carousel with Soft Background */}
      <div className="bg-[#f8f9fa] border-y border-gray-200/70 my-6 sm:my-8">
        <DestinationCarousel
          title="Top destinations for your next holiday"
          subtitle="Hand-picked trending getaways loved by travelers worldwide"
          destinations={MOCK_TOP_DESTINATIONS}
        />
      </div>

      {/* Multi-Destination Map Navigator Expedition Planner */}
      <MapNavigator />

      {/* Featured Experiences / Ways to Tour */}
      <FeaturedExperiences />

      {/* Travelers' Choice 2026 Awards Banner */}
      <TravelersChoiceBanner />

      {/* Trending Travel Carousel */}
      <div className="my-6 sm:my-8">
        <DestinationCarousel
          title="Trending in Travel for 2026"
          subtitle="Fastest-growing destinations with rave traveler ratings"
          destinations={MOCK_TRENDING_SUMMER}
        />
      </div>

      {/* Community Reviews & Highlights */}
      <div className="bg-[#f8f9fa] border-t border-gray-200/70">
        <RecentReviews />
      </div>
    </main>
  );
}
