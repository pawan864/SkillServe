import React from 'react';

const CategoryGrid = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Explore Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Book certified instant technicians, mechanics, tailors & sweepers
          </p>
        </div>
        {selectedCategory !== 'all' && (
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-1.5 rounded-full transition"
          >
            Show All Services
          </button>
        )}
      </div>

      {/* Grid of modern category cards */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <div
              key={cat.slug}
              onClick={() => onSelectCategory(isSelected ? 'all' : cat.slug)}
              className="flex flex-col items-center cursor-pointer group text-center"
            >
              {/* Category Card Container */}
              <div 
                className={`w-full aspect-square rounded-2xl p-2.5 sm:p-3 flex items-center justify-center relative transition-all duration-200 ${
                  isSelected 
                    ? 'bg-indigo-50/80 border-2 border-indigo-600 shadow-md shadow-indigo-600/15 scale-105' 
                    : 'bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-indigo-300 hover:shadow-sm'
                }`}
              >
                {/* 15 Mins Badge */}
                {cat.badge && (
                  <span className="absolute top-1.5 right-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase shadow-xs">
                    {cat.badge}
                  </span>
                )}

                {/* Category Image with fallback icon */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-xl"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <span className="text-3xl hidden group-has-[img:hidden]:block">
                    {cat.icon}
                  </span>
                </div>
              </div>

              {/* Category Name Label */}
              <span 
                className={`mt-2 text-xs font-semibold leading-tight line-clamp-2 px-1 transition-colors ${
                  isSelected ? 'text-indigo-600 font-bold' : 'text-slate-800 group-hover:text-indigo-600'
                }`}
              >
                {cat.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;
