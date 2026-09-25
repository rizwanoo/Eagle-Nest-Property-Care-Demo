import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { Phone, Calendar, Menu, X, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, serviceId?: string) => void;
  onOpenQuickQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenQuickQuote
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'booking', label: 'Book Service' },
    { id: 'about', label: 'About & Story' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-slate-200 py-2.5 sm:py-3'
            : 'bg-white border-slate-100 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          {/* Zone 1: Brand Lockup */}
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center text-left focus-visible:outline-2 focus-visible:outline-[#C8102E] rounded-md transition-opacity hover:opacity-95 shrink-0 cursor-pointer min-h-[44px]"
            aria-label="Eagle's Nest Property Care Home"
          >
            <BrandLogo variant="horizontal" size="sm" />
          </button>

          {/* Zone 2: Clean text navigation links (Desktop) */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium text-slate-700">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`relative py-1 text-xs lg:text-sm font-semibold tracking-wide transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#C8102E] rounded-xs cursor-pointer ${
                    isActive
                      ? 'text-[#0B2545]'
                      : 'text-slate-600 hover:text-[#0B2545]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8102E] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenQuickQuote}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#0B2545] border border-slate-200 hover:border-slate-300 rounded-lg bg-slate-50 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#0B2545] cursor-pointer min-h-[40px]"
            >
              Request Quote
            </button>

            <button
              onClick={() => onNavigate('booking')}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white bg-[#0B2545] hover:bg-[#133966] active:bg-[#07162C] border border-[#0B2545] rounded-lg shadow-xs transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B2545] cursor-pointer min-h-[40px]"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>Book Online</span>
            </button>

            {/* Mobile Quick Action on <640px */}
            <button
              onClick={() => onNavigate('booking')}
              className="sm:hidden inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white bg-[#0B2545] rounded-lg min-h-[38px] cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>Book</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#0B2545] cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer & Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="relative z-10 w-full bg-white border-b border-slate-200 shadow-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <BrandLogo variant="horizontal" size="sm" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-900 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between min-h-[44px] ${
                    currentPage === link.id
                      ? 'bg-slate-100 text-[#0B2545]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {currentPage === link.id && <div className="w-2 h-2 rounded-full bg-[#C8102E]" />}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  onOpenQuickQuote();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 text-center text-sm font-semibold text-[#0B2545] border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors min-h-[44px]"
              >
                Free Instant Quote Request
              </button>
              <button
                onClick={() => {
                  onNavigate('booking');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 text-center text-sm font-bold uppercase tracking-wider text-white bg-[#0B2545] hover:bg-[#133966] rounded-xl transition-colors flex items-center justify-center gap-2 min-h-[44px] shadow-sm"
              >
                <Calendar className="w-4 h-4 text-[#C8102E]" />
                <span>Book Property Service</span>
              </button>
            </div>

            <div className="pt-2 text-center text-xs text-slate-500">
              <span>Serving Milton, South Burlington, Essex & Chittenden County</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
