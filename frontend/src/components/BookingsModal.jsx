import React from 'react';
import { X, Clock, Calendar, CheckCircle, ChevronRight, Phone, MapPin } from 'lucide-react';

const BookingsModal = ({ isOpen, onClose, bookings, onOpenLiveTracking }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl relative animate-scaleUp border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-base">My Service Bookings</h3>
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black px-2 py-0.5 rounded-full">
              {bookings.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {bookings.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <div className="text-4xl">📋</div>
              <p className="font-bold text-slate-800 text-sm">No bookings yet</p>
              <p className="text-xs">Your booked technicians, mechanics, tailors & sweepers will show here.</p>
            </div>
          ) : (
            bookings.map((booking) => {
              const isOngoing = booking.status !== 'completed' && booking.status !== 'cancelled';
              return (
                <div 
                  key={booking._id} 
                  className="bg-white border border-slate-200/80 hover:border-indigo-300 rounded-2xl p-4 shadow-xs transition space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      isOngoing 
                        ? 'bg-orange-50 text-orange-900 border border-orange-200' 
                        : 'bg-indigo-50 text-indigo-900 border border-indigo-200'
                    }`}>
                      {booking.status?.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {booking.bookingType === 'instant' ? '⚡ 15 MINS INSTANT' : '📅 SCHEDULED'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {booking.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-slate-800 font-semibold">
                        <span>{item.title}</span>
                        <span className="text-slate-900 font-bold">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                      {booking.address?.city || 'Local Area'}
                    </span>
                    <span className="font-black text-indigo-700 text-sm">
                      Total: ₹{booking.billDetails?.finalAmount || 0}
                    </span>
                  </div>

                  {/* Track Live button */}
                  {isOngoing && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenLiveTracking(booking);
                      }}
                      className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1 shadow-md shadow-indigo-600/20"
                    >
                      <span>Track Live Professional (OTP: {booking.otp || '4821'})</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsModal;
