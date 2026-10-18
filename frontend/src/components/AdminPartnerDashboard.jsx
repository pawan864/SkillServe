import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Wrench, 
  Scissors, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

const AdminPartnerDashboard = ({ bookings, onUpdateBookingStatus }) => {
  const [partnerType, setPartnerType] = useState('all');

  const stats = [
    { label: "Today's Orders", value: bookings.length + 8, change: '+24%', icon: Clock, color: 'text-indigo-600 bg-indigo-50' },
    { label: "Active Jobs", value: bookings.filter(b => b.status !== 'completed').length + 2, change: 'In Field', icon: Wrench, color: 'text-orange-600 bg-orange-50' },
    { label: "Earnings Today", value: `₹${bookings.reduce((sum, b) => sum + (b.billDetails?.finalAmount || 0), 4250)}`, change: '+18%', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
    { label: "Partner Rating", value: '4.92 ★', change: 'Top Tier', icon: ShieldCheck, color: 'text-purple-600 bg-purple-50' },
  ];

  const handleStatusChange = (bookingId, newStatus) => {
    if (onUpdateBookingStatus) {
      onUpdateBookingStatus(bookingId, newStatus);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl shadow-indigo-950/20 border border-indigo-900/40">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            PARTNER & DISPATCH CONSOLE
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            SkillServe Partner Dispatch Center
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
            Real-time tracking of technicians, roadside mechanics, doorstep tailors, and deep-clean sweepers dispatched within 15 minutes.
          </p>
        </div>

        {/* Quick active partner indicator */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
          <div>
            <p className="text-xs font-bold text-white">48 Active Partners On-Duty</p>
            <p className="text-[11px] text-slate-300">Avg. arrival: 13.8 minutes</p>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.label}</span>
                <div className={`p-2 rounded-xl ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">{s.value}</p>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                  {s.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Incoming Service Orders Feed */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900">Live Service Requests</h3>
            <p className="text-xs text-slate-500">Update professional dispatch status in real-time</p>
          </div>
          <span className="text-xs font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 rounded-full">
            {bookings.length} Current Bookings
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p className="font-bold text-sm">No live orders at this moment</p>
            <p className="text-xs text-slate-500">Book any service from customer view to test this console!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div 
                key={booking._id}
                className="border border-slate-200/80 hover:border-indigo-300 rounded-2xl p-4 transition bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Order Details */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-indigo-700 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
                      {booking.bookingType === 'instant' ? '⚡ 15-Min Instant' : '📅 Scheduled'}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      ID: #{booking._id?.slice(-6) || '9921'}
                    </span>
                    <span className="text-xs font-black text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-full">
                      Status: {booking.status}
                    </span>
                  </div>

                  <div className="text-xs font-extrabold text-slate-900">
                    {booking.items?.map(i => `${i.title} (${i.quantity}x)`).join(', ')}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                      {booking.address?.city} ({booking.address?.pincode})
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {booking.address?.contactPhone || '9876543210'}
                    </span>
                    <span>•</span>
                    <span className="font-bold text-slate-900">
                      OTP: <span className="text-indigo-600 tracking-widest">{booking.otp || '4821'}</span>
                    </span>
                  </div>
                </div>

                {/* Status action buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  {booking.status === 'partner_assigned' && (
                    <button
                      onClick={() => handleStatusChange(booking._id, 'on_the_way')}
                      className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3 py-2 rounded-xl transition shadow-xs"
                    >
                      Dispatch: On The Way 🛵
                    </button>
                  )}
                  {booking.status === 'on_the_way' && (
                    <button
                      onClick={() => handleStatusChange(booking._id, 'in_progress')}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition shadow-xs"
                    >
                      Verify OTP & Start 🛠️
                    </button>
                  )}
                  {booking.status === 'in_progress' && (
                    <button
                      onClick={() => handleStatusChange(booking._id, 'completed')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition shadow-xs flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Completed 🎉</span>
                    </button>
                  )}
                  {booking.status === 'completed' && (
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                      Service Delivered ✅
                    </span>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminPartnerDashboard;
