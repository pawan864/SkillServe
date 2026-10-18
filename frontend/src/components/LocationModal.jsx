import React, { useState } from 'react';
import { X, MapPin, Check, Search, Compass } from 'lucide-react';
import { useLocation } from '../context/LocationContext';

const LocationModal = () => {
  const { 
    location, 
    quickCities, 
    isLocationModalOpen, 
    setIsLocationModalOpen, 
    updateLocation 
  } = useLocation();

  const [searchCity, setSearchCity] = useState('');
  const [customFlat, setCustomFlat] = useState('');
  const [customStreet, setCustomStreet] = useState('');
  const [customPincode, setCustomPincode] = useState('');

  if (!isLocationModalOpen) return null;

  const filteredCities = quickCities.filter(c => 
    c.city.toLowerCase().includes(searchCity.toLowerCase()) ||
    c.pincode.includes(searchCity)
  );

  const handleSaveCustom = (e) => {
    e.preventDefault();
    if (!customStreet || !customPincode) return;
    updateLocation({
      city: customStreet + ', India',
      address: customFlat || 'Home / Flat',
      pincode: customPincode
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative animate-scaleUp border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-black text-base text-slate-900">Select Service Location</h3>
            <p className="text-xs text-slate-500">Fast 15-minute dispatch in supported zones</p>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Search Box */}
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="Search your city or pin code..."
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition"
            />
          </div>

          {/* Quick Popular Service Areas */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Popular Service Zones
            </span>
            <div className="space-y-1.5">
              {filteredCities.map((item, idx) => {
                const isCurrent = location.pincode === item.pincode;
                return (
                  <div
                    key={idx}
                    onClick={() => updateLocation(item)}
                    className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                      isCurrent 
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-xs' 
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className={`w-4 h-4 ${isCurrent ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <div>
                        <p className={`text-xs font-bold ${isCurrent ? 'text-indigo-950' : 'text-slate-800'}`}>
                          {item.city}
                        </p>
                        <p className="text-[11px] text-slate-500">{item.address} - {item.pincode}</p>
                      </div>
                    </div>
                    {isCurrent && <Check className="w-4 h-4 text-indigo-600 stroke-[3]" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Address Input Form */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Or Enter Custom Address
            </span>
            <form onSubmit={handleSaveCustom} className="space-y-2">
              <input
                type="text"
                value={customFlat}
                onChange={(e) => setCustomFlat(e.target.value)}
                placeholder="House / Flat / Block No."
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-indigo-600"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={customStreet}
                  onChange={(e) => setCustomStreet(e.target.value)}
                  placeholder="Street / Area / City"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-indigo-600"
                />
                <input
                  type="text"
                  value={customPincode}
                  onChange={(e) => setCustomPincode(e.target.value)}
                  placeholder="PIN Code (e.g. 144401)"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-indigo-600"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-xs font-bold py-2.5 rounded-xl shadow-md shadow-indigo-600/20 transition"
              >
                Set Delivery Location
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LocationModal;
