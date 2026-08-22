"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Globe,
  ChevronDown,
  Smartphone,
  ShieldCheck,
  Award,
  Heart
} from "lucide-react";

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [currency, setCurrency] = useState("USD ($)");
  const [language, setLanguage] = useState("United States (English)");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const footerLinks = {
    about: {
      title: "About Tripadvisor",
      links: [
        { label: "About Us", href: "#" },
        { label: "Press & Media", href: "#" },
        { label: "Resources and Policies", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Trust & Safety", href: "#" },
        { label: "Contact Us", href: "#" },
        { label: "Accessibility Statement", href: "#" },
      ],
    },
    explore: {
      title: "Explore",
      links: [
        { label: "Write a Review", href: "/review" },
        { label: "Add a Place", href: "#" },
        { label: "Join the Community", href: "#" },
        { label: "Travelers' Choice", href: "/listings" },
        { label: "GreenLeaders", href: "#" },
        { label: "Travel Articles & Guides", href: "#" },
        { label: "Help Center", href: "#" },
      ],
    },
    business: {
      title: "Do Business With Us",
      links: [
        { label: "Owners & Managers", href: "#" },
        { label: "Business Advantage", href: "#" },
        { label: "Sponsored Placements", href: "#" },
        { label: "Advertise with Us", href: "#" },
        { label: "Affiliate Program", href: "#" },
      ],
    },
    sites: {
      title: "Tripadvisor Sites",
      links: [
        { label: "Book tours & activities on Viator", href: "#" },
        { label: "Book restaurant tables on TheFork", href: "#" },
        { label: "Vacation Home Rentals", href: "/listings?type=HOLIDAY_HOME" },
        { label: "Cheap Flights", href: "/listings?type=FLIGHT" },
        { label: "Cruise Critic", href: "#" },
      ],
    },
  };

  return (
    <footer className="w-full bg-[#f2f2f2] text-foreground border-t border-gray-300 transition-colors">
      {/* Top Banner / Value Props */}
      <div className="border-b border-gray-300/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-full bg-[#00af87]/10 text-[#00af87] shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Unbiased Reviews</h4>
                <p className="text-xs text-gray-600 mt-1">Real advice from millions of authentic travelers worldwide.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-full bg-[#00af87]/10 text-[#00af87] shrink-0">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Best Price Comparison</h4>
                <p className="text-xs text-gray-600 mt-1">Compare 200+ booking sites instantly for lowest rates.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-full bg-[#00af87]/10 text-[#00af87] shrink-0">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Free Cancellation</h4>
                <p className="text-xs text-gray-600 mt-1">Flexible bookings with no hidden penalty fees on most stays.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-full bg-[#00af87]/10 text-[#00af87] shrink-0">
                <Smartphone className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Trip Planner</h4>
                <p className="text-xs text-gray-600 mt-1">Build, organize and share your custom travel itineraries.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Link Columns */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* 4 Category Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="border-b md:border-b-0 border-gray-300 pb-4 md:pb-0">
              {/* Mobile Accordion Header */}
              <button
                onClick={() => toggleSection(key)}
                className="flex items-center justify-between w-full md:hidden py-2 font-bold text-gray-900 text-left"
              >
                <span>{section.title}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    openSection === key ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Desktop Header */}
              <h3 className="hidden md:block font-bold text-sm text-gray-900 mb-4 tracking-tight">
                {section.title}
              </h3>

              {/* Link List */}
              <ul
                className={`space-y-2.5 text-xs text-gray-600 ${
                  openSection === key ? "block pt-2" : "hidden md:block"
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

          {/* 5th Column: Currency, Language & App Downloads */}
          <div className="space-y-4 pt-2 md:pt-0">
            <h3 className="font-bold text-sm text-gray-900 tracking-tight">Preferences</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 block">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs font-medium text-gray-800 outline-none focus:border-[#00af87] shadow-sm"
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

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 block">Country / Language</label>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-3 py-2 text-xs font-medium text-gray-800 outline-none focus:border-[#00af87] shadow-sm appearance-none"
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

            <div className="pt-2">
              <span className="text-xs font-semibold text-gray-700 block mb-2">Connect with us</span>
              <div className="flex items-center gap-2">
                {/* Facebook SVG */}
                <a href="#" className="p-2 bg-white rounded-full border border-gray-300 hover:bg-gray-100 text-gray-700 transition-colors">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* Instagram SVG */}
                <a href="#" className="p-2 bg-white rounded-full border border-gray-300 hover:bg-gray-100 text-gray-700 transition-colors">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* X / Twitter SVG */}
                <a href="#" className="p-2 bg-white rounded-full border border-gray-300 hover:bg-gray-100 text-gray-700 transition-colors">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* YouTube SVG */}
                <a href="#" className="p-2 bg-white rounded-full border border-gray-300 hover:bg-gray-100 text-gray-700 transition-colors">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-300 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-3">
            <div className="bg-[#00af87] text-white rounded-full p-1 flex items-center justify-center h-7 w-7">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
            <span>© 2026 Tripadvisor LLC All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
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
