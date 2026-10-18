import React from 'react';
import { Plus, Minus, Star, Clock, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ServiceCard = ({ service, onOpenDetails }) => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const serviceKey = service._id || service.id || service.slug;
  const inCartItem = cartItems[serviceKey];
  const quantity = inCartItem ? inCartItem.quantity : 0;

  return (
    <div 
      onClick={() => onOpenDetails(service)}
      className="bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 overflow-hidden shadow-xs hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-200 flex flex-col justify-between cursor-pointer group"
    >
      {/* Thumbnail Area */}
      <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
          {service.isBestseller && (
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wide">
              Bestseller
            </span>
          )}
          {service.instantAvailable && (
            <span className="bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 border border-white/10">
              ⚡ 15 Mins
            </span>
          )}
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-2 left-2 bg-slate-950/75 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1">
          <Clock className="w-3 h-3 text-orange-400" />
          <span>{service.durationMinutes} mins</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 text-[11px] font-bold px-2 py-0.5 rounded-md border border-amber-200/50">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{service.rating}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              ({service.reviewsCount} reviews)
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 mb-1 group-hover:text-indigo-600 transition-colors">
            {service.title}
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-500 line-clamp-2 mb-2 leading-relaxed">
            {service.shortDesc}
          </p>
        </div>

        {/* Pricing & Add Button */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black text-slate-900">
                ₹{service.price}
              </span>
              {service.originalPrice > service.price && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{service.originalPrice}
                </span>
              )}
            </div>
            {service.discountPercent > 0 && (
              <span className="text-[10px] font-extrabold text-orange-600">
                {service.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* SkillServe ADD / Stepper Button */}
          <div onClick={(e) => e.stopPropagation()}>
            {quantity === 0 ? (
              <button
                onClick={() => addToCart(service)}
                className="bg-indigo-50/70 hover:bg-indigo-600 text-indigo-700 hover:text-white border-2 border-indigo-600 px-4 py-1.5 rounded-xl font-extrabold text-xs tracking-wider transition-all shadow-xs active:scale-95 uppercase flex items-center gap-1"
              >
                <span>ADD</span>
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            ) : (
              <div className="flex items-center bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl overflow-hidden shadow-md shadow-indigo-600/20">
                <button
                  onClick={() => removeFromCart(serviceKey)}
                  className="px-2.5 py-1.5 hover:bg-indigo-800 transition active:scale-90"
                >
                  <Minus className="w-3.5 h-3.5 stroke-[3]" />
                </button>
                <span className="px-2 font-black text-xs min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => addToCart(service)}
                  className="px-2.5 py-1.5 hover:bg-indigo-800 transition active:scale-90"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceCard;
