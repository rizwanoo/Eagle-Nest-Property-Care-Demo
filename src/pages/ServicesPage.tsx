import React, { useState } from 'react';
import { motion, type Variants } from 'motion/react';
import {
  SERVICES_DATA,
  ServiceItem,
  BUSINESS_INFO
} from '../data/businessInfo';
import {
  Check,
  Calendar,
  FileText,
  Clock,
  Sparkles,
  Calculator,
  ArrowRight,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string, serviceId?: string) => void;
  onOpenQuickQuote: (serviceId?: string) => void;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08
    }
  }
};

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenQuickQuote
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Estimator state
  const [estLotSize, setEstLotSize] = useState<'quarter' | 'half' | 'acre' | 'large'>('half');
  const [estServiceType, setEstServiceType] = useState<string>('lawn');
  const [estFrequency, setEstFrequency] = useState<'weekly' | 'biweekly' | 'onetime'>('biweekly');
  const [estIncludeTrimming, setEstIncludeTrimming] = useState(true);
  const [estIncludeHauling, setEstIncludeHauling] = useState(false);

  // Filter services
  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeCategory);

  // Calculate instant ballpark estimate guide
  const calculateEstimate = () => {
    let base = 55;
    if (estServiceType === 'lawn') {
      if (estLotSize === 'quarter') base = 45;
      else if (estLotSize === 'half') base = 65;
      else if (estLotSize === 'acre') base = 95;
      else base = 140;

      if (estFrequency === 'weekly') base *= 0.9; // 10% regular discount
    } else if (estServiceType === 'cleanup') {
      if (estLotSize === 'quarter') base = 180;
      else if (estLotSize === 'half') base = 280;
      else if (estLotSize === 'acre') base = 420;
      else base = 600;
    } else if (estServiceType === 'repairs') {
      base = 120; // baseline repair visit
    }

    if (estIncludeHauling) base += 40;
    return Math.round(base);
  };

  const estimatedPrice = calculateEstimate();

  return (
    <div className="space-y-12 sm:space-y-20 lg:space-y-24 py-6 sm:py-8 w-full overflow-hidden">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#0B2545] rounded-3xl text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-slate-700/60 relative overflow-hidden"
        >
          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">
              Dedicated Vermont Services
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
              Complete Property Care for Every Season
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed">
              We provide dependable, hands-on exterior care and punch-list repairs for homes in Milton, South Burlington, Essex Junction, and throughout Chittenden & Franklin County.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Category Filter Bar */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3 sm:pb-4">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 -mx-1 px-1">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'lawn', label: 'Lawn & Turf' },
              { id: 'seasonal', label: 'Seasonal Cleanups' },
              { id: 'repairs', label: 'Small Repairs' },
              { id: 'maintenance', label: 'General Care' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap cursor-pointer min-h-[40px] shrink-0 ${
                  activeCategory === tab.id
                    ? 'bg-[#0B2545] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 shrink-0">
            Showing {filteredServices.length} verified services
          </div>
        </div>
      </section>

      {/* Services List Detailed Cards */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="space-y-8 sm:space-y-12">
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeInUp}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              {/* Service Image */}
              <div className="lg:col-span-5 relative aspect-4/3 lg:aspect-auto h-56 sm:h-72 lg:h-full min-h-[220px] bg-slate-100 overflow-hidden group">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {service.badge && (
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#0B2545] text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-md shadow-md">
                    {service.badge}
                  </div>
                )}
              </div>

              {/* Service Info */}
              <div className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#C8102E]">
                      {service.category === 'lawn'
                        ? 'Lawn & Turf'
                        : service.category === 'seasonal'
                        ? 'Seasonal Care'
                        : service.category === 'repairs'
                        ? 'Carpentry & Fixes'
                        : 'Property Care'}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-xs font-medium text-slate-500 italic">
                      "{service.tagline}"
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Included List */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 space-y-2">
                    <div className="text-xs font-bold text-slate-800">What’s Included:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-xs text-slate-700">
                      {service.included.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ideal For & Duration Meta */}
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 text-xs text-slate-500 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{service.typicalDuration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{service.startingPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 sm:pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-slate-500 w-full sm:w-auto text-center sm:text-left">
                    Transparent, honest quote with zero hidden fees
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => onOpenQuickQuote(service.id)}
                      className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer min-h-[44px]"
                    >
                      Request Quote
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onNavigate('booking', service.id)}
                      className="flex-1 sm:flex-initial px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0B2545] hover:bg-[#133966] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                    >
                      <span>Book Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Ballpark Estimate Calculator */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeInUp}
          className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm"
        >
          <div className="max-w-3xl mb-6 sm:mb-8 space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C8102E]">
              <Calculator className="w-4 h-4" />
              <span>Instant Cost & Scope Estimator</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
              Estimate Your Property Project
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Get an instant baseline estimate for your Vermont property. Final pricing is confirmed following address verification or on-site walk.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 sm:space-y-6">
              {/* Step A: Service Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800">1. Service Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'lawn', label: 'Lawn Mowing & Edging' },
                    { id: 'cleanup', label: 'Seasonal Yard Cleanup' },
                    { id: 'repairs', label: 'Small Repairs & Carpentry' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setEstServiceType(item.id)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer min-h-[44px] ${
                        estServiceType === item.id
                          ? 'border-[#0B2545] bg-[#0B2545] text-white shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step B: Lot Size */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800">2. Approximate Lot Size</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'quarter', label: 'Under 1/4 Acre', sub: 'Townhome' },
                    { id: 'half', label: '1/4 - 1/2 Acre', sub: 'Suburban' },
                    { id: 'acre', label: '1/2 - 1 Acre', sub: 'Spacious' },
                    { id: 'large', label: '1+ Acre', sub: 'Estate' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setEstLotSize(item.id as any)}
                      className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer min-h-[50px] ${
                        estLotSize === item.id
                          ? 'border-[#0B2545] bg-slate-100 text-[#0B2545] font-bold shadow-2xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-semibold">{item.label}</div>
                      <div className="text-[10px] text-slate-500">{item.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step C: Options */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800">3. Project Options</label>
                <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-4 text-xs text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer min-h-[36px]">
                    <input
                      type="checkbox"
                      checked={estIncludeTrimming}
                      onChange={(e) => setEstIncludeTrimming(e.target.checked)}
                      className="rounded-xs text-[#0B2545] focus:ring-[#0B2545] w-4 h-4"
                    />
                    <span>Include perimeter trimming & blow-off</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer min-h-[36px]">
                    <input
                      type="checkbox"
                      checked={estIncludeHauling}
                      onChange={(e) => setEstIncludeHauling(e.target.checked)}
                      className="rounded-xs text-[#0B2545] focus:ring-[#0B2545] w-4 h-4"
                    />
                    <span>Debris hauling / leaf composting</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Calculated Box */}
            <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 text-center space-y-3 sm:space-y-4">
              <div className="text-xs text-slate-500 uppercase font-semibold">
                Estimated Starting Range
              </div>
              <div className="text-3xl sm:text-4xl font-black font-display text-[#0B2545] tabular-nums">
                ${estimatedPrice}
                <span className="text-xs font-normal text-slate-500 block mt-0.5">
                  {estServiceType === 'lawn' ? 'per visit estimate' : 'estimated project base'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Estimate includes labor, commercial equipment & thorough site cleanup.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('booking', estServiceType === 'lawn' ? 'lawn-care' : estServiceType === 'cleanup' ? 'yard-cleanup' : 'small-repairs')}
                className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#C8102E] hover:bg-[#A50D24] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <span>Book With This Estimate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* What to Expect Process */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeInUp}
          className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-10"
        >
          <div className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">
            Our Work Process
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            What to Expect on Service Day
          </h3>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-xs"
        >
          {[
            { step: '01', title: 'Schedule Online', desc: 'Pick your preferred date window and submit your property address in under 2 minutes.' },
            { step: '02', title: 'Prompt Confirmation', desc: 'We verify property requirements and confirm your schedule with clear timing.' },
            { step: '03', title: 'Hands-On Service', desc: 'We arrive on time with commercial-grade tools and carry out meticulous work.' },
            { step: '04', title: 'Thorough Walkthrough', desc: 'We blow down all hardscapes and leave your property cleaner than we found it.' },
          ].map((item) => (
            <motion.div
              key={item.step}
              variants={fadeInUp}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-2 shadow-2xs"
            >
              <div className="text-sm font-bold font-mono text-[#C8102E]">{item.step}</div>
              <div className="text-sm font-bold text-slate-900 font-display">{item.title}</div>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};
