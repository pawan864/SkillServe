import React from 'react';
import { promoCards } from '../data/mockData';
import { ShieldCheck, Zap, ArrowRight, Sparkles } from 'lucide-react';

const customPromoStyles = {
  technician: {
    gradient: 'from-blue-600 via-indigo-600 to-indigo-800',
    accent: 'bg-blue-400/20 text-blue-100',
    badgeColor: 'bg-white/20 text-white'
  },
  mechanic: {
    gradient: 'from-orange-500 via-amber-600 to-rose-600',
    accent: 'bg-orange-400/20 text-orange-100',
    badgeColor: 'bg-black/25 text-white'
  },
  tailor: {
    gradient: 'from-purple-600 via-violet-700 to-indigo-900',
    accent: 'bg-purple-400/20 text-purple-100',
    badgeColor: 'bg-white/20 text-white'
  },
  sweeper: {
    gradient: 'from-teal-600 via-emerald-600 to-cyan-800',
    accent: 'bg-teal-400/20 text-teal-100',
    badgeColor: 'bg-white/20 text-white'
  }
};

const BannerHero = ({ onSelectCategory }) => {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-5 pb-2">
      
      {/* SkillServe Signature Master Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white shadow-xl shadow-indigo-950/20 p-6 sm:p-10 mb-5 border border-indigo-900/50">
        
        {/* Glow orb in the background */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3.5 shadow-sm">
            <Zap className="w-3.5 h-3.5 fill-white text-white" />
            <span>Guaranteed 15-Minute Doorstep Arrival</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-2 sm:mb-3">
            Instant Services for Every Home & Vehicle Need
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base font-normal mb-6 line-clamp-2">
            Book certified Electricians, Emergency Mechanics, Master Tailors & Trained Sweepers with one tap. Zero visiting charge on orders above ₹499!
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => onSelectCategory('all')}
              className="bg-white hover:bg-orange-50 text-slate-950 font-black text-sm sm:text-base px-6 py-3 rounded-2xl shadow-lg shadow-black/30 hover:shadow-xl transition-all transform active:scale-95 flex items-center gap-2 group"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              <span>30-Day Free Rework Guarantee</span>
            </div>
          </div>
        </div>

        {/* Hero Banner Floating Graphics */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block pointer-events-none opacity-85">
          <img 
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80" 
            alt="Services at home"
            className="w-full h-full object-cover object-center"
            style={{ maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 0%)' }}
          />
        </div>
      </div>

      {/* 4 Promo Cards with Custom Sophisticated Gradients */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {promoCards.map((card) => {
          const style = customPromoStyles[card.category] || customPromoStyles.technician;
          return (
            <div
              key={card.id}
              onClick={() => onSelectCategory(card.category)}
              className={`relative rounded-2xl sm:rounded-3xl overflow-hidden p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border border-white/10 group min-h-[165px] sm:min-h-[185px] bg-gradient-to-br ${style.gradient}`}
            >
              {/* Top Text Content */}
              <div className="relative z-10">
                <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${style.badgeColor} backdrop-blur-md mb-2`}>
                  {card.badge}
                </span>
                <h3 className="font-black text-sm sm:text-base text-white leading-tight mb-1">
                  {card.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-white/80 line-clamp-2 leading-tight">
                  {card.desc}
                </p>
              </div>

              {/* Bottom Button */}
              <div className="relative z-10 pt-3">
                <button className="bg-slate-950/80 hover:bg-slate-950 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs group-hover:scale-105 transition-transform inline-flex items-center gap-1.5">
                  <span>{card.buttonText}</span>
                  <span className="text-orange-400">→</span>
                </button>
              </div>

              {/* Background image subtle overlay */}
              <img 
                src={card.image} 
                alt={card.title}
                className="absolute -right-4 -bottom-4 w-28 h-28 object-cover rounded-full opacity-25 group-hover:opacity-40 transition-opacity pointer-events-none"
              />
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default BannerHero;
