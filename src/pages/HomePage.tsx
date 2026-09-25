import React, { useState } from 'react';
import { motion, type Variants } from 'motion/react';
import { BrandLogo } from '../components/BrandLogo';
import heroBgImg from '../assets/images/hero_vermont_property_1790335280039.jpg';
import {
  Calendar,
  FileText,
  Phone,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Shield,
  Sparkles,
  Search,
  Check,
  Clock,
  ThumbsUp,
  Wrench,
  Leaf,
  Sun,
  Snowflake,
  Trees
} from 'lucide-react';
import {
  BUSINESS_INFO,
  SERVICES_DATA,
  TRUST_PILLARS,
  SERVICE_AREAS
} from '../data/businessInfo';

interface HomePageProps {
  onNavigate: (page: string, serviceId?: string) => void;
  onOpenQuickQuote: (serviceId?: string) => void;
}

// Animation Variants for smooth Framer Motion scroll reveals
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

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenQuickQuote
}) => {
  const [coverageQuery, setCoverageQuery] = useState('');
  const [coverageResult, setCoverageResult] = useState<{
    found: boolean;
    area?: typeof SERVICE_AREAS[0];
    searched: boolean;
  }>({ found: false, searched: false });

  const handleCheckCoverage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverageQuery.trim()) return;

    const query = coverageQuery.toLowerCase().trim();
    const match = SERVICE_AREAS.find(
      (a) =>
        a.town.toLowerCase().includes(query) ||
        a.zip.includes(query) ||
        a.county.toLowerCase().includes(query)
    );

    setCoverageResult({
      found: !!match,
      area: match,
      searched: true
    });
  };

  return (
    <div className="space-y-12 sm:space-y-20 lg:space-y-24 overflow-hidden w-full">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#07162C] text-white">
        {/* Background Image with Scrim Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBgImg}
            alt="Pristine residential property in Vermont maintained by Eagle Nest Property Care"
            className="w-full h-full object-cover object-center opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07162C] via-[#07162C]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07162C] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headline & Action Flow */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 space-y-4 sm:space-y-6"
            >
              {/* Trust Tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] sm:text-xs text-slate-200 flex-wrap"
              >
                <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse shrink-0" />
                <span>Milton & Chittenden County, VT</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-300">Eagle Scout Commitment</span>
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white text-balance leading-[1.15]">
                  Reliable Property Care. <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                    Done Right.
                  </span>
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed pt-1 sm:pt-2">
                  From crisp lawn mowing and thorough seasonal cleanups to small carpentry repairs and ongoing maintenance, Eagle Nest Property Care keeps your Vermont property looking its best.
                </p>
              </div>

              {/* Core CTA Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('booking')}
                  className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#C8102E] hover:bg-[#A50D24] active:bg-[#85081A] rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer min-h-[44px]"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Book a Service</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenQuickQuote()}
                  className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <FileText className="w-4 h-4 text-slate-300" />
                  <span>Request Free Quote</span>
                </motion.button>

                <a
                  href={`tel:${BUSINESS_INFO.phoneFormatted}`}
                  className="hidden xl:inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-[#C8102E]" />
                  <span>{BUSINESS_INFO.phone}</span>
                </a>
              </div>

              {/* Verified Trust Strip */}
              <div className="pt-4 sm:pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Quality Workmanship</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Transparent Upfront Quotes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Local Vermont Service</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Visual Crest Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 flex justify-center w-full"
            >
              <div className="relative w-full max-w-xs sm:max-w-sm bg-gradient-to-b from-white/10 to-white/5 border border-white/15 rounded-3xl p-5 sm:p-6 backdrop-blur-md shadow-2xl flex flex-col items-center text-center space-y-3 sm:space-y-4">
                <BrandLogo variant="badge" size="responsive" />
                <div className="space-y-1">
                  <div className="font-badge text-white font-bold text-base sm:text-lg tracking-wide">
                    EAGLE NEST PROPERTY CARE
                  </div>
                  <div className="text-xs text-slate-300 font-script text-sm sm:text-base">
                    "{BUSINESS_INFO.slogan}"
                  </div>
                </div>
                <div className="w-full bg-[#0B2545]/80 border border-slate-700/60 rounded-xl p-3 text-left space-y-1 text-xs text-slate-300">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#C8102E]" />
                    <span>Based in Milton, VT</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    25 Centre Dr · Serving Chittenden & Franklin Counties
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. THE THREE PILLARS OF TRUST */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeInUp}
          className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-12"
        >
          <div className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">
            Our Foundation
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
            Quality Work. Honest Service. Done Right.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            We treat your home and yard with the same diligence, care, and respect as our own.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8"
        >
          {TRUST_PILLARS.map((pillar) => (
            <motion.div
              key={pillar.number}
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all relative overflow-hidden group flex flex-col justify-between"
            >
              <div className="space-y-2.5 sm:space-y-3">
                <div className="text-2xl font-black font-display text-[#0B2545] opacity-25 group-hover:opacity-40 transition-opacity">
                  {pillar.number}
                </div>
                <h3 className="text-base sm:text-lg font-bold font-display text-slate-900">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-[#0B2545]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] mr-2" />
                <span>The Eagle Standard</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. CORE SERVICES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-10"
        >
          <div className="space-y-1.5 sm:space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">
              What We Do
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              Featured Property Care Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Straightforward pricing, reliable scheduling, and meticulous attention to detail.
            </p>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2545] hover:text-[#C8102E] transition-colors self-start md:self-auto cursor-pointer min-h-[38px]"
          >
            <span>View All Detailed Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {SERVICES_DATA.slice(0, 3).map((service) => (
            <motion.div
              key={service.id}
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {service.badge && (
                    <div className="absolute top-3 left-3 bg-[#0B2545] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                      {service.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 space-y-2.5 sm:space-y-3">
                  <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Included bullets */}
                  <div className="space-y-1.5 pt-1 sm:pt-2">
                    {service.included.slice(0, 3).map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-3 mt-3 sm:mt-4">
                <button
                  onClick={() => onOpenQuickQuote(service.id)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer min-h-[38px]"
                >
                  Quote
                </button>
                <button
                  onClick={() => onNavigate('booking', service.id)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0B2545] hover:bg-[#133966] rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer min-h-[38px]"
                >
                  <span>Book Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. VERMONT SEASONAL SPOTLIGHT */}
      <section className="bg-slate-100 py-10 sm:py-16 lg:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-12"
          >
            <div className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">
              Year-Round Care
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              Prepared for Every Vermont Season
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Weather in Vermont changes fast. We keep your property pristine and functional in every climate shift.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {/* Spring */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-2.5 sm:space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold font-display text-slate-900">
                Spring Recovery
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Post-thaw branch removal, lawn de-thatching, winter debris cleanout, and garden bed edging.
              </p>
            </motion.div>

            {/* Summer */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-2.5 sm:space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold font-display text-slate-900">
                Summer Turf Care
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scheduled lawn mowing, sharp blade precision, perimeter string trimming, and sidewalk clearing.
              </p>
            </motion.div>

            {/* Fall */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-2.5 sm:space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                <Trees className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold font-display text-slate-900">
                Autumn Leaf Management
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Heavy leaf raking, vacuuming, hauling, perennial cutbacks, and pre-winter property prep.
              </p>
            </motion.div>

            {/* Winter */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-2.5 sm:space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Snowflake className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold font-display text-slate-900">
                Winter Upkeep
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Driveway, walkway, and entryway snow clearing with safe traction salting for peace of mind.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. VERMONT SERVICE AREA & INTERACTIVE COVERAGE CHECKER */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUp}
            className="lg:col-span-6 space-y-4 sm:space-y-6"
          >
            <div className="space-y-1.5 sm:space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">
                Local Service Area
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
                Proudly Serving Milton & Northwest Vermont
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Headquartered at <strong>25 Centre Dr in Milton, VT</strong>, we provide prompt, dependable property care across Chittenden County and Franklin County.
              </p>
            </div>

            {/* Coverage Towns List */}
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
              {SERVICE_AREAS.slice(0, 8).map((area) => (
                <div key={area.town} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/70">
                  <MapPin className="w-3.5 h-3.5 text-[#C8102E] shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900">{area.town}</span>
                    <span className="text-[10px] text-slate-500 block">{area.travelTimeFromMilton}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Checker Form */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
              <div className="text-xs font-bold text-slate-900">
                Check if your property is in our service zone:
              </div>
              <form onSubmit={handleCheckCoverage} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Enter town name or ZIP (e.g. 05468, Essex...)"
                    value={coverageQuery}
                    onChange={(e) => setCoverageQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] min-h-[44px]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0B2545] hover:bg-[#133966] rounded-lg transition-colors shrink-0 cursor-pointer min-h-[44px]"
                >
                  Check
                </button>
              </form>

              {coverageResult.searched && (
                <div
                  className={`p-3 rounded-lg text-xs flex items-start gap-2 animate-in fade-in duration-150 ${
                    coverageResult.found
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                      : 'bg-amber-50 border border-amber-200 text-amber-900'
                  }`}
                >
                  {coverageResult.found ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Yes! We service {coverageResult.area?.town}, VT ({coverageResult.area?.zip}).</strong>
                        <div className="text-[11px] text-emerald-800 mt-0.5">
                          {coverageResult.area?.county} · Travel: {coverageResult.area?.travelTimeFromMilton} from Milton base.
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Custom Travel Route:</strong> We service Milton and surrounding Northwest Vermont. Please submit a quick quote request and we'll confirm scheduling for your address.
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column: Stylized Vermont Map Illustration */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUp}
            className="lg:col-span-6 bg-[#0B2545] rounded-3xl p-5 sm:p-8 text-white shadow-xl relative overflow-hidden w-full"
          >
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-700/60 mb-4 sm:mb-6">
              <div>
                <div className="text-[11px] text-[#C8102E] font-bold uppercase tracking-wider">Base Operations</div>
                <div className="font-bold font-display text-base sm:text-lg">Milton, VT 05468</div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-slate-400">Coverage Radius</div>
                <div className="text-xs sm:text-sm font-semibold text-slate-200">Chittenden & Franklin</div>
              </div>
            </div>

            {/* Map visual graphic representation */}
            <div className="relative aspect-16/11 sm:aspect-16/10 rounded-2xl bg-[#07162C] border border-slate-700/50 p-3 sm:p-4 flex flex-col justify-between overflow-hidden">
              {/* Lake Champlain water boundary */}
              <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-blue-950/40 border-r border-blue-800/30 flex items-center justify-center">
                <span className="text-[9px] sm:text-[10px] text-blue-300/40 font-mono rotate-90 uppercase tracking-widest whitespace-nowrap">
                  Lake Champlain
                </span>
              </div>

              {/* Pins for key towns */}
              <div className="relative h-full w-full">
                {/* Milton Pin */}
                <div className="absolute top-[28%] left-[42%] sm:left-[45%] flex items-center gap-1 z-20">
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#C8102E] border-2 border-white shadow-lg flex items-center justify-center animate-bounce" />
                  <div className="bg-[#0B2545] border border-white/20 text-white text-[9px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md shadow-md whitespace-nowrap">
                    ★ Milton Base
                  </div>
                </div>

                {/* Essex Pin */}
                <div className="absolute top-[50%] left-[50%] sm:left-[54%] flex items-center gap-1 z-10">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 border border-white" />
                  <span className="text-[9px] sm:text-[10px] font-medium text-slate-200 bg-slate-900/80 px-1 py-0.5 rounded-xs">Essex</span>
                </div>

                {/* S Burlington Pin */}
                <div className="absolute top-[62%] left-[34%] sm:left-[40%] flex items-center gap-1 z-10">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 border border-white" />
                  <span className="text-[9px] sm:text-[10px] font-medium text-slate-200 bg-slate-900/80 px-1 py-0.5 rounded-xs">S. Burlington</span>
                </div>

                {/* Williston Pin */}
                <div className="absolute top-[64%] left-[58%] sm:left-[62%] flex items-center gap-1 z-10">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 border border-white" />
                  <span className="text-[9px] sm:text-[10px] font-medium text-slate-200 bg-slate-900/80 px-1 py-0.5 rounded-xs">Williston</span>
                </div>

                {/* Franklin County Pin */}
                <div className="absolute top-[12%] left-[45%] sm:left-[48%] flex items-center gap-1 z-10">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 border border-white" />
                  <span className="text-[9px] sm:text-[10px] font-medium text-slate-200 bg-slate-900/80 px-1 py-0.5 rounded-xs">Franklin Co.</span>
                </div>
              </div>

              <div className="relative z-10 pt-2 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 border-t border-slate-800">
                <span>Direct travel to your property</span>
                <span className="text-slate-300 font-medium">Fast on-site estimates</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. CONVERSION CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pb-8 sm:pb-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeInUp}
          className="bg-gradient-to-br from-[#0B2545] to-[#07162C] text-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl border border-slate-700/60 relative overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">
              Book Your Property Care
            </div>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white leading-snug">
              Take the hassle out of maintaining your Vermont home.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Schedule your lawn care, seasonal cleanup, or punch-list repairs online in less than two minutes. We'll follow up with exact timing and transparent pricing.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('booking')}
                className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#C8102E] hover:bg-[#A50D24] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Start Online Booking</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onOpenQuickQuote()}
                className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <FileText className="w-4 h-4 text-slate-300" />
                <span>Request a Free Quote</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
