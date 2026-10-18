import React, { useState, useEffect } from 'react';
import { 
  X, 
  Phone, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Car, 
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles
} from 'lucide-react';

const statusSteps = [
  { key: 'confirmed', label: 'Order Confirmed', desc: 'Booking received by nearest SkillServe hub' },
  { key: 'partner_assigned', label: 'Professional Assigned', desc: 'Rajesh Sharma accepted your request' },
  { key: 'on_the_way', label: 'On The Way', desc: 'En route to your location (12 mins away)' },
  { key: 'in_progress', label: 'Service In Progress', desc: 'Work has commenced at your address' },
  { key: 'completed', label: 'Service Completed', desc: 'Work verified & completed' },
];

const LiveTrackingModal = ({ booking, onClose, onUpdateStatus }) => {
  if (!booking) return null;

  const [currentStatus, setCurrentStatus] = useState(booking.status || 'partner_assigned');
  const [eta, setEta] = useState(booking.assignedPartner?.etaMinutes || 14);

  // Countdown timer simulation for instant 15 mins arrival
  useEffect(() => {
    if (currentStatus === 'completed' || currentStatus === 'cancelled') return;
    const interval = setInterval(() => {
      setEta((prev) => (prev > 1 ? prev - 1 : 1));
    }, 12000); // changes every 12s in simulation
    return () => clearInterval(interval);
  }, [currentStatus]);

  const partner = booking.assignedPartner || {
    name: 'Rajesh Sharma',
    phone: '+91 98765 43210',
    rating: 4.9,
    profession: 'Senior Technician',
    photo: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150',
    vehicleNumber: 'PB 09 AX 4421'
  };

  const getStepIndex = (status) => {
    const idx = statusSteps.findIndex(s => s.key === status);
    return idx >= 0 ? idx : 1;
  };

  const activeIndex = getStepIndex(currentStatus);

  const advanceStep = () => {
    if (activeIndex < statusSteps.length - 1) {
      const nextStatus = statusSteps[activeIndex + 1].key;
      setCurrentStatus(nextStatus);
      if (onUpdateStatus) onUpdateStatus(booking._id, nextStatus);
    }
  };

  const resetStep = () => {
    setCurrentStatus('partner_assigned');
    setEta(14);
    if (onUpdateStatus) onUpdateStatus(booking._id, 'partner_assigned');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full max-h-[95vh] overflow-hidden flex flex-col shadow-2xl relative animate-scaleUp border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white p-4 flex items-center justify-between border-b border-indigo-900/40">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full shadow-xs">
              LIVE DISPATCH
            </span>
            <span className="text-xs text-indigo-200">
              ID: {booking._id?.slice(-8) || 'B-98421'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Tracking Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-5">
          
          {/* Arrival Status Banner */}
          <div className="bg-gradient-to-r from-orange-50/80 via-indigo-50/60 to-slate-50 border border-indigo-100 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-black uppercase text-orange-600 tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 
                {currentStatus === 'completed' ? 'SERVICE COMPLETED' : `ARRIVING IN ~${eta} MINUTES`}
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-0.5">
                {currentStatus === 'completed' ? 'All done! Thank you.' : 'Professional is on the way'}
              </h3>
              <p className="text-xs text-slate-500">
                To: {booking.address?.flatNo}, {booking.address?.street}
              </p>
            </div>

            {/* OTP Security Box */}
            <div className="bg-white border-2 border-dashed border-indigo-600 rounded-2xl p-2.5 text-center shadow-xs">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                Start OTP
              </span>
              <span className="text-lg font-black text-indigo-700 tracking-widest">
                {booking.otp || '4821'}
              </span>
              <span className="text-[8px] text-slate-400 block">Share at door</span>
            </div>
          </div>

          {/* Assigned Partner Profile Card */}
          <div className="bg-white border border-slate-200/70 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={partner.photo}
                  alt={partner.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500 shadow-sm"
                />
                <span className="absolute -bottom-1 -right-1 bg-indigo-600 text-white rounded-full p-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-slate-900">{partner.name}</h4>
                  <span className="text-[11px] bg-amber-50 text-amber-900 font-bold px-1.5 py-0.2 rounded border border-amber-200/50">
                    ★ {partner.rating}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">{partner.profession}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                  <Car className="w-3 h-3 text-slate-400" />
                  <span>{partner.vehicleNumber}</span>
                </div>
              </div>
            </div>

            {/* Call Partner Button */}
            <a
              href={`tel:${partner.phone}`}
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-2xl shadow-sm hover:shadow-md transition active:scale-95"
              title="Call Professional"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

          {/* Live Progress Timeline Stepper */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-4">
              Live Progress
            </h4>
            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {statusSteps.map((step, idx) => {
                const isDone = idx <= activeIndex;
                const isCurrent = idx === activeIndex;

                return (
                  <div key={step.key} className="flex items-start gap-3 relative">
                    <div 
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 z-10 transition-colors ${
                        isDone
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      } ${isCurrent ? 'ring-4 ring-indigo-100' : ''}`}
                    >
                      {isDone ? '✓' : idx + 1}
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                        {step.label}
                      </p>
                      <p className="text-[11px] text-slate-500">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Test Simulation Controls */}
          <div className="bg-indigo-50/60 rounded-2xl p-3.5 border border-indigo-100 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-indigo-950 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Interactive Demo Simulator</span>
            </div>
            <p className="text-slate-600 text-[11px] mb-2.5">
              Test the real-time workflow by moving the partner's status forward:
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={advanceStep}
                disabled={activeIndex >= statusSteps.length - 1}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1 shadow-xs"
              >
                <Play className="w-3 h-3" />
                <span>Simulate Next Step</span>
              </button>
              <button
                onClick={resetStep}
                className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold px-2.5 py-1.5 rounded-xl transition flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Booked Services Summary */}
          <div className="border-t border-slate-100 pt-3 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Booked Services
            </span>
            {booking.items?.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs text-slate-700">
                <span>{item.title} × {item.quantity}</span>
                <span className="font-bold text-slate-900">₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between text-xs font-black text-slate-900 pt-2 border-t border-slate-100">
              <span>Total Paid via {booking.paymentMethod?.toUpperCase() || 'UPI'}</span>
              <span className="text-indigo-700 font-extrabold">₹{booking.billDetails?.finalAmount || 0}</span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-slate-500">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Need assistance? 24x7 SkillServe Help</span>
          </div>
          <button
            onClick={onClose}
            className="font-bold text-indigo-600 hover:text-indigo-700"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};

export default LiveTrackingModal;
