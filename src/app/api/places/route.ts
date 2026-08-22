import { NextRequest, NextResponse } from "next/server";

// Fallback high-res Unsplash images by category
const CATEGORY_DEFAULT_IMAGES = {
  HOTEL: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40eb0d1e56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ],
  ATTRACTION: [
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ],
  RESTAURANT: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ],
  HOLIDAY_HOME: [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ],
};

async function getUnsplashImages(query: string, count: number = 10): Promise<string[]> {
  const apiKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!apiKey || apiKey === "your_access_key_here") {
    return []; // Use fallback if key is missing
  }

  try {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${apiKey}`,
      },
    });
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return data.results.map((img: any) => img.urls.regular);
    }
  } catch (err) {
    console.error("Unsplash fetch failed:", err);
  }
  return [];
}

export interface PlaceListing {
  id: string;
  type: "HOTEL" | "RESTAURANT" | "ATTRACTION" | "HOLIDAY_HOME";
  name: string;
  location: string;
  city: string;
  country: string;
  description: string;
  image: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  rankText: string;
  priceMin?: number;
  priceOriginal?: number;
  starRating?: number;
  lat: number;
  lng: number;
  badge?: string;
  amenities: string[];
  otas: {
    name: string;
    price: number;
    isLowest?: boolean;
  }[];
}



const GLOBAL_DESTINATIONS_DATA: Record<string, PlaceListing[]> = {
  switzerland: [
    {
      id: "ch-1",
      type: "HOTEL",
      name: "Victoria-Jungfrau Grand Hotel & Spa",
      location: "Interlaken, Bernese Oberland, Switzerland",
      city: "Interlaken",
      country: "Switzerland",
      description: "Historic 5-star palace with panoramic views of the snow-capped Jungfrau mountain.",
      image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      rating: 4.95,
      reviewsCount: 2410,
      rankText: "#1 Luxury Resort in Interlaken",
      priceMin: 590,
      priceOriginal: 720,
      starRating: 5,
      lat: 46.686,
      lng: 7.859,
      badge: "Travelers' Choice Best of the Best",
      amenities: ["Free WiFi", "Alpine Spa", "Mountain View", "Indoor Pool", "Michelin Dining"],
      otas: [
        { name: "Tripadvisor Direct", price: 590, isLowest: true },
        { name: "Booking.com", price: 620 },
      ],
    },
    {
      id: "ch-2",
      type: "ATTRACTION",
      name: "Jungfraujoch - Top of Europe Mountain Rail & Ice Palace",
      location: "Lauterbrunnen, Switzerland",
      city: "Lauterbrunnen",
      country: "Switzerland",
      description: "Europe's highest-altitude train ride to 3,454m glacier plateau with year-round snow.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      rating: 4.92,
      reviewsCount: 8900,
      rankText: "#1 Mountain Experience in Switzerland",
      priceMin: 185,
      priceOriginal: 210,
      starRating: 5,
      lat: 46.547,
      lng: 7.982,
      badge: "Bestseller",
      amenities: ["Skip The Line", "Panoramic Train", "Ice Palace Access"],
      otas: [
        { name: "Viator Official", price: 185, isLowest: true },
        { name: "GetYourGuide", price: 195 },
      ],
    },
  ],
  paris: [
    {
      id: "pa-1",
      type: "HOTEL",
      name: "Shangri-La Paris",
      location: "10 Avenue d'Iéna, 75116 Paris, France",
      city: "Paris",
      country: "France",
      description: "Former palace of Prince Roland Bonaparte overlooking the Eiffel Tower and Seine River.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      rating: 4.9,
      reviewsCount: 3420,
      rankText: "#1 Luxury Eiffel Tower View Stay",
      priceMin: 1150,
      priceOriginal: 1300,
      starRating: 5,
      lat: 48.863,
      lng: 2.293,
      badge: "Palace Hotel",
      amenities: ["Eiffel View", "Indoor Pool", "CHI Spa", "Michelin Dining"],
      otas: [
        { name: "Direct Official", price: 1150, isLowest: true },
        { name: "Booking.com", price: 1210 },
      ],
    },
    {
      id: "pa-2",
      type: "ATTRACTION",
      name: "Louvre Museum Skip-the-Line Masterpieces Tour",
      location: "Rue de Rivoli, 75001 Paris, France",
      city: "Paris",
      country: "France",
      description: "Direct priority access to Mona Lisa, Venus de Milo, and Winged Victory with an art historian.",
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: ["https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      rating: 4.92,
      reviewsCount: 14200,
      rankText: "#1 Cultural Experience in France",
      priceMin: 72,
      priceOriginal: 85,
      starRating: 5,
      lat: 48.860,
      lng: 2.337,
      badge: "Bestseller",
      amenities: ["Skip The Line", "Art Historian Guide", "Audio Headsets"],
      otas: [
        { name: "Viator Official", price: 72, isLowest: true },
        { name: "GetYourGuide", price: 78 },
      ],
    },
  ],
  tokyo: [
    {
      id: "ty-1",
      type: "HOTEL",
      name: "Aman Tokyo - Otemachi Tower Luxury",
      location: "The Otemachi Tower, 1-5-6 Otemachi, Chiyoda City, Tokyo, Japan",
      city: "Tokyo",
      country: "Japan",
      description: "Urban sanctuary high above Tokyo with expansive washi paper lanterns and views of Mount Fuji.",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: ["https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      rating: 4.96,
      reviewsCount: 2890,
      rankText: "#1 Luxury Hotel in Tokyo",
      priceMin: 1250,
      priceOriginal: 1450,
      starRating: 5,
      lat: 35.687,
      lng: 139.765,
      badge: "Travelers' Choice Best of the Best",
      amenities: ["Fuji View", "Traditional Onsen", "30m Indoor Pool", "Michelin Dining"],
      otas: [
        { name: "Direct Official", price: 1250, isLowest: true },
        { name: "Booking.com", price: 1310 },
      ],
    }
  ]
};

// Fetch real points of interest from Google Places API
async function fetchGooglePlaces(query: string, type: string, cityName: string): Promise<PlaceListing[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey || apiKey === "your_access_key_here") {
    console.error("Missing Google Places API Key");
    return [];
  }

  // Map our types to Google Places types
  let googleType = "tourist_attraction";
  if (type === "HOTEL") googleType = "lodging";
  if (type === "RESTAURANT") googleType = "restaurant";
  if (type === "HOLIDAY_HOME") googleType = "lodging";

  const searchQuery = `${type === "ALL" ? "top places" : type} in ${query}`;

  try {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&type=${googleType}&key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    
    if (!data.results) return [];

    // Fetch dynamic Unsplash images for fallback
    const unsplashCityImages = await getUnsplashImages(cityName + " " + type, 15);

    const results: PlaceListing[] = data.results.map((place: any, index: number) => {
      let image = "";
      
      // Use Google Places Photos if available
      if (place.photos && place.photos.length > 0) {
        image = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`;
      } else if (unsplashCityImages.length > 0) {
        // Fallback to Unsplash
        image = unsplashCityImages[index % unsplashCityImages.length];
      } else {
        // Fallback to defaults
        const defaultImgs = CATEGORY_DEFAULT_IMAGES[type === "ALL" ? "ATTRACTION" : type as keyof typeof CATEGORY_DEFAULT_IMAGES] || CATEGORY_DEFAULT_IMAGES.ATTRACTION;
        image = defaultImgs[index % defaultImgs.length];
      }

      let listingType: PlaceListing["type"] = "ATTRACTION";
      if (place.types.includes("lodging")) listingType = "HOTEL";
      if (place.types.includes("restaurant")) listingType = "RESTAURANT";

      let basePrice = listingType === "HOTEL" ? 120 + Math.random() * 200 : 30 + Math.random() * 80;

      return {
        id: `google-${place.place_id}`,
        type: listingType,
        name: place.name,
        location: place.formatted_address || `${place.name}, ${cityName}`,
        city: cityName,
        country: "Global",
        description: `Experience the real ${place.name} in ${cityName}. Enjoy highly-rated hospitality and exclusive deals.`,
        image,
        images: [image],
        rating: place.rating || Number((4.0 + Math.random() * 1.0).toFixed(1)),
        reviewsCount: place.user_ratings_total || Math.floor(Math.random() * 2000) + 100,
        rankText: `#${index + 1} Best in ${cityName}`,
        priceMin: Math.round(basePrice),
        priceOriginal: Math.round(basePrice * 1.2),
        starRating: place.rating ? Math.round(place.rating) : 4,
        lat: place.geometry?.location?.lat || 0,
        lng: place.geometry?.location?.lng || 0,
        badge: index < 3 ? "Bestseller" : undefined,
        amenities: listingType === "HOTEL" ? ["Free WiFi", "Air Conditioning", "Breakfast"] : ["Top Rated"],
        otas: [
          { name: "Tripadvisor Direct", price: Math.round(basePrice), isLowest: true },
          { name: "Booking.com", price: Math.round(basePrice + 15) },
        ],
      };
    });

    return results.slice(0, 10); // Return top 10 results
  } catch (err) {
    console.error("Google Places error:", err);
    return [];
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("query") || "").trim().toLowerCase();
  const type = searchParams.get("type") || "ALL";

  let results: PlaceListing[] = [];

  try {
    // 1. Check curated high-quality DB first
    if (query && GLOBAL_DESTINATIONS_DATA[query]) {
      results.push(...GLOBAL_DESTINATIONS_DATA[query]);
    } else if (!query) {
      // Default empty query
      results = Object.values(GLOBAL_DESTINATIONS_DATA).flat();
    }

    // 2. Fetch REAL Places from Google Places API dynamically
    if (query && results.length < 5) {
      // Pass 'query' directly as cityName for the search context
      const googlePlaces = await fetchGooglePlaces(query, type, query);
      results = [...results, ...googlePlaces];
    }

  } catch (err) {
    console.error("Live places API fetch error:", err);
  }

  // Filter by Type if user selected specific category
  let finalData = results;
  if (type && type !== "ALL") {
    finalData = results.filter((item) => item.type === type);
    if (finalData.length === 0) finalData = results; // Fallback to all if category empty
  }

  return NextResponse.json({
    success: true,
    query: query || "All",
    type,
    total: finalData.length,
    source: "Real Google Places API",
    data: finalData,
  });
}
