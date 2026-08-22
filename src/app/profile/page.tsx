"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  ThumbsUp,
  Award,
  Globe2,
  Heart,
  MessageSquare,
  Share2,
  CheckCircle2,
  Sparkles,
  Camera,
  Star,
  Users,
  Compass,
  Bookmark,
  ChevronRight,
  Filter,
  Settings,
  User,
  Mail,
  Shield,
  Trash2,
  AlertTriangle,
  X,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";

const INITIAL_PROFILE_DATA = {
  name: "Elena Rostova",
  handle: "@elena_travels",
  email: "elena@atlasguide.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  location: "London, United Kingdom",
  language: "English (US)",
  currency: "USD ($)",
  joined: "March 2021",
  bio: "Luxury resort enthusiast, avid scuba diver & Michelin culinary explorer. Over 18 countries documented with unbiased reviews and traveler tips.",
  stats: {
    followers: 2480,
    following: 192,
    reviewsCount: 48,
    helpfulVotes: 120400,
    countriesVisited: 18,
    citiesExplored: 64,
    photosUploaded: 420,
  },
  badges: [
    { id: "b1", title: "Top Contributor Level 6", icon: "🏆", desc: "Top 1% of global review contributors", color: "bg-amber-100 text-amber-900 border-amber-300" },
    { id: "b2", title: "Passport Master", icon: "🗺️", desc: "18 countries & 64 cities documented", color: "bg-emerald-100 text-emerald-900 border-emerald-300" },
    { id: "b3", title: "Photo Pro", icon: "📸", desc: "400+ high-res traveler photos", color: "bg-sky-100 text-sky-900 border-sky-300" },
    { id: "b4", title: "Culinary Scout", icon: "🍽️", desc: "Reviewed 30+ Michelin and local eateries", color: "bg-rose-100 text-rose-900 border-rose-300" },
    { id: "b5", title: "Helpful Hero", icon: "❤️", desc: "120,000+ helpful votes from community", color: "bg-purple-100 text-purple-900 border-purple-300" },
  ],
  visitedPlaces: [
    { country: "Indonesia", city: "Bali & Nusa Penida", flag: "🇮🇩", year: "2026" },
    { country: "Japan", city: "Tokyo & Kyoto", flag: "🇯🇵", year: "2025" },
    { country: "France", city: "Paris & Nice", flag: "🇫🇷", year: "2025" },
    { country: "Italy", city: "Rome & Florence", flag: "🇮🇹", year: "2024" },
    { country: "India", city: "Goa & Mumbai", flag: "🇮🇳", year: "2024" },
    { country: "Switzerland", city: "Interlaken & Lauterbrunnen", flag: "🇨🇭", year: "2023" },
  ],
  savedDestinations: [
    {
      id: "sav-1",
      name: "The St. Regis Bali Resort",
      category: "Hotel",
      location: "Nusa Dua, Bali",
      rating: 4.95,
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      price: "$590/night"
    },
    {
      id: "sav-2",
      name: "Shangri-La Paris (Eiffel Tower View)",
      category: "Hotel",
      location: "Paris, France",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      price: "$1,150/night"
    },
    {
      id: "sav-3",
      name: "Jungfraujoch - Top of Europe Glacier Tour",
      category: "Attraction",
      location: "Interlaken, Switzerland",
      rating: 4.92,
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      price: "$185/ticket"
    }
  ],
  reviews: [
    {
      id: "pr-1",
      place: "The St. Regis Bali Resort",
      category: "Hotel",
      location: "Nusa Dua, Bali, Indonesia",
      rating: 5,
      date: "August 2026",
      title: "Pure paradise with unmatched hospitality and lagoon villas",
      body: "The lagoon villas are breathtaking. From the personal butler service to the sunrise breakfast at Boneka by the ocean, every detail was immaculate. The saltwater lagoon pool is a masterpiece.",
      helpfulVotes: 48,
      photos: [
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ],
    },
    {
      id: "pr-2",
      place: "Le Gabriel - La Réserve Paris (3 Michelin Stars)",
      category: "Restaurant",
      location: "Paris, France",
      rating: 5,
      date: "June 2026",
      title: "Sublime gastronomic journey near the Champs-Élysées",
      body: "Chef Jérôme Banctel crafts pure art. The pigeon and artichoke dish accompanied by vintage Burgundy wine was the highlight of our Europe trip.",
      helpfulVotes: 64,
      photos: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ],
    }
  ]
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(INITIAL_PROFILE_DATA);
  const [activeTab, setActiveTab] = useState<"overview" | "saved" | "settings">("overview");

  // Form edit states
  const [editName, setEditName] = useState(profile.name);
  const [editHandle, setEditHandle] = useState(profile.handle);
  const [editEmail, setEditEmail] = useState(profile.email);
  const [editBio, setEditBio] = useState(profile.bio);
  const [editLocation, setEditLocation] = useState(profile.location);
  const [editLanguage, setEditLanguage] = useState(profile.language);
  const [editCurrency, setEditCurrency] = useState(profile.currency);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({
      ...profile,
      name: editName,
      handle: editHandle,
      email: editEmail,
      bio: editBio,
      location: editLocation,
      language: editLanguage,
      currency: editCurrency
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleRemoveSaved = (id: string) => {
    setProfile({
      ...profile,
      savedDestinations: profile.savedDestinations.filter((d) => d.id !== id)
    });
  };

  return (
    <div className="min-h-screen bg-[#fbf9f5] pb-24 text-gray-900">
      {/* Cover Photo */}
      <div className="relative h-60 sm:h-80 w-full bg-gray-900">
        <Image
          src={profile.cover}
          alt="Profile Cover"
          fill
          className="object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 relative z-10 space-y-6">
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-gray-200 shrink-0">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900">{profile.name}</h1>
                <CheckCircle2 className="w-5 h-5 text-[#00af87] shrink-0" />
              </div>
              <p className="text-xs text-gray-500 font-bold">{profile.handle} &bull; {profile.location}</p>
              <p className="text-xs text-gray-600 max-w-xl font-medium pt-1">{profile.bio}</p>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 justify-center">
            <Button
              size="sm"
              onClick={() => setActiveTab("overview")}
              className={`rounded-2xl text-xs font-bold h-10 px-4 ${
                activeTab === "overview" ? "bg-[#00af87] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <User className="w-3.5 h-3.5 mr-1.5" />
              <span>Overview & Reviews</span>
            </Button>

            <Button
              size="sm"
              onClick={() => setActiveTab("saved")}
              className={`rounded-2xl text-xs font-bold h-10 px-4 ${
                activeTab === "saved" ? "bg-[#00af87] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 mr-1.5" />
              <span>Favorites ({profile.savedDestinations.length})</span>
            </Button>

            <Button
              size="sm"
              onClick={() => setActiveTab("settings")}
              className={`rounded-2xl text-xs font-bold h-10 px-4 ${
                activeTab === "settings" ? "bg-[#00af87] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Settings className="w-3.5 h-3.5 mr-1.5" />
              <span>Account Settings</span>
            </Button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Stats & Badges */}
            <div className="space-y-6">
              {/* Badges Card */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs space-y-4">
                <h3 className="font-black text-sm text-gray-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Traveler Badges & Status</span>
                </h3>
                <div className="space-y-2.5">
                  {profile.badges.map((b) => (
                    <div key={b.id} className={`p-3 rounded-2xl border flex items-center gap-3 ${b.color}`}>
                      <span className="text-xl">{b.icon}</span>
                      <div>
                        <h4 className="font-black text-xs">{b.title}</h4>
                        <p className="text-[10px] opacity-80">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visited Countries */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs space-y-3">
                <h3 className="font-black text-sm text-gray-900 flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-[#00af87]" />
                  <span>Passport Stamp History</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.visitedPlaces.map((p, i) => (
                    <span key={i} className="bg-gray-100 text-gray-800 text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1.5">
                      <span>{p.flag}</span>
                      <span>{p.city}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Published Reviews */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-black text-gray-900">Verified Traveler Reviews ({profile.reviews.length})</h2>
              {profile.reviews.map((r) => (
                <div key={r.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#00af87] uppercase">{r.category}</span>
                      <h4 className="font-black text-base text-gray-900">{r.place}</h4>
                      <p className="text-xs text-gray-400 font-medium">{r.location} &bull; {r.date}</p>
                    </div>
                    <div className="flex text-amber-400">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <h5 className="font-bold text-sm text-gray-800">"{r.title}"</h5>
                  <p className="text-xs text-gray-600 leading-relaxed">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SAVED / FAVORITES (Feature #12) */}
        {activeTab === "saved" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-2xs space-y-6">
            <div>
              <h2 className="text-xl font-black text-gray-900">Saved Stays & Experiences</h2>
              <p className="text-xs text-gray-500 mt-0.5">Places you bookmarked to include in your next trip</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.savedDestinations.map((fav) => (
                <div key={fav.id} className="rounded-3xl border border-gray-200 overflow-hidden bg-gray-50/50 flex flex-col justify-between">
                  <div className="relative h-40 w-full bg-gray-200">
                    <Image src={fav.image} alt={fav.name} fill className="object-cover" />
                  </div>
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#00af87] uppercase">{fav.category}</span>
                      <h4 className="font-black text-sm text-gray-900 mt-0.5">{fav.name}</h4>
                      <p className="text-xs text-gray-500">{fav.location}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <span className="text-xs font-black text-gray-900">{fav.price}</span>
                      <button
                        onClick={() => handleRemoveSaved(fav.id)}
                        className="text-xs text-rose-600 font-bold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ACCOUNT SETTINGS (Feature #12) */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-2xs space-y-8">
            <div>
              <h2 className="text-xl font-black text-gray-900">Account & Profile Settings</h2>
              <p className="text-xs text-gray-500 mt-0.5">Manage your personal info, language, currency, and account privacy</p>
            </div>

            {savedSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-emerald-800 text-xs font-bold animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-[#00af87]" />
                <span>Your profile settings have been updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00af87]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Username / Handle</label>
                  <input
                    type="text"
                    value={editHandle}
                    onChange={(e) => setEditHandle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00af87]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00af87]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Location</label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00af87]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Traveler Bio</label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00af87]"
                />
              </div>

              {/* Preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Language Preference</label>
                  <select
                    value={editLanguage}
                    onChange={(e) => setEditLanguage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00af87] cursor-pointer"
                  >
                    <option value="English (US)">🇺🇸 English (US)</option>
                    <option value="French (Français)">🇫🇷 Français</option>
                    <option value="Spanish (Español)">🇪🇸 Español</option>
                    <option value="Japanese (日本語)">🇯🇵 日本語</option>
                    <option value="Hindi (हिंदी)">🇮🇳 हिंदी</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Display Currency</label>
                  <select
                    value={editCurrency}
                    onChange={(e) => setEditCurrency(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00af87] cursor-pointer"
                  >
                    <option value="USD ($)">USD ($) - US Dollar</option>
                    <option value="EUR (€)">EUR (€) - Euro</option>
                    <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                    <option value="GBP (£)">GBP (£) - British Pound</option>
                    <option value="JPY (¥)">JPY (¥) - Japanese Yen</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="submit"
                  className="bg-[#00af87] hover:bg-[#009b77] text-white text-xs font-bold rounded-2xl h-10 px-6 shadow-md"
                >
                  Save Profile Settings
                </Button>
              </div>
            </form>

            {/* Danger Zone: Delete Account */}
            <div className="pt-8 border-t border-rose-100">
              <div className="p-6 bg-rose-50/70 border border-rose-200 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-black text-sm text-rose-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Danger Zone: Delete Traveler Account</span>
                  </h4>
                  <p className="text-xs text-rose-700 mt-1">
                    Permanently delete your profile, saved trips, review badges, and custom itineraries.
                  </p>
                </div>

                <Button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-2xl h-9 px-4 shrink-0"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>

            <h3 className="text-xl font-black text-gray-900">Are you absolutely sure?</h3>
            <p className="text-xs text-gray-500">
              This action cannot be undone. To confirm, type <strong>DELETE</strong> in the box below:
            </p>

            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="DELETE"
              className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500"
            />

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 rounded-2xl text-xs font-bold h-10"
              >
                Cancel
              </Button>
              <Button
                disabled={deleteConfirmText !== "DELETE"}
                onClick={() => {
                  setIsDeleted(true);
                  setTimeout(() => {
                    window.location.href = "/";
                  }, 1200);
                }}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-2xl h-10"
              >
                {isDeleted ? "Account Deleted..." : "Confirm Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
