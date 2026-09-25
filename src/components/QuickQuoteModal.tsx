import React, { useState } from 'react';
import { X, CheckCircle, Send, Upload, MapPin, Calendar } from 'lucide-react';
import { SERVICES_DATA, BUSINESS_INFO } from '../data/businessInfo';

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  onNavigateToFullBooking?: () => void;
}

export const QuickQuoteModal: React.FC<QuickQuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  onNavigateToFullBooking
}) => {
  const [service, setService] = useState(preselectedServiceId || 'lawn-care');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [timeframe, setTimeframe] = useState('Within 1-2 weeks');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate reliable lead capture processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative max-h-[92dvh] flex flex-col animate-in fade-in zoom-in-95 duration-200 my-auto">
        {/* Header */}
        <div className="bg-[#0B2545] text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div>
            <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#C8102E]">
              Eagle Nest Property Care
            </div>
            <h3 className="text-base sm:text-lg font-bold font-display leading-tight">
              Request a Free Property Quote
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-6 sm:py-8 space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                  Thanks — your request is on its way!
                </h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  We’ve received your inquiry for <strong>{name || 'your property'}</strong>. We will review your property details and contact you promptly with an honest, transparent estimate.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 text-left space-y-1">
                <div className="font-semibold text-slate-800">What happens next:</div>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                  <li>We review local Vermont satellite & property lot data</li>
                  <li>We reach out via your preferred method ({phone || email})</li>
                  <li>Schedule an on-site visit or provide upfront pricing</li>
                </ul>
              </div>
              <div className="pt-2 flex gap-3 justify-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0B2545] hover:bg-[#133966] rounded-lg transition-colors cursor-pointer min-h-[44px]"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="text-slate-600 pb-1">
                Tell us about your property project in Vermont. No pressure, no hidden fees.
              </div>

              {/* Service Select */}
              <div className="space-y-1">
                <label className="block font-semibold text-slate-800">
                  Select Primary Service *
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] min-h-[44px]"
                  required
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                  <option value="custom">Other / Multiple Property Tasks</option>
                </select>
              </div>

              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-semibold text-slate-800">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] min-h-[44px]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-semibold text-slate-800">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(802) 555-0142"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] min-h-[44px]"
                  />
                </div>
              </div>

              {/* Email & Town / Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-semibold text-slate-800">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] min-h-[44px]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-semibold text-slate-800">Property Address / Town *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 14 River Rd, Milton, VT"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] min-h-[44px]"
                  />
                </div>
              </div>

              {/* Timeframe */}
              <div className="space-y-1">
                <label className="block font-semibold text-slate-800">Preferred Timeline</label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] min-h-[44px]"
                >
                  <option>Urgent (Next 2-4 days)</option>
                  <option>Within 1-2 weeks</option>
                  <option>Next month / Seasonal planning</option>
                  <option>Flexible / Ongoing regular maintenance</option>
                </select>
              </div>

              {/* Job Notes */}
              <div className="space-y-1">
                <label className="block font-semibold text-slate-800">Project Details or Special Notes</label>
                <textarea
                  rows={2}
                  placeholder="Describe your yard, yard size, specific repair punch-list, or seasonal cleanup needs..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545]"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#0B2545] hover:bg-[#133966] rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer min-h-[44px]"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-[#C8102E]" />
                      <span>Request My Free Quote</span>
                    </>
                  )}
                </button>

                {onNavigateToFullBooking && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateToFullBooking();
                    }}
                    className="text-center text-[11px] text-slate-600 hover:text-[#0B2545] underline decoration-slate-300 py-1 min-h-[36px] flex items-center justify-center cursor-pointer"
                  >
                    Want to pick a specific calendar date? Use full online booking &rarr;
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
