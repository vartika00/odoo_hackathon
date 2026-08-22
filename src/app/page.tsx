import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { DestinationCarousel } from "@/components/home/DestinationCarousel";

const MOCK_DESTINATIONS = [
  { id: "1", name: "Bali", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: "2", name: "Tokyo", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: "3", name: "Paris", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: "4", name: "New York", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: "5", name: "London", image: "https://images.unsplash.com/photo-1513635269975-59693e2d09aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
];

const MOCK_TRENDING = [
  { id: "1", name: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: "2", name: "Rome", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: "3", name: "Kyoto", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: "4", name: "Barcelona", image: "https://images.unsplash.com/photo-1583422409516-2895a77ef244?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <HeroSection />
        
        <div className="bg-muted py-8 mt-8">
          <DestinationCarousel 
            title="Top destinations for your next holiday" 
            destinations={MOCK_DESTINATIONS} 
          />
        </div>
        
        <div className="py-8">
          <DestinationCarousel 
            title="Trending in Travel" 
            destinations={MOCK_TRENDING} 
          />
        </div>
      </main>
    </>
  );
}
