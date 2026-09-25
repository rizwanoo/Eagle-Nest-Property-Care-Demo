import React from 'react';
import { BrandLogo } from './BrandLogo';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO, SERVICE_AREAS } from '../data/businessInfo';

interface FooterProps {
  onNavigate: (page: string, serviceId?: string) => void;
  onOpenQuickQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuickQuote }) => {
  return (
    <footer className="bg-[#07162C] text-slate-300 border-t border-slate-800 pt-10 sm:pt-16 pb-20 md:pb-12 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Top Pre-Footer Callout */}
        <div className="bg-[#0B2545] border border-slate-700/60 rounded-3xl p-5 sm:p-8 mb-10 sm:mb-14 text-white flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#C8102E]">
              Vermont Homeowners & Property Managers
            </div>
            <h3 className="text-lg sm:text-2xl font-bold font-display tracking-tight leading-tight">
              Ready to get your property in peak condition?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              From routine lawn maintenance to seasonal yard cleanups and punch-list repairs, get upfront pricing and prompt service.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={onOpenQuickQuote}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-600 rounded-xl transition-colors text-center cursor-pointer min-h-[44px]"
            >
              Request Free Quote
            </button>
            <button
              onClick={() => onNavigate('booking')}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#C8102E] hover:bg-[#A50D24] rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <span>Book Service Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8 pb-10 sm:pb-12 border-b border-slate-800 text-sm">
          {/* Col 1: Brand & Promise */}
          <div className="space-y-3.5 sm:space-y-4">
            <div className="bg-white rounded-xl p-2.5 sm:p-3 inline-block shadow-xs">
              <BrandLogo variant="horizontal" size="sm" />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {BUSINESS_INFO.missionStatement}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Independent Vermont Property Care</span>
            </div>
            <div className="pt-0.5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors min-h-[36px]"
              >
                <span>Find us on Facebook</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">Home Improvement</span>
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Property Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('services', 'lawn-care')}
                  className="text-slate-400 hover:text-white transition-colors text-left min-h-[32px] inline-flex items-center"
                >
                  Lawn Care & Precision Mowing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services', 'yard-cleanup')}
                  className="text-slate-400 hover:text-white transition-colors text-left min-h-[32px] inline-flex items-center"
                >
                  Spring & Fall Yard Cleanup
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services', 'small-repairs')}
                  className="text-slate-400 hover:text-white transition-colors text-left min-h-[32px] inline-flex items-center"
                >
                  Small Repairs & Minor Carpentry
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services', 'property-maintenance')}
                  className="text-slate-400 hover:text-white transition-colors text-left min-h-[32px] inline-flex items-center"
                >
                  General Property Maintenance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services', 'winter-maintenance')}
                  className="text-slate-400 hover:text-white transition-colors text-left min-h-[32px] inline-flex items-center"
                >
                  Winter Property Maintenance
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Areas */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Service Areas (VT)
            </h4>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-slate-400">
              {SERVICE_AREAS.slice(0, 8).map((area) => (
                <button
                  key={area.town}
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors py-1 inline-flex items-center"
                >
                  {area.town}, VT
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Serving Milton, Chittenden County, Franklin County, and surrounding Northwest Vermont communities.
            </p>
          </div>

          {/* Col 4: Verified Contact */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Location & Contact
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
                <span>
                  {BUSINESS_INFO.address}<br />
                  {BUSINESS_INFO.city}, {BUSINESS_INFO.state} {BUSINESS_INFO.zip}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneFormatted}`} className="hover:text-white transition-colors font-medium py-1">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="hover:text-white transition-colors py-1">
                  {BUSINESS_INFO.email}
                </span>
              </div>
              <div className="flex items-start gap-2.5 pt-0.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div>Mon - Fri: 7:00 AM - 6:00 PM</div>
                  <div className="text-slate-500">Sat: 8:00 AM - 4:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Eagle Nest Property Care. All rights reserved. Milton, Vermont.
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs">
            <span>Quality Work</span>
            <span>·</span>
            <span>Honest Service</span>
            <span>·</span>
            <span>Done Right</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
