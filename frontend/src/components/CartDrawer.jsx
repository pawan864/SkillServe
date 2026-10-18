import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Clock, 
  Calendar, 
  Tag, 
  Check, 
  ShieldCheck, 
  MapPin, 
  CreditCard,
  Banknote,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const CartDrawer = ({ onBookingSuccess }) => {
  const {
    isCartOpen,
    setIsCartOpen,
    itemsList,
    totalItemsCount,
    itemTotal,
    visitingFee,
    safetyFee,
    tip,
    setTip,
    coupon,
    couponError,
    discountAmount,
    grandTotal,
    addToCart,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { location, setIsLocationModalOpen } = useLocation();
  const { user, token } = useAuth();

  const [bookingType, setBookingType] = useState('instant'); // 'instant' | 'scheduled'
  const [scheduledDate, setScheduledDate] = useState('Today');
  const [scheduledTime, setScheduledTime] = useState('11:00 AM - 01:00 PM');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [couponInput, setCouponInput] = useState('');
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '9876543210');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput) {
      applyCoupon(couponInput);
    }
  };

  const handlePlaceBooking = async () => {
    if (itemsList.length === 0) return;

    setIsSubmitting(true);
    try {
      const payload = {
        items: itemsList.map(item => ({
          serviceId: item.service._id || item.service.id || item.service.slug,
          title: item.service.title,
          price: item.service.price,
          quantity: item.quantity,
          durationMinutes: item.service.durationMinutes,
          categorySlug: item.service.categorySlug
        })),
        bookingType,
        scheduledSlot: bookingType === 'scheduled' ? {
          date: scheduledDate,
          timeWindow: scheduledTime
        } : null,
        address: {
          type: 'home',
          flatNo: 'A-204, Green Heights',
          street: location.address,
          landmark: 'Opposite Landmark',
          city: location.city,
          pincode: location.pincode,
          contactPhone: customerPhone || '9876543210'
        },
        billDetails: {
          itemTotal,
          visitingFee,
          safetyFee,
          tip,
          discount: discountAmount,
          finalAmount: grandTotal
        },
        appliedCoupon: coupon?.code,
        paymentMethod,
        guestInfo: {
          name: customerName || 'Valued Customer',
          phone: customerPhone || '9876543210'
        }
      };

      const booking = await api.createBooking(payload, token);
      clearCart();
      setIsCartOpen(false);
      onBookingSuccess(booking);
    } catch (err) {
      alert('Error placing booking: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-50 flex flex-col shadow-2xl">
          
          {/* Drawer Header */}
          <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-900">My Service Cart</h2>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                {totalItemsCount} {totalItemsCount === 1 ? 'service' : 'services'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {itemsList.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center flex flex-col items-center justify-center space-y-3 mt-10 border border-slate-200/60">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-3xl">
                  🛒
                </div>
                <h3 className="text-base font-bold text-slate-900">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs">
                  Browse our certified technicians, mechanics, tailors & sweepers to book with 15-minute arrival.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 transition"
                >
                  Browse Services
                </button>
              </div>
            ) : (
              <>
                {/* 15 Mins Delivery Notice */}
                <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white rounded-2xl p-4 flex items-center justify-between shadow-md border border-indigo-900/40">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-2 rounded-xl text-xs font-black">
                      ⚡
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-orange-400">
                        15 Mins Superfast Arrival
                      </p>
                      <p className="text-xs text-slate-300">
                        Nearest expert dispatched immediately
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black bg-indigo-900 text-indigo-200 px-2.5 py-1 rounded-md border border-indigo-700/60">
                    LIVE
                  </span>
                </div>

                {/* Booking Mode Selector (Instant vs Scheduled) */}
                <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-slate-200/70">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Service Timing
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setBookingType('instant')}
                      className={`p-2.5 rounded-xl border text-left flex flex-col transition ${
                        bookingType === 'instant'
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xs flex items-center gap-1 font-bold">
                        <Clock className="w-3.5 h-3.5 text-orange-500" /> Instant in 15 mins
                      </span>
                      <span className="text-[10px] text-slate-500 font-normal mt-0.5">
                        Earliest available expert
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBookingType('scheduled')}
                      className={`p-2.5 rounded-xl border text-left flex flex-col transition ${
                        bookingType === 'scheduled'
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xs flex items-center gap-1 font-bold">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600" /> Schedule Slot
                      </span>
                      <span className="text-[10px] text-slate-500 font-normal mt-0.5">
                        Choose your convenience
                      </span>
                    </button>
                  </div>

                  {/* Scheduled Slot Picker */}
                  {bookingType === 'scheduled' && (
                    <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                      <select
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="text-xs border border-slate-200 rounded-lg p-2 font-medium bg-slate-50 focus:outline-none focus:border-indigo-600"
                      >
                        <option value="Today">Today</option>
                        <option value="Tomorrow">Tomorrow</option>
                        <option value="Day After Tomorrow">Day After Tomorrow</option>
                      </select>
                      <select
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        className="text-xs border border-slate-200 rounded-lg p-2 font-medium bg-slate-50 focus:outline-none focus:border-indigo-600"
                      >
                        <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                        <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                        <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                        <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Selected Services List */}
                <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/70 space-y-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Selected Services ({totalItemsCount})
                  </span>

                  {itemsList.map(({ service, quantity }) => {
                    const key = service._id || service.id || service.slug;
                    return (
                      <div key={key} className="flex items-center justify-between gap-3 py-2 border-b border-slate-100 last:border-none">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate">
                              {service.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 font-semibold">
                              ₹{service.price} × {quantity} = <span className="text-slate-900 font-extrabold">₹{service.price * quantity}</span>
                            </p>
                          </div>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl overflow-hidden shadow-xs flex-shrink-0">
                          <button
                            onClick={() => removeFromCart(key)}
                            className="p-1 hover:bg-indigo-800 transition"
                          >
                            <Minus className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                          <span className="px-2 font-black text-xs min-w-[18px] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => addToCart(service)}
                            className="p-1 hover:bg-indigo-800 transition"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery Location Preview */}
                <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-slate-200/70 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Service Location</p>
                      <p className="text-xs text-slate-500 line-clamp-1">{location.city} - {location.address}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsLocationModalOpen(true)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex-shrink-0"
                  >
                    Change
                  </button>
                </div>

                {/* Customer Contact Inputs */}
                <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-slate-200/70 space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Contact Information
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 font-semibold uppercase">Your Name</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Rahul Sharma"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-semibold uppercase">Phone Number</label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="9876543210"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Tip Your Professional */}
                <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-slate-200/70">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800">
                      Tip your professional partner
                    </span>
                    <span className="text-[11px] text-indigo-600 font-semibold">
                      100% goes to partner
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[0, 20, 30, 50, 100].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setTip(amount)}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition ${
                          tip === amount
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {amount === 0 ? 'No tip' : `₹${amount}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Promo Coupon Card */}
                <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-slate-200/70">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
                    <Tag className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Apply Coupon / Voucher</span>
                  </div>

                  {coupon ? (
                    <div className="bg-indigo-50 border border-indigo-200 p-2.5 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-indigo-600 stroke-[3]" />
                        <div>
                          <p className="text-xs font-extrabold text-indigo-900">
                            '{coupon.code}' Applied!
                          </p>
                          <p className="text-[11px] text-indigo-700 font-medium">
                            ₹{coupon.discount} discount applied
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs font-bold text-rose-600 hover:text-rose-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Enter promo code (e.g. SKILL50)"
                          className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 uppercase font-bold focus:outline-none focus:border-indigo-600"
                        />
                        <button
                          type="submit"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                        >
                          Apply
                        </button>
                      </form>
                      {couponError && (
                        <p className="text-[11px] text-rose-500 font-semibold mb-1">{couponError}</p>
                      )}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => applyCoupon('BLINKIT50')}
                          className="text-[10px] font-bold bg-orange-50 text-orange-800 border border-orange-200 px-2 py-0.5 rounded-lg hover:bg-orange-100"
                        >
                          BLINKIT50 (₹50 OFF)
                        </button>
                        <button
                          type="button"
                          onClick={() => applyCoupon('FIRST100')}
                          className="text-[10px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200 px-2 py-0.5 rounded-lg hover:bg-indigo-100"
                        >
                          FIRST100 (₹100 OFF)
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment Method Selector */}
                <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-slate-200/70">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Payment Method
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition ${
                        paymentMethod === 'upi'
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-indigo-600" />
                      <div className="text-xs">
                        <p className="font-bold">UPI / Cards</p>
                        <p className="text-[10px] text-slate-500">Fast & Zero Contact</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition ${
                        paymentMethod === 'cash'
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Banknote className="w-4 h-4 text-amber-600" />
                      <div className="text-xs">
                        <p className="font-bold">Cash After Service</p>
                        <p className="text-[10px] text-slate-500">Pay on Satisfaction</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Detailed Bill Summary */}
                <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/70 space-y-2.5">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Bill Summary
                  </h4>

                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Items Total</span>
                    <span className="font-semibold text-slate-900">₹{itemTotal}</span>
                  </div>

                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Visiting Charge</span>
                    {visitingFee === 0 ? (
                      <span className="font-bold text-emerald-600 uppercase text-[11px]">
                        FREE
                      </span>
                    ) : (
                      <span className="font-semibold text-slate-900">₹{visitingFee}</span>
                    )}
                  </div>

                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Safety & Tech Fee</span>
                    <span className="font-semibold text-slate-900">₹{safetyFee}</span>
                  </div>

                  {tip > 0 && (
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Partner Tip</span>
                      <span className="font-semibold text-slate-900">₹{tip}</span>
                    </div>
                  )}

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-xs text-indigo-600 font-bold">
                      <span>Promo Discount</span>
                      <span>- ₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-sm font-black text-slate-900">Grand Total</span>
                    <span className="text-lg font-black text-indigo-700">₹{grandTotal}</span>
                  </div>
                </div>

                {/* SkillServe Cancellation Guarantee */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 justify-center">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>Free cancellation up to 5 mins before technician arrival</span>
                </div>

              </>
            )}

          </div>

          {/* Sticky Drawer Footer with Proceed Button */}
          {itemsList.length > 0 && (
            <div className="p-4 bg-white border-t border-slate-100 sticky bottom-0 z-10 shadow-lg">
              <button
                disabled={isSubmitting}
                onClick={handlePlaceBooking}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 disabled:bg-slate-400 text-white font-black py-3.5 px-4 rounded-2xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-between active:scale-95 group"
              >
                <div className="text-left flex flex-col leading-none">
                  <span className="text-sm font-black">₹{grandTotal}</span>
                  <span className="text-[10px] text-indigo-200 font-medium mt-0.5">
                    {bookingType === 'instant' ? '15 MINS ARRIVAL' : 'SCHEDULED'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-sm font-extrabold uppercase tracking-wider">
                  <span>{isSubmitting ? 'Dispatching...' : 'Place Booking'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
