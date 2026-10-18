import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  ChevronDown, 
  ShoppingCart, 
  User, 
  Clock, 
  Wrench, 
  X,
  History,
  ShieldCheck,
  LayoutDashboard,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';

const Header = ({ 
  searchQuery, 
  setSearchQuery, 
  onOpenBookings, 
  onOpenLiveTracking,
  latestBooking 
}) => {
  const { totalItemsCount, grandTotal, setIsCartOpen } = useCart();
  const { user, isAuthenticated, setAuthModal, logout, activeRole, setActiveRole } = useAuth();
  const { location, setIsLocationModalOpen } = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white text-xs py-1.5 px-4 font-medium flex justify-between items-center border-b border-indigo-900/40">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
            15 MINS ARRIVAL
          </span>
          <span className="text-slate-200 text-xs">
            Verified Electricians, Mechanics, Tailors & Sweepers at your doorstep
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs">
          <button 
            onClick={() => setActiveRole(activeRole === 'user' ? 'partner_admin' : 'user')}
            className="flex items-center gap-1.5 bg-indigo-900/70 hover:bg-indigo-800 text-indigo-100 border border-indigo-700/60 px-3 py-0.5 rounded-lg transition text-[11px] font-semibold"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-orange-400" />
            <span>Switch to {activeRole === 'user' ? 'Partner/Admin View' : 'Customer View'}</span>
          </button>
          <span className="flex items-center gap-1 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified Pros
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-700 text-white p-2 rounded-xl font-extrabold text-lg leading-none flex items-center justify-center shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              ⚡
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-slate-900 leading-none">
                Skill<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Serve</span>
              </span>
              <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest leading-none mt-0.5">
                On-Demand Experts
              </span>
            </div>
          </a>
        </div>

        {/* Location Selector */}
        <button 
          onClick={() => setIsLocationModalOpen(true)}
          className="hidden md:flex flex-col text-left px-3 py-1.5 hover:bg-slate-50 rounded-xl transition border border-transparent hover:border-slate-200 group max-w-[220px]"
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-indigo-600">
            <Clock className="w-3.5 h-3.5 text-orange-500" />
            <span>Doorstep in {location.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500 truncate">
            <MapPin className="w-3 h-3 text-indigo-600 flex-shrink-0" />
            <span className="truncate font-medium">{location.city}</span>
            <ChevronDown className="w-3 h-3 text-slate-400 flex-shrink-0" />
          </div>
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search "electrician", "car jumpstart", "tailor fitting", "sweeper"...'
              className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-sm text-slate-900 pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Active Live Tracking pill */}
          {latestBooking && (
            <button
              onClick={() => onOpenLiveTracking(latestBooking)}
              className="hidden lg:flex items-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-900 border border-orange-200 px-3 py-1.5 rounded-xl text-xs font-bold animate-pulse transition shadow-xs"
            >
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <span>Live Partner Arriving</span>
            </button>
          )}

          {/* User Auth / Profile */}
          <div className="relative">
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 rounded-xl transition"
                >
                  <div className="w-7 h-7 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-xs">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:inline truncate max-w-[100px]">{user?.name?.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 text-sm">
                    <div className="px-3.5 py-2.5 border-b border-slate-100">
                      <p className="font-bold text-slate-900">{user?.name}</p>
                      <p className="text-xs text-slate-500">{user?.email || user?.phone}</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenBookings();
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium text-xs"
                    >
                      <History className="w-4 h-4 text-indigo-600" />
                      <span>My Bookings</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setActiveRole(activeRole === 'user' ? 'partner_admin' : 'user');
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium text-xs"
                    >
                      <LayoutDashboard className="w-4 h-4 text-orange-500" />
                      <span>Switch to {activeRole === 'user' ? 'Partner/Admin' : 'Customer'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2 font-medium text-xs border-t border-slate-100 mt-1"
                    >
                      <User className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setAuthModal('login')}
                className="text-sm font-bold text-slate-700 hover:text-indigo-600 px-3 py-2 rounded-xl hover:bg-slate-50 transition"
              >
                Login
              </button>
            )}
          </div>

          {/* SkillServe Indigo & Coral Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-3.5 sm:px-4 py-2.5 rounded-xl font-bold shadow-md shadow-indigo-600/25 hover:shadow-lg transition transform active:scale-95 group"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 group-hover:rotate-6 transition-transform text-white" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {totalItemsCount}
                </span>
              )}
            </div>
            <div className="flex flex-col text-left leading-none">
              {totalItemsCount > 0 ? (
                <>
                  <span className="text-[11px] font-medium text-indigo-200">
                    {totalItemsCount} {totalItemsCount === 1 ? 'service' : 'services'}
                  </span>
                  <span className="text-sm font-extrabold text-white">₹{grandTotal}</span>
                </>
              ) : (
                <span className="text-sm font-extrabold text-white">My Cart</span>
              )}
            </div>
          </button>

        </div>

      </div>

      {/* Mobile Location bar */}
      <div className="md:hidden border-t border-slate-100 px-4 py-2 bg-slate-50 flex items-center justify-between text-xs">
        <button 
          onClick={() => setIsLocationModalOpen(true)}
          className="flex items-center gap-1.5 text-slate-700 font-medium truncate"
        >
          <MapPin className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
          <span className="truncate">{location.city} ({location.pincode})</span>
          <ChevronDown className="w-3 h-3 text-slate-400 flex-shrink-0" />
        </button>
        <span className="text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 px-2 py-0.5 rounded-md text-[10px]">
          15 MINS
        </span>
      </div>
    </header>
  );
};

export default Header;
