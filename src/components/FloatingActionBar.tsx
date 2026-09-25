import React from 'react';
import { Phone, FileText, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';

interface FloatingActionBarProps {
  onNavigate: (page: string) => void;
  onOpenQuickQuote: () => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  onNavigate,
  onOpenQuickQuote,
}) => {
  return (
    <>
      {/* Mobile Bottom Sticky Action Bar (Strictly <= 15% viewport height with safe area inset support) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl px-2.5 pt-1.5 pb-safe">
        <div className="grid grid-cols-3 gap-1.5 max-w-md mx-auto">
          {/* Action 1: Call */}
          <a
            href={`tel:${BUSINESS_INFO.phoneFormatted}`}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 active:bg-slate-100 transition-colors min-h-[44px] cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#C8102E] mb-0.5" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-tight">Call Us</span>
          </a>

          {/* Action 2: Quote */}
          <button
            onClick={onOpenQuickQuote}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 active:bg-slate-100 transition-colors min-h-[44px] cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#0B2545] mb-0.5" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-tight">Get Quote</span>
          </button>

          {/* Action 3: Book Online */}
          <button
            onClick={() => onNavigate('booking')}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#0B2545] text-white shadow-xs active:bg-[#07162C] transition-colors min-h-[44px] cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#C8102E] mb-0.5" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">Book Now</span>
          </button>
        </div>
      </div>

      {/* Desktop & Tablet Floating Action Widget (Quiet, high-converting) */}
      <div className="hidden lg:flex fixed bottom-6 right-6 z-40 items-center gap-3">
        <button
          onClick={onOpenQuickQuote}
          className="px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-[#0B2545] bg-white hover:bg-slate-50 border border-slate-200 rounded-full shadow-lg transition-all hover:scale-105 flex items-center gap-2 cursor-pointer min-h-[42px]"
        >
          <FileText className="w-4 h-4 text-[#C8102E]" />
          <span>Quick Quote</span>
        </button>

        <button
          onClick={() => onNavigate('booking')}
          className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0B2545] hover:bg-[#133966] rounded-full shadow-xl transition-all hover:scale-105 flex items-center gap-2 border border-slate-700/40 cursor-pointer min-h-[42px]"
        >
          <Calendar className="w-4 h-4 text-[#C8102E]" />
          <span>Book a Service</span>
        </button>
      </div>
    </>
  );
};
