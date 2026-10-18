import React from 'react';
import { ShieldCheck, Heart, Clock, Award, Sparkles } from 'lucide-react';

const Footer = ({ onSelectCategory }) => {
  return (
    <footer className="bg-white border-t border-slate-200/80 pt-12 pb-8 mt-16 text-slate-600">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 mb-10 border-b border-slate-100 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-lg flex-shrink-0 border border-orange-100">
              ⚡
            </div>
            <div>
              <h5 className="font-bold text-xs text-slate-900">15-Min Doorstep Arrival</h5>
              <p className="text-[11px] text-slate-400">Fastest on-demand service dispatch</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 border border-indigo-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-slate-900">Verified Professionals</h5>
              <p className="text-[11px] text-slate-400">Police verified & background checked</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 border border-purple-100">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-slate-900">30-Day Guarantee</h5>
              <p className="text-[11px] text-slate-400">Free rework if not fully satisfied</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-100">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-slate-900">Transparent Pricing</h5>
              <p className="text-[11px] text-slate-400">Fixed rate card, zero hidden fees</p>
            </div>
          </div>
        </div>

        {/* Links Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-xs">
          
          <div>
            <h4 className="font-black text-slate-900 text-sm mb-3">Useful Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-600 transition">About SkillServe</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Partner Registration</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Safety & Trust Guidelines</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Franchise & Dark Hubs</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">SkillServe Emergency SOS</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Careers & Hiring</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Customer Reviews</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-slate-900 text-sm mb-3">Top Services</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onSelectCategory('technician')} className="hover:text-indigo-600 text-left transition">AC Jet Cleaning & Gas Refill</button></li>
              <li><button onClick={() => onSelectCategory('technician')} className="hover:text-indigo-600 text-left transition">Emergency Electrician</button></li>
              <li><button onClick={() => onSelectCategory('technician')} className="hover:text-indigo-600 text-left transition">RO Water Purifier Service</button></li>
              <li><button onClick={() => onSelectCategory('mechanic')} className="hover:text-indigo-600 text-left transition">15-Min Bike Puncture SOS</button></li>
              <li><button onClick={() => onSelectCategory('mechanic')} className="hover:text-indigo-600 text-left transition">Car Battery Jumpstart</button></li>
              <li><button onClick={() => onSelectCategory('tailor')} className="hover:text-indigo-600 text-left transition">Doorstep Suit & Kurti Stitching</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-slate-900 text-sm mb-3">Home & Cleaning</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onSelectCategory('sweeper')} className="hover:text-indigo-600 text-left transition">Instant Home Sweeper</button></li>
              <li><button onClick={() => onSelectCategory('sweeper')} className="hover:text-indigo-600 text-left transition">Floor Wet Mopping & Dusting</button></li>
              <li><button onClick={() => onSelectCategory('sweeper')} className="hover:text-indigo-600 text-left transition">Deep Bathroom Descaling</button></li>
              <li><button onClick={() => onSelectCategory('sweeper')} className="hover:text-indigo-600 text-left transition">Kitchen Degreasing & Chimney</button></li>
              <li><button onClick={() => onSelectCategory('carpenter')} className="hover:text-indigo-600 text-left transition">Carpenter & Furniture Repair</button></li>
              <li><button onClick={() => onSelectCategory('plumber')} className="hover:text-indigo-600 text-left transition">Plumber Tap & Pipe Fix</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-slate-900 text-sm mb-3">Legal & Safety</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-600 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Cancellation & Refund Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">30-Day Service Warranty Terms</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Anti-Bribery & Code of Conduct</a></li>
            </ul>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-900 block mb-1">
                24x7 Customer Support:
              </span>
              <span className="text-xs font-black text-indigo-700">
                support@skillserve.com | 1800-SKILL-SERVE
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© 2026 SkillServe Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-500 font-medium">
            Next-Gen On-Demand Services Platform
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
