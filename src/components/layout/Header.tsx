import Link from "next/link";
import { Search, Globe, MapPin, PenLine, User, Menu } from "lucide-react";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Menu className="h-6 w-6 lg:hidden" />
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-brand text-white rounded-full p-1.5 flex items-center justify-center h-10 w-10">
              {/* Simplified owl-like logo placeholder */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tight text-foreground hidden sm:inline-block">
              Tripadvisor
            </span>
          </Link>
        </div>

        {/* Global Search Bar (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-2xl px-8">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="h-5 w-5 text-text-secondary" />
            </div>
            <input
              type="text"
              className="w-full h-12 pl-12 pr-4 text-foreground bg-white border-2 border-transparent focus:border-text-secondary hover:border-gray-200 rounded-full shadow-sm outline-none transition-colors border-gray-200"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden lg:flex items-center gap-2 rounded-full font-medium text-base hover:bg-gray-100">
            <PenLine className="h-5 w-5" />
            <span>Review</span>
          </Button>
          <Button variant="ghost" className="hidden lg:flex items-center gap-2 rounded-full font-medium text-base hover:bg-gray-100">
            <MapPin className="h-5 w-5" />
            <span>Trips</span>
          </Button>
          <Button variant="ghost" size="icon" className="hidden lg:flex rounded-full hover:bg-gray-100">
            <Globe className="h-5 w-5" />
          </Button>
          <Button className="rounded-full bg-black hover:bg-gray-800 text-white font-medium px-6 h-10 ml-2">
            Sign in
          </Button>
        </div>
      </div>

      {/* Global Search Bar (Mobile/Tablet) */}
      <div className="lg:hidden px-4 pb-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="h-5 w-5 text-text-secondary" />
          </div>
          <input
            type="text"
            className="w-full h-12 pl-12 pr-4 text-foreground bg-white border border-gray-200 rounded-full shadow-sm outline-none"
            placeholder="Search"
          />
        </div>
      </div>
    </header>
  );
}
