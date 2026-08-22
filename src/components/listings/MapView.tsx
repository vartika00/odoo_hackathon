"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader, OverlayView } from "@react-google-maps/api";
import { PlaceListing } from "@/app/api/places/route";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function MapView({ listings }: { listings: PlaceListing[] }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<PlaceListing | null>(null);

  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      setMap(map);
      
      if (listings.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        listings.forEach((spot) => {
          bounds.extend(new window.google.maps.LatLng(spot.lat, spot.lng));
        });
        map.fitBounds(bounds);
        // Apply some padding or max zoom if needed
        const listener = window.google.maps.event.addListener(map, "idle", () => {
          if (map.getZoom()! > 15) map.setZoom(15);
          window.google.maps.event.removeListener(listener);
        });
      }
    },
    [listings]
  );

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  // Update bounds if listings change
  useEffect(() => {
    if (map && listings.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      listings.forEach((spot) => {
        bounds.extend(new window.google.maps.LatLng(spot.lat, spot.lng));
      });
      map.fitBounds(bounds);
    }
  }, [listings, map]);

  if (loadError) {
    return (
      <div className="w-full h-80 sm:h-96 rounded-3xl bg-red-50 flex items-center justify-center border border-red-200">
        <span className="text-red-500 font-bold">Error loading Google Maps. Invalid API key?</span>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-80 sm:h-96 rounded-3xl bg-[#e6e2dc] animate-pulse flex items-center justify-center border border-gray-300">
        <span className="text-gray-500 font-bold">Loading Map...</span>
      </div>
    );
  }

  // Fallback center to Paris if no listings exist
  const center = listings.length > 0
    ? { lat: listings[0].lat, lng: listings[0].lng }
    : { lat: 48.8566, lng: 2.3522 };

  return (
    <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden border border-gray-300 shadow-inner relative z-0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        {listings.map((spot) => (
          <OverlayView
            key={spot.id}
            position={{ lat: spot.lat, lng: spot.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="relative group -translate-x-1/2 -translate-y-1/2">
              <div 
                onClick={() => setSelectedSpot(spot)}
                className="cursor-pointer bg-[#053a1a] text-white px-2 py-1 rounded-full font-black text-[11px] shadow-[0_4px_6px_-1px_rgb(0_0_0/0.2)] border-2 border-white whitespace-nowrap hover:scale-110 transition-transform origin-bottom"
              >
                ${spot.priceMin}
              </div>

              {/* Popup on Hover or Click */}
              {(selectedSpot?.id === spot.id) && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-white rounded-xl shadow-2xl p-3 w-48 z-50 animate-in fade-in zoom-in duration-200">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedSpot(null); }}
                    className="absolute top-2 right-2 text-gray-400 hover:text-black font-bold text-xs"
                  >
                    ×
                  </button>
                  <div className="font-bold text-gray-900 text-sm mb-1 truncate pr-4">{spot.name}</div>
                  <div className="text-xs text-gray-600 mb-2">★ {spot.rating} ({spot.reviewsCount})</div>
                  <div className="text-[#053a1a] font-black">${spot.priceMin} <span className="text-gray-500 font-normal text-[10px]">/ night</span></div>
                </div>
              )}
            </div>
          </OverlayView>
        ))}
      </GoogleMap>
    </div>
  );
}
