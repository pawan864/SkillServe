import React from 'react';
import { X, Check, ShieldCheck, Clock, Star, Plus, Minus, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ServiceDetailModal = ({ service, onClose }) => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  if (!service) return null;

  const serviceKey = service._id || service.id || service.slug;
  const inCart = cartItems[serviceKey];
  const quantity = inCart ? inCart.quantity : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative animate-scaleUp border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-slate-950/60 hover:bg-slate-950 text-white p-2 rounded-full transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1">
          {/* Header Image */}
          <div className="relative aspect-[16/9] w-full bg-slate-100">
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-4 flex gap-2">
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-sm">
                ⚡ 15 MINS ARRIVAL
              </span>
              <span className="bg-slate-900/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 backdrop-blur-xs border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> {service.warrantyDays}-Day Warranty
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* Title & Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1 bg-amber-50 text-amber-900 text-xs font-bold px-2 py-0.5 rounded border border-amber-200/50">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{service.rating}</span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {service.reviewsCount} verified reviews
              </span>
              <span className="text-xs text-slate-300">•</span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" /> {service.durationMinutes} mins estimated
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 leading-tight">
              {service.title}
            </h2>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              {service.fullDesc || service.shortDesc}
            </p>

            {/* Inclusions */}
            {service.includes && service.includes.length > 0 && (
              <div className="mb-6 bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100/80">
                <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-indigo-600 stroke-[3]" />
                  What is included in this service
                </h4>
                <div className="space-y-2">
                  {service.includes.map((inc, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0"></span>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Exclusions */}
            {service.excludes && service.excludes.length > 0 && (
              <div className="mb-6 bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                  What's not included
                </h4>
                <div className="space-y-1.5">
                  {service.excludes.map((exc, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-500">
                      <span className="text-slate-400">•</span>
                      <span>{exc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Safety & Trust Promise */}
            <div className="bg-orange-50/60 rounded-2xl p-4 border border-orange-200/60 flex items-start gap-3 mb-2">
              <ShieldCheck className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold text-slate-900 mb-0.5">SkillServe Safety & Quality Guarantee</p>
                <p className="text-slate-600">Police-verified background check, standard transparent pricing, and 30-day rework warranty on all bookings.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Bottom Sticky Action Bar */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total Price</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-slate-900">₹{service.price}</span>
              {service.originalPrice > service.price && (
                <span className="text-sm text-slate-400 line-through">₹{service.originalPrice}</span>
              )}
            </div>
          </div>

          <div>
            {quantity === 0 ? (
              <button
                onClick={() => addToCart(service)}
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black px-6 py-3 rounded-2xl transition shadow-md shadow-indigo-600/25 flex items-center gap-2 active:scale-95"
              >
                <span>Add to Cart</span>
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>
            ) : (
              <div className="flex items-center bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl overflow-hidden shadow-md shadow-indigo-600/25">
                <button
                  onClick={() => removeFromCart(serviceKey)}
                  className="px-3.5 py-2.5 hover:bg-indigo-800 transition"
                >
                  <Minus className="w-4 h-4 stroke-[3]" />
                </button>
                <span className="px-4 font-black text-sm">{quantity}</span>
                <button
                  onClick={() => addToCart(service)}
                  className="px-3.5 py-2.5 hover:bg-indigo-800 transition"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceDetailModal;
