import { NextRequest, NextResponse } from "next/server";

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
  priceMin: number;
  priceOriginal: number;
  starRating: number;
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

// Fetch real OpenStreetMap Nominatim geo places
async function fetchNominatimLatLon(query: string) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
    const res = await fetch(url, {
      headers: { "User-Agent": "TripAdvisorClone/1.0 (contact: info@tripadvisorclone.com)" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        displayName: data[0].display_name,
        name: data[0].name
      };
    }
  } catch (err) {
    console.error("Nominatim error:", err);
  }
  return null;
}

// Fetch real points of interest from Overpass API
async function fetchOverpassPOIs(lat: number, lon: number, cityName: string): Promise<PlaceListing[]> {
  const query = `
    [out:json];
    (
      node["tourism"="hotel"](around:15000, ${lat}, ${lon});
      node["amenity"="restaurant"](around:15000, ${lat}, ${lon});
      node["tourism"="attraction"](around:15000, ${lat}, ${lon});
      node["tourism"="museum"](around:15000, ${lat}, ${lon});
    );
    out 30;
  `;

  try {
    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "TripAdvisorClone/1.0"
      },
      body: `data=${encodeURIComponent(query)}`,
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    if (!data.elements) return [];

    const results: PlaceListing[] = [];
    let hCount = 0;
    let rCount = 0;
    let aCount = 0;

    for (const node of data.elements) {
      if (!node.tags || (!node.tags["name:en"] && !node.tags.name)) continue;

      const name = node.tags["name:en"] || node.tags.name;
      let type: PlaceListing["type"] = "ATTRACTION";
      let basePrice = 50;
      let amenities = ["Free WiFi"];

      if (node.tags.tourism === "hotel") {
        type = "HOTEL";
        basePrice = 120 + (Math.random() * 200);
        amenities = ["Free WiFi", "Air Conditioning", "Free Breakfast"];
        hCount++;
        if (hCount > 5) continue;
      } else if (node.tags.amenity === "restaurant") {
        type = "RESTAURANT";
        basePrice = 30 + (Math.random() * 80);
        amenities = ["Outdoor Seating", "Vegetarian Friendly"];
        rCount++;
        if (rCount > 5) continue;
      } else {
        type = "ATTRACTION";
        basePrice = 15 + (Math.random() * 40);
        amenities = ["Skip The Line", "Guided Tour"];
        aCount++;
        if (aCount > 5) continue;
      }

      const images = CATEGORY_DEFAULT_IMAGES[type];
      const randomImg = images[Math.floor(Math.random() * images.length)];

      results.push({
        id: `osm-${node.id}`,
        type,
        name,
        location: `${name}, ${cityName}`,
        city: cityName,
        country: "Global",
        description: `Experience the real ${name} in ${cityName}. Enjoy highly-rated hospitality, verified location data, and exclusive deals.`,
        image: randomImg,
        images: [randomImg],
        rating: Number((4.0 + Math.random() * 1.0).toFixed(1)),
        reviewsCount: Math.floor(Math.random() * 2000) + 100,
        rankText: `#${Math.floor(Math.random() * 15) + 1} Best in ${cityName}`,
        priceMin: Math.round(basePrice),
        priceOriginal: Math.round(basePrice * 1.2),
        starRating: parseInt(node.tags.stars || "4"),
        lat: node.lat,
        lng: node.lon,
        badge: Math.random() > 0.8 ? "Bestseller" : undefined,
        amenities,
        otas: [
          { name: "Tripadvisor Direct", price: Math.round(basePrice), isLowest: true },
          { name: "Booking.com", price: Math.round(basePrice + 15) },
        ],
      });
    }

    return results;
  } catch (err) {
    console.error("Overpass error:", err);
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

    // 2. Fetch REAL Places from Overpass API dynamically
    if (query && results.length < 5) {
      const geoInfo = await fetchNominatimLatLon(query);
      if (geoInfo) {
        const cityName = geoInfo.name;
        const overpassPlaces = await fetchOverpassPOIs(geoInfo.lat, geoInfo.lon, cityName);
        results = [...results, ...overpassPlaces];
      }
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
    source: "Real Overpass API & Nominatim Data",
    data: finalData,
  });
}
