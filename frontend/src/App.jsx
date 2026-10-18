import React, { useState, useEffect } from 'react';
import { api } from './services/api';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import BannerHero from './components/BannerHero';
import CategoryGrid from './components/CategoryGrid';
import ServiceCard from './components/ServiceCard';
import ServiceDetailModal from './components/ServiceDetailModal';
import CartDrawer from './components/CartDrawer';
import LocationModal from './components/LocationModal';
import AuthModal from './components/AuthModal';
import LiveTrackingModal from './components/LiveTrackingModal';
import BookingsModal from './components/BookingsModal';
import AdminPartnerDashboard from './components/AdminPartnerDashboard';
import Footer from './components/Footer';
import { Zap, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

function App() {
  const { activeRole, setActiveRole } = useAuth();

  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'instant' | 'bestseller'
  
  const [selectedServiceForDetail, setSelectedServiceForDetail] = useState(null);
  const [liveTrackingBooking, setLiveTrackingBooking] = useState(null);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initial Load
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const [cats, srvs, bks] = await Promise.all([
        api.getCategories(),
        api.getServices(),
        api.getMyBookings()
      ]);
      setCategories(cats);
      setServices(srvs);
      setBookings(bks);
      // Auto open live tracking if active booking exists
      const active = bks.find(b => b.status !== 'completed' && b.status !== 'cancelled');
      if (active) {
        setLiveTrackingBooking(active);
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Filter Services by Category, Search, & Fast Filter
  const filteredServices = services.filter((srv) => {
    // Category match
    if (selectedCategory !== 'all' && srv.categorySlug !== selectedCategory) {
      return false;
    }
    // Search query match
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = srv.title?.toLowerCase().includes(q);
      const matchDesc = srv.shortDesc?.toLowerCase().includes(q);
      const matchCat = srv.categorySlug?.toLowerCase().includes(q);
      const matchTags = srv.tags && srv.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchCat && !matchTags) return false;
    }
    // Filter chip
    if (activeFilter === 'instant' && !srv.instantAvailable) return false;
    if (activeFilter === 'bestseller' && !srv.isBestseller) return false;

    return true;
  });

  // Handle successful booking from CartDrawer
  const handleBookingSuccess = (newBooking) => {
    setBookings(prev => [newBooking, ...prev]);
    setLiveTrackingBooking(newBooking);
  };

  // Handle live status updates (from tracking or admin dashboard)
  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev => prev.map(b => {
      if (b._id === bookingId) {
        return { ...b, status: newStatus };
      }
      return b;
    }));

    if (liveTrackingBooking && liveTrackingBooking._id === bookingId) {
      setLiveTrackingBooking(prev => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col selection:bg-amber-300 selection:text-black">
      
      {/* Blinkit Style Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenBookings={() => setIsBookingsModalOpen(true)}
        onOpenLiveTracking={(b) => setLiveTrackingBooking(b)}
        latestBooking={liveTrackingBooking}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Toggle between Customer View and Partner/Admin Console */}
        {activeRole === 'partner_admin' ? (
          <AdminPartnerDashboard
            bookings={bookings}
            onUpdateBookingStatus={handleUpdateBookingStatus}
          />
        ) : (
          <>
            {/* Top Banners & Promo Cards (Image 2) */}
            <BannerHero onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              const el = document.getElementById('services-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} />

            {/* Category Grid (Image 1) */}
            <CategoryGrid
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={(slug) => {
                setSelectedCategory(slug);
                const el = document.getElementById('services-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Services Section with Filter Chips */}
            <section id="services-section" className="max-w-7xl mx-auto px-3 sm:px-6 py-4">
              
              {/* Section Header & Filter Pills */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-gray-100">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <span>
                      {selectedCategory === 'all' 
                        ? 'All Doorstep Services' 
                        : `${selectedCategory.toUpperCase()} Services`}
                    </span>
                    <span className="text-xs font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                      {filteredServices.length} available
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Select a service to book professional instant dispatch in 15 minutes
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition whitespace-nowrap ${
                      activeFilter === 'all'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    All Services
                  </button>
                  <button
                    onClick={() => setActiveFilter('instant')}
                    className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition whitespace-nowrap flex items-center gap-1.5 ${
                      activeFilter === 'instant'
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>⚡ 15-Mins Instant</span>
                  </button>
                  <button
                    onClick={() => setActiveFilter('bestseller')}
                    className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition whitespace-nowrap flex items-center gap-1.5 ${
                      activeFilter === 'bestseller'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Bestsellers</span>
                  </button>
                </div>
              </div>

              {/* Service Cards Grid */}
              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <div key={n} className="bg-white rounded-2xl h-64 animate-pulse p-4 border border-slate-200/60" />
                  ))}
                </div>
              ) : filteredServices.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/70 space-y-3">
                  <div className="text-4xl">🔍</div>
                  <h4 className="font-bold text-slate-900 text-base">No services found</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    We couldn't find any services matching your filter or query. Try searching for "electrician", "puncture", "tailor" or "sweeper".
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                      setActiveFilter('all');
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5">
                  {filteredServices.map((service) => (
                    <ServiceCard
                      key={service._id || service.id || service.slug}
                      service={service}
                      onOpenDetails={(s) => setSelectedServiceForDetail(s)}
                    />
                  ))}
                </div>
              )}

            </section>
          </>
        )}

      </main>

      {/* Blinkit Footer (Image 1) */}
      <Footer onSelectCategory={(cat) => {
        setSelectedCategory(cat);
        const el = document.getElementById('services-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* Slide-over Cart Drawer */}
      <CartDrawer onBookingSuccess={handleBookingSuccess} />

      {/* Service Detail Modal */}
      {selectedServiceForDetail && (
        <ServiceDetailModal
          service={selectedServiceForDetail}
          onClose={() => setSelectedServiceForDetail(null)}
        />
      )}

      {/* Location Picker Modal */}
      <LocationModal />

      {/* User Login/Register Modal */}
      <AuthModal />

      {/* Live Order Tracking Modal */}
      {liveTrackingBooking && (
        <LiveTrackingModal
          booking={liveTrackingBooking}
          onClose={() => setLiveTrackingBooking(null)}
          onUpdateStatus={handleUpdateBookingStatus}
        />
      )}

      {/* User Bookings History Modal */}
      <BookingsModal
        isOpen={isBookingsModalOpen}
        onClose={() => setIsBookingsModalOpen(false)}
        bookings={bookings}
        onOpenLiveTracking={(b) => setLiveTrackingBooking(b)}
      />

    </div>
  );
}

export default App;
