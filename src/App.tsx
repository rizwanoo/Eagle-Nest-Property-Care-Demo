/**
 * Eagle Nest Property Care - Premium Website Application
 * Milton, Vermont
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingActionBar } from './components/FloatingActionBar';
import { QuickQuoteModal } from './components/QuickQuoteModal';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { BookingPage } from './pages/BookingPage';
import { AboutContactPage } from './pages/AboutContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'services' | 'booking' | 'about' | 'contact'>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>('lawn-care');
  const [isQuickQuoteOpen, setIsQuickQuoteOpen] = useState(false);
  const [quickQuoteServiceId, setQuickQuoteServiceId] = useState<string | undefined>(undefined);

  const handleNavigate = (page: string, serviceId?: string) => {
    if (page === 'contact') {
      setCurrentPage('about');
      window.scrollTo({ top: 900, behavior: 'smooth' });
      return;
    }

    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    setCurrentPage(page as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuickQuote = (serviceId?: string) => {
    setQuickQuoteServiceId(serviceId || selectedServiceId || 'lawn-care');
    setIsQuickQuoteOpen(true);
  };

  const handleCloseQuickQuote = () => {
    setIsQuickQuoteOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-[#C8102E] selection:text-white">
      {/* Universal Top Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenQuickQuote={() => handleOpenQuickQuote()}
      />

      {/* Main Page Routing */}
      <main className="flex-1 pb-16 md:pb-0">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenQuickQuote={handleOpenQuickQuote}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onOpenQuickQuote={handleOpenQuickQuote}
          />
        )}

        {currentPage === 'booking' && (
          <BookingPage
            initialServiceId={selectedServiceId}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'about' && (
          <AboutContactPage
            onNavigateBooking={() => handleNavigate('booking')}
            onOpenQuickQuote={handleOpenQuickQuote}
          />
        )}
      </main>

      {/* Persistent Mobile & Desktop Conversion Bars */}
      <FloatingActionBar
        onNavigate={handleNavigate}
        onOpenQuickQuote={() => handleOpenQuickQuote()}
      />

      {/* Quick Quote Modal */}
      <QuickQuoteModal
        isOpen={isQuickQuoteOpen}
        onClose={handleCloseQuickQuote}
        preselectedServiceId={quickQuoteServiceId}
        onNavigateToFullBooking={() => handleNavigate('booking', quickQuoteServiceId)}
      />

      {/* Universal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuickQuote={() => handleOpenQuickQuote()}
      />
    </div>
  );
}
