"use client";

import { useState } from "react";
import { Search, Home, Utensils, Map, Plane, Ticket, Bed } from "lucide-react";
import { Button } from "../ui/button";

const TABS = [
  { id: "all", label: "Search All", icon: Home },
  { id: "hotels", label: "Hotels", icon: Bed },
  { id: "things-to-do", label: "Things to Do", icon: Ticket },
  { id: "restaurants", label: "Restaurants", icon: Utensils },
  { id: "flights", label: "Flights", icon: Plane },
  { id: "holiday-homes", label: "Holiday Homes", icon: Home },
];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <section className="w-full pt-12 pb-16 px-4 md:px-8 mx-auto max-w-7xl">
      <div className="flex flex-col items-center justify-center space-y-8">
        <h1 className="text-[3.5rem] md:text-[5rem] font-black tracking-tight text-center leading-none">
          Where to?
        </h1>

        {/* Tab Navigation */}
        <div className="w-full max-w-4xl">
          <div className="flex overflow-x-auto no-scrollbar justify-start md:justify-center gap-2 pb-2">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium text-[15px] whitespace-nowrap transition-colors ${
                    isActive 
                      ? "bg-black text-white hover:bg-gray-800" 
                      : "bg-white text-foreground hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input Area */}
          <div className="mt-4 relative bg-white rounded-full shadow-lg border border-gray-200 md:h-[72px] h-16 flex items-center p-2">
            <div className="flex-1 flex items-center px-4">
              <Search className="h-6 w-6 text-gray-500 mr-3" />
              <input
                type="text"
                placeholder={
                  activeTab === "all" ? "Places to go, things to do, hotels..." :
                  activeTab === "hotels" ? "Hotel name or destination" :
                  activeTab === "restaurants" ? "Restaurant or destination" :
                  "Search..."
                }
                className="w-full bg-transparent border-none outline-none text-lg text-foreground placeholder:text-gray-500 font-medium"
              />
            </div>
            <Button className="rounded-full bg-brand hover:bg-brand-dark text-white font-bold h-full px-8 text-lg hidden md:flex transition-colors">
              Search
            </Button>
          </div>
          <Button className="w-full mt-4 rounded-full bg-brand hover:bg-brand-dark text-white font-bold h-14 text-lg md:hidden transition-colors">
            Search
          </Button>
        </div>
      </div>
    </section>
  );
}
