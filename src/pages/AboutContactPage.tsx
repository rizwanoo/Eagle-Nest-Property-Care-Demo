import React, { useState } from 'react';
import { BrandLogo } from '../components/BrandLogo';
import {
  BUSINESS_INFO,
  SERVICE_AREAS
} from '../data/businessInfo';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  HelpCircle,
  Award,
  HeartHandshake,
  Compass,
  ArrowRight
} from 'lucide-react';

interface AboutContactPageProps {
  onNavigateBooking: () => void;
  onOpenQuickQuote: () => void;
}

export const AboutContactPage: React.FC<AboutContactPageProps> = ({
  onNavigateBooking,
  onOpenQuickQuote
}) => {
  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Active FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setContactSubmitted(true);
    }, 600);
  };

  const faqs = [
    {
      q: "Do you offer free quotes for Vermont homeowners?",
      a: "Yes! Every quote is 100% free and transparent. You can request a quote online, specify what you need, and we’ll review property details and provide straightforward pricing."
    },
    {
      q: "What areas of Vermont do you regularly service?",
      a: "We are based at 25 Centre Dr in Milton, VT and provide regular service throughout Milton, South Burlington, Essex Junction, Williston, Colchester, Winooski, and across Chittenden & Franklin County."
    },
    {
      q: "What does the Eagle Scout commitment mean for your service?",
      a: "It represents our founding standard of doing things right the first time: arriving when promised, taking pride in clean cuts and solid repairs, leaving your property cleaner than we found it, and providing honest pricing without games."
    },
    {
      q: "How do you handle Vermont weather disruptions?",
      a: "Vermont weather can change rapidly. If heavy rain or storms prevent safe lawn care or outdoor repairs on your scheduled date, we contact you immediately and reschedule your service to the earliest possible clear window."
    },
    {
      q: "Can I book recurring seasonal services or regular lawn care?",
      a: "Absolutely. We offer weekly and bi-weekly lawn maintenance, as well as seasonal bundles that cover spring cleanup, regular mowing, fall leaf management, and winter entryway maintenance."
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-20 lg:space-y-24 py-6 sm:py-8 w-full overflow-hidden">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="bg-[#0B2545] rounded-3xl text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-slate-700/60 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">
              Our Story & Commitment
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
              Built on Hard Work, Honesty & Service
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed">
              Based in Milton, Vermont, Eagle Nest Property Care was founded on the fundamental principle that caring for a homeowner's property requires genuine dedication, craftsmanship, and integrity.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Brand Story & Eagle Scout Commitment */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="space-y-1.5 sm:space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">
                The Eagle Standard
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-slate-900 tracking-tight">
                An Eagle Scout’s Commitment to Doing Things Right
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                In an industry where contractors often rush through jobs or fail to return calls, Eagle Nest Property Care is built differently. We believe that true property care isn't just about cutting grass or fixing a board—it's about respecting the homeowner's investment and doing every task thoroughly.
              </p>
              <p>
                Whether we’re performing a multi-acre lawn cut in South Burlington, clearing heavy spring thatch in Milton, or replacing weather-worn deck boards in Essex Junction, we bring an Eagle Scout’s discipline: prompt communication, thorough cleanup, and honest, upfront pricing.
              </p>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                <Award className="w-5 h-5 text-[#C8102E]" />
                <div className="font-bold text-slate-900 text-xs font-display">Craftsmanship</div>
                <p className="text-[11px] text-slate-600">Sharp edges, sturdy repairs, and zero cut corners.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                <HeartHandshake className="w-5 h-5 text-[#0B2545]" />
                <div className="font-bold text-slate-900 text-xs font-display">Honest Service</div>
                <p className="text-[11px] text-slate-600">Upfront quotes, transparent communication, and reliable visits.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                <Compass className="w-5 h-5 text-emerald-600" />
                <div className="font-bold text-slate-900 text-xs font-display">Vermont Pride</div>
                <p className="text-[11px] text-slate-600">Dedicated local care for our Green Mountain communities.</p>
              </div>
            </div>
          </div>

          {/* Right Visual Badge Frame */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md text-center max-w-xs sm:max-w-sm w-full space-y-4 sm:space-y-6">
              <BrandLogo variant="badge" size="responsive" />
              <div className="space-y-1">
                <h3 className="font-badge font-bold text-base sm:text-lg text-[#0B2545]">
                  EAGLE'S NEST
                </h3>
                <p className="text-xs font-script text-base text-slate-700">
                  "Built on Hard Work, Honesty & Service"
                </p>
              </div>
              <div className="text-xs text-slate-500 border-t border-slate-100 pt-3 sm:pt-4 space-y-1">
                <div>Independent Local Business</div>
                <div className="font-semibold text-slate-800">25 Centre Dr, Milton, VT 05468</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Verified Location & Contact Form */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Column: Contact & Location Details */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="space-y-1.5 sm:space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">
                Get In Touch
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                Contact Eagle Nest Property Care
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Have questions about a property project, need a custom estimate, or want to discuss seasonal care? Reach out directly.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-3.5 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C8102E] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Business Address</div>
                  <div className="text-slate-600">{BUSINESS_INFO.fullAddress}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#0B2545] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Phone Support</div>
                  <a href={`tel:${BUSINESS_INFO.phoneFormatted}`} className="text-slate-700 hover:text-[#0B2545] font-semibold min-h-[36px] inline-flex items-center">
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Email Inquiries</div>
                  <div className="text-slate-600">{BUSINESS_INFO.email}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Hours of Operation</div>
                  <div className="text-slate-600">
                    Monday - Friday: 7:00 AM - 6:00 PM<br />
                    Saturday: 8:00 AM - 4:00 PM<br />
                    Sunday: Emergency / Seasonal On-Call
                  </div>
                </div>
              </div>
            </div>

            {/* Service Areas Summary */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-2.5">
              <div className="text-xs font-bold text-slate-900">Primary Vermont Service Towns:</div>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {SERVICE_AREAS.map((a) => (
                  <span key={a.town} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                    {a.town}, VT
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Send Message Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-xs">
            <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 mb-1">
              Send a Message
            </h3>
            <p className="text-xs text-slate-600 mb-5 sm:mb-6">
              Fill out the form below and we will get back to you promptly.
            </p>

            {contactSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base sm:text-lg font-bold text-emerald-900 font-display">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Thank you, <strong>{contactName}</strong>. We have received your note and will reply to <strong>{contactEmail || contactPhone}</strong> shortly.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setContactSubmitted(false);
                    setContactName('');
                    setContactEmail('');
                    setContactPhone('');
                    setContactMessage('');
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-emerald-900 bg-white border border-emerald-300 rounded-xl hover:bg-emerald-50 transition-colors min-h-[44px] cursor-pointer"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3.5 sm:space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-semibold text-slate-800">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] min-h-[44px]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block font-semibold text-slate-800">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(802) 555-0199"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-semibold text-slate-800">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] min-h-[44px]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block font-semibold text-slate-800">Property Address or Town</label>
                    <input
                      type="text"
                      placeholder="e.g. Milton, VT"
                      value={contactAddress}
                      onChange={(e) => setContactAddress(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-semibold text-slate-800">How can we help? *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the property services, repairs, or seasonal cleanups you are planning..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#0B2545] hover:bg-[#133966] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
                >
                  {isSending ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-[#C8102E]" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8 pb-10 sm:pb-12">
        <div className="text-center space-y-2 mb-8 sm:mb-10">
          <div className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">
            Common Questions
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 focus:outline-hidden min-h-[48px] cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 font-display">
                    {faq.q}
                  </span>
                  <span className={`text-slate-400 font-bold text-lg transition-transform shrink-0 ${isOpen ? 'rotate-45 text-[#C8102E]' : ''}`}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
