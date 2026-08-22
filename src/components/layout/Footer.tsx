"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Globe,
  ChevronDown,
  Smartphone,
  ShieldCheck,
  Award,
  Heart,
  Sparkles,
  Plane,
  Bed,
  Utensils,
  MapPin,
  Compass,
  ArrowRight
} from "lucide-react";

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [currency, setCurrency] = useState("USD ($)");
  const [language, setLanguage] = useState("United States (English)");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const directorySections = [
    {
      title: "Popular Destinations",
      links: [
        { label: "Bali Hotels & Villas", href: "/listings?query=Bali" },
        { label: "Paris Attractions & Eiffel Tours", href: "/listings?query=Paris" },
        { label: "Tokyo Sushi & Shrines", href: "/listings?query=Tokyo" },
        { label: "Rome Colosseum Stays", href: "/listings?query=Rome" },
        { label: "New York City Broadway", href: "/listings?query=New York" },
        { label: "London Historic Hotels", href: "/listings?query=London" },
        { label: "Maldives Overwater Bungalows", href: "/listings?query=Maldives" },
        { label: "Santorini Sunset Suites", href: "/listings?query=Santorini" },
        { label: "Kyoto Heritage Inns", href: "/listings?query=Kyoto" },
        { label: "Dubai Luxury Stays", href: "/listings?query=Dubai" },
      ],
    },
    {
      title: "Things to Do & Tours",
      links: [
        { label: "Louvre Museum VIP Guided Tours", href: "/listings?type=ATTRACTION&query=Louvre" },
        { label: "Mount Fuji Day Trip from Tokyo", href: "/listings?type=ATTRACTION&query=Fuji" },
        { label: "Nusa Penida Snorkeling Expeditions", href: "/listings?type=ATTRACTION&query=Nusa Penida" },
        { label: "Vatican Museums & Sistine Chapel", href: "/listings?type=ATTRACTION&query=Vatican" },
        { label: "Grand Canyon Helicopter Flights", href: "/listings?type=ATTRACTION&query=Grand Canyon" },
        { label: "Statue of Liberty Sunset Cruise", href: "/listings?type=ATTRACTION&query=New York" },
        { label: "Amalfi Coast Speedboat Tour", href: "/listings?type=ATTRACTION&query=Amalfi" },
        { label: "Kyoto Bamboo Forest Walk", href: "/listings?type=ATTRACTION&query=Kyoto" },
      ],
    },
    {
      title: "Top Restaurant Cuisines",
      links: [
        { label: "Michelin 3-Star Paris Dining", href: "/listings?type=RESTAURANT&query=Paris" },
        { label: "Tokyo Omakase & Wagyu", href: "/listings?type=RESTAURANT&query=Tokyo" },
        { label: "Authentic Roman Trattorias", href: "/listings?type=RESTAURANT&query=Rome" },
        { label: "Balinese Beachfront Seafood", href: "/listings?type=RESTAURANT&query=Bali" },
        { label: "New York Rooftop Dining", href: "/listings?type=RESTAURANT&query=New York" },
        { label: "Spanish Tapas Bars Barcelona", href: "/listings?type=RESTAURANT&query=Barcelona" },
        { label: "London High Tea & Gastropubs", href: "/listings?type=RESTAURANT&query=London" },
      ],
    },
    {
      title: "About Tripadvisor",
      links: [
        { label: "About Us & History", href: "#" },
        { label: "Press & Media Center", href: "#" },
        { label: "Trust & Safety Guidelines", href: "#" },
        { label: "Careers at Tripadvisor", href: "#" },
        { label: "Investor Relations", href: "#" },
        { label: "Contact Customer Support", href: "#" },
        { label: "Accessibility Statement", href: "#" },
        { label: "Site Map Directory", href: "#" },
      ],
    },
    {
      title: "Do Business With Us",
      links: [
        { label: "Claim & Manage Your Business", href: "#" },
        { label: "Hotel & Resort Solutions", href: "#" },
        { label: "Restaurant Management Portal", href: "#" },
        { label: "Sponsored Placements & Ads", href: "#" },
        { label: "Affiliate Partner Program", href: "#" },
        { label: "Write a Business Response", href: "#" },
      ],
    },
  ];

  const tripadvisorSites = [
    { name: "Viator", desc: "Book 300,000+ travel tours & activities worldwide" },
    { name: "TheFork", desc: "Reserve tables at 60,000+ top restaurants" },
    { name: "Holiday Lettings", desc: "Private villas, apartments & beach chalets" },
    { name: "Cruise Critic", desc: "Unbiased cruise reviews and price comparison" },
  ];

  return (
    <footer className="w-full bg-[#f2f2f2] text-foreground border-t border-gray-300 transition-colors">
      {/* 1. Value Proposition Highlights Banner */}
      <div className="border-b border-gray-300/80 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-[#00af87]/10 text-[#00af87] shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Over 1 Billion Reviews</h4>
                <p className="text-xs text-gray-600 mt-0.5">Authentic guidance and unbiased ratings from millions of real travelers.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-[#00af87]/10 text-[#00af87] shrink-0">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">200+ Sites Compared</h4>
                <p className="text-xs text-gray-600 mt-0.5">Instant live price comparison across Booking.com, Expedia, Agoda & more.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-[#00af87]/10 text-[#00af87] shrink-0">
                <Heart className="h-6 w-6 text-rose-500" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Free Cancellation</h4>
                <p className="text-xs text-gray-600 mt-0.5">Stay flexible with zero penalty fees on most hotels and experiences.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-[#00af87]/10 text-[#00af87] shrink-0">
                <Smartphone className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Itinerary Route Planner</h4>
                <p className="text-xs text-gray-600 mt-0.5">Organize day-by-day trips, drag-and-drop saved spots and explore routes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Massive Directory Link Columns */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {directorySections.map((section, idx) => (
            <div key={section.title} className="border-b md:border-b-0 border-gray-300 pb-4 md:pb-0">
              {/* Mobile Accordion Header */}
              <button
                onClick={() => toggleSection(`sec-${idx}`)}
                className="flex items-center justify-between w-full md:hidden py-2 font-black text-gray-900 text-left text-sm"
              >
                <span>{section.title}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    openSection === `sec-${idx}` ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Desktop Header */}
              <h3 className="hidden md:block font-black text-sm text-gray-900 mb-4 tracking-tight">
                {section.title}
              </h3>

              {/* Links List */}
              <ul
                className={`space-y-2 text-xs text-gray-600 ${
                  openSection === `sec-${idx}` ? "block pt-2" : "hidden md:block"
                }`}
              >
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-black hover:underline transition-colors block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 3. Tripadvisor Family Sites Directory */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-4">
            Tripadvisor Sites & Partner Brands
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tripadvisorSites.map((site) => (
              <div key={site.name} className="p-3.5 bg-white/70 rounded-2xl border border-gray-300/80">
                <span className="font-black text-xs text-gray-900 block">{site.name}</span>
                <p className="text-[11px] text-gray-600 mt-0.5">{site.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Currency, Language & Social Links Row */}
        <div className="mt-10 pt-8 border-t border-gray-300 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Currency */}
            <div className="w-full sm:w-auto">
              <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full sm:w-auto bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-gray-800 outline-none focus:border-[#00af87] shadow-2xs"
              >
                <option value="USD ($)">USD ($) - US Dollar</option>
                <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                <option value="EUR (€)">EUR (€) - Euro</option>
                <option value="GBP (£)">GBP (£) - British Pound</option>
                <option value="AUD ($)">AUD ($) - Australian Dollar</option>
                <option value="CAD ($)">CAD ($) - Canadian Dollar</option>
                <option value="JPY (¥)">JPY (¥) - Japanese Yen</option>
              </select>
            </div>

            {/* Country / Language */}
            <div className="w-full sm:w-auto">
              <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">Country / Language</label>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full sm:w-auto bg-white border border-gray-300 rounded-xl pl-8 pr-4 py-2 text-xs font-semibold text-gray-800 outline-none focus:border-[#00af87] shadow-2xs appearance-none"
                >
                  <option value="United States (English)">United States (English)</option>
                  <option value="India (English)">India (English)</option>
                  <option value="United Kingdom (English)">United Kingdom (English)</option>
                  <option value="France (Français)">France (Français)</option>
                  <option value="Germany (Deutsch)">Germany (Deutsch)</option>
                  <option value="Spain (Español)">Spain (Español)</option>
                  <option value="Japan (日本語)">Japan (日本語)</option>
                </select>
                <Globe className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="lg:col-span-6 flex flex-wrap items-center lg:justify-end gap-3">
            <span className="text-xs font-bold text-gray-700">Follow us:</span>
            <div className="flex items-center gap-2">
              <a href="#" className="p-2 bg-white rounded-full border border-gray-300 hover:bg-gray-100 text-gray-700 transition-colors shadow-2xs" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-white rounded-full border border-gray-300 hover:bg-gray-100 text-gray-700 transition-colors shadow-2xs" aria-label="Instagram">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-white rounded-full border border-gray-300 hover:bg-gray-100 text-gray-700 transition-colors shadow-2xs" aria-label="X">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-white rounded-full border border-gray-300 hover:bg-gray-100 text-gray-700 transition-colors shadow-2xs" aria-label="YouTube">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* 5. Bottom Legal / Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-300 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-3">
            <div className="bg-[#00af87] text-white rounded-full p-1.5 flex items-center justify-center h-8 w-8 shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
            <span>© 2026 Tripadvisor LLC All rights reserved. TripAdvisor Clone Platform.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
            <Link href="#" className="hover:underline">Terms of Use</Link>
            <span>•</span>
            <Link href="#" className="hover:underline">Privacy and Cookies Statement</Link>
            <span>•</span>
            <Link href="#" className="hover:underline">Cookie Consent</Link>
            <span>•</span>
            <Link href="#" className="hover:underline">Site Map</Link>
            <span>•</span>
            <Link href="#" className="hover:underline">How the Site Works</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
