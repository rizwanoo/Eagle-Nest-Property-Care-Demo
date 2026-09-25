import React, { useState, useEffect } from 'react';
import {
  SERVICES_DATA,
  BUSINESS_INFO,
  SERVICE_AREAS
} from '../data/businessInfo';
import {
  Check,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface BookingPageProps {
  initialServiceId?: string;
  onNavigateHome: () => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  initialServiceId,
  onNavigateHome
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || 'lawn-care'
  );

  // Step 2: Property
  const [propertyAddress, setPropertyAddress] = useState('');
  const [propertyCity, setPropertyCity] = useState('Milton');
  const [propertyZip, setPropertyZip] = useState('05468');
  const [propertyType, setPropertyType] = useState('Single Family Home');
  const [lotSize, setLotSize] = useState('1/4 - 1/2 Acre');
  const [jobDescription, setJobDescription] = useState('');

  // Step 3: Date & Time
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [timeWindow, setTimeWindow] = useState<'morning' | 'afternoon' | 'anytime'>('morning');
  const [frequency, setFrequency] = useState<'one-time' | 'recurring-biweekly' | 'recurring-weekly'>('one-time');

  // Step 4: Contact Info
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [contactMethod, setContactMethod] = useState<'phone' | 'text' | 'email'>('text');

  // Step 5: Photos & Notes
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [gateAccessNotes, setGateAccessNotes] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Step 6: Confirmation
  const [bookingReference, setBookingReference] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize dates for next 14 days
  const availableDates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      iso: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      monthName: d.toLocaleDateString('en-US', { month: 'short' }),
      dayNumber: d.getDate(),
      isWeekend: d.getDay() === 0 || d.getDay() === 6
    };
  });

  useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[1].iso);
    }
  }, []);

  const stepTitles = [
    'Select Service',
    'Property Details',
    'Date & Time',
    'Contact Info',
    'Review & Submit'
  ];

  const handleNextStep = () => {
    if (currentStep === 1 && !selectedServiceId) return;
    if (currentStep === 2 && !propertyAddress.trim()) {
      alert('Please enter your Vermont property street address.');
      return;
    }
    if (currentStep === 4 && (!fullName.trim() || !phone.trim() || !email.trim())) {
      alert('Please complete your name, phone number, and email address.');
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 6));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePhotoUploadMock = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setUploadedPhotos((prev) => [...prev, previewUrl]);
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ref = `EN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingReference(ref);

    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(6);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 700);
  };

  const selectedServiceObj = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  return (
    <div className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Step Indicator Header (Steps 1 to 5) */}
      {currentStep < 6 && (
        <div className="mb-8 sm:mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3 sm:pb-4">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#C8102E]">
                Online Booking Request
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-slate-900 tracking-tight">
                Schedule Your Property Service
              </h1>
            </div>
            {/* Step badge */}
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="bg-[#0B2545] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                Step {currentStep} of 5
              </span>
              <span className="text-slate-700 font-semibold">{stepTitles[currentStep - 1]}</span>
            </div>
          </div>

          {/* Responsive Progress Bar */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {stepTitles.map((label, idx) => {
              const stepNumber = idx + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;

              return (
                <div key={label} className="space-y-1">
                  <div
                    className={`h-1.5 sm:h-2 rounded-full transition-colors ${
                      isCompleted || isCurrent
                        ? 'bg-[#0B2545]'
                        : 'bg-slate-200'
                    }`}
                  />
                  <div
                    className={`text-[10px] sm:text-[11px] hidden md:block truncate ${
                      isCurrent
                        ? 'font-bold text-[#0B2545]'
                        : isCompleted
                        ? 'text-slate-700'
                        : 'text-slate-400'
                    }`}
                  >
                    {stepNumber}. {label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 1: SELECT SERVICE */}
      {currentStep === 1 && (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-150">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
              What do you need help with?
            </h2>
            <p className="text-xs text-slate-600">
              Select the primary service needed for your Vermont property.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {SERVICES_DATA.map((service) => {
              const isSelected = selectedServiceId === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`cursor-pointer rounded-2xl border-2 p-4 sm:p-5 transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#0B2545] bg-slate-50 shadow-md ring-1 ring-[#0B2545]'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#0B2545] border-[#0B2545] text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-sm font-display">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 mt-3 sm:mt-4">
                    <span>{service.typicalDuration}</span>
                    <span className="font-semibold text-slate-800">{service.startingPrice}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleNextStep}
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#0B2545] hover:bg-[#133966] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <span>Continue to Property Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PROPERTY DETAILS */}
      {currentStep === 2 && (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-150">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
              Tell us about your property
            </h2>
            <p className="text-xs text-slate-600">
              We need your address to check lot boundaries and ensure our equipment is prepared.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-6 shadow-xs">
            {/* Street Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Property Street Address *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. 25 Centre Dr"
                  value={propertyAddress}
                  onChange={(e) => setPropertyAddress(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] min-h-[44px]"
                />
              </div>
            </div>

            {/* Town & ZIP */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Town / City (Vermont) *
                </label>
                <select
                  value={propertyCity}
                  onChange={(e) => setPropertyCity(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] min-h-[44px]"
                >
                  {SERVICE_AREAS.map((a) => (
                    <option key={a.town} value={a.town}>
                      {a.town}, VT ({a.county})
                    </option>
                  ))}
                  <option value="Other">Other Northwest VT Town</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="05468"
                  value={propertyZip}
                  onChange={(e) => setPropertyZip(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] min-h-[44px]"
                />
              </div>
            </div>

            {/* Property Type & Lot Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] min-h-[44px]"
                >
                  <option>Single Family Home</option>
                  <option>Townhouse / Duplex</option>
                  <option>Rural / Acreage Property</option>
                  <option>Commercial / Rental Property</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Approximate Lot Size
                </label>
                <select
                  value={lotSize}
                  onChange={(e) => setLotSize(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] min-h-[44px]"
                >
                  <option>Under 1/4 Acre (Compact yard)</option>
                  <option>1/4 - 1/2 Acre (Standard yard)</option>
                  <option>1/2 - 1 Acre (Spacious yard)</option>
                  <option>1+ Acre (Large estate)</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Job Description or Specific Focus Areas
              </label>
              <textarea
                rows={3}
                placeholder="Let us know about specific tasks (e.g., steep slope in backyard, damaged back porch board, front garden bed cleanup, etc.)..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545]"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4">
            <button
              onClick={handlePrevStep}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNextStep}
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#0B2545] hover:bg-[#133966] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <span>Choose Date & Time</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DATE & TIME WINDOW */}
      {currentStep === 3 && (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-150">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
              Choose your preferred date & window
            </h2>
            <p className="text-xs text-slate-600">
              Select the day that works best for your schedule. We will confirm the exact arrival window.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-6 shadow-xs">
            {/* Service Frequency */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Service Cadence
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'one-time', label: 'One-Time Service' },
                  { id: 'recurring-biweekly', label: 'Every 2 Weeks' },
                  { id: 'recurring-weekly', label: 'Weekly Care' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFrequency(item.id as any)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all min-h-[44px] cursor-pointer ${
                      frequency === item.id
                        ? 'border-[#0B2545] bg-[#0B2545] text-white shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Grid */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Select Preferred Date
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-2">
                {availableDates.map((item) => {
                  const isSelected = selectedDate === item.iso;
                  return (
                    <button
                      key={item.iso}
                      type="button"
                      onClick={() => setSelectedDate(item.iso)}
                      className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center min-h-[58px] cursor-pointer ${
                        isSelected
                          ? 'border-[#0B2545] bg-[#0B2545] text-white shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-[9px] sm:text-[10px] uppercase font-semibold opacity-70">
                        {item.dayName}
                      </span>
                      <span className="text-sm sm:text-base font-black font-display my-0.5">
                        {item.dayNumber}
                      </span>
                      <span className="text-[9px] sm:text-[10px] opacity-70">
                        {item.monthName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Window */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Arrival Window Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {[
                  { id: 'morning', label: 'Morning Window', time: '8:00 AM - 12:00 PM' },
                  { id: 'afternoon', label: 'Afternoon Window', time: '12:00 PM - 5:00 PM' },
                  { id: 'anytime', label: 'Flexible / Anytime', time: 'First Available Slot' },
                ].map((slot) => {
                  const isSelected = timeWindow === slot.id;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setTimeWindow(slot.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all min-h-[50px] cursor-pointer ${
                        isSelected
                          ? 'border-[#0B2545] bg-slate-100 text-[#0B2545] font-bold shadow-2xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-semibold">{slot.label}</div>
                      <div className="text-[10px] sm:text-[11px] text-slate-500">{slot.time}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4">
            <button
              onClick={handlePrevStep}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNextStep}
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#0B2545] hover:bg-[#133966] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <span>Continue to Contact Info</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: CONTACT INFORMATION */}
      {currentStep === 4 && (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-150">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
              Your contact information
            </h2>
            <p className="text-xs text-slate-600">
              We will send your schedule confirmation and service updates here.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-6 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Miller"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] min-h-[44px]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Phone Number (for SMS confirmation) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="(802) 555-0182"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] min-h-[44px]"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="david@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] min-h-[44px]"
                />
              </div>
            </div>

            {/* Preferred Contact Method */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Preferred Confirmation Method
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { id: 'text', label: 'Text / SMS' },
                  { id: 'phone', label: 'Phone Call' },
                  { id: 'email', label: 'Email Only' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setContactMethod(opt.id as any)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all min-h-[44px] cursor-pointer ${
                      contactMethod === opt.id
                        ? 'border-[#0B2545] bg-[#0B2545] text-white shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4">
            <button
              onClick={handlePrevStep}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNextStep}
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#0B2545] hover:bg-[#133966] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <span>Review & Submit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: REVIEW, PHOTOS & FINAL SUBMISSION */}
      {currentStep === 5 && (
        <form onSubmit={handleSubmitBooking} className="space-y-6 sm:space-y-8 animate-in fade-in duration-150">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
              Review & Submit Booking Request
            </h2>
            <p className="text-xs text-slate-600">
              Optional property photos help us give an exact quote faster.
            </p>
          </div>

          {/* Photo Upload Zone */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800">
                Property Photos (Optional)
              </label>
              <span className="text-[11px] text-slate-500">Upload yard, deck, or repair areas</span>
            </div>

            <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 sm:p-6 text-center hover:border-slate-400 transition-colors bg-slate-50/50">
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                onChange={handlePhotoUploadMock}
                className="hidden"
              />
              <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-[#0B2545]">
                  Click to add photos or drag & drop
                </div>
                <div className="text-[11px] text-slate-400">
                  PNG, JPG up to 15MB each
                </div>
              </label>
            </div>

            {uploadedPhotos.length > 0 && (
              <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
                {uploadedPhotos.map((url, i) => (
                  <div key={i} className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border border-slate-200 shadow-2xs">
                    <img src={url} alt={`Upload ${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Special Instructions */}
            <div className="space-y-1.5 pt-2">
              <label className="block text-xs font-bold text-slate-800">
                Gate Code / Access Instructions
              </label>
              <input
                type="text"
                placeholder="e.g. Side gate unlocked, dogs inside during service"
                value={gateAccessNotes}
                onChange={(e) => setGateAccessNotes(e.target.value)}
                className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] min-h-[44px]"
              />
            </div>
          </div>

          {/* Booking Summary Recap Card */}
          <div className="bg-[#0B2545] text-white rounded-2xl p-4 sm:p-6 space-y-4 shadow-lg">
            <div className="text-xs font-bold uppercase tracking-wider text-[#C8102E]">
              Booking Summary Recap
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Service</span>
                <span className="font-bold text-white text-sm">{selectedServiceObj.title}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Property</span>
                <span className="font-semibold text-white">{propertyAddress || '25 Centre Dr'}, {propertyCity}, VT</span>
              </div>
              <div>
                <span className="text-slate-400 block">Scheduled Target</span>
                <span className="font-semibold text-white">{selectedDate} ({timeWindow})</span>
              </div>
              <div>
                <span className="text-slate-400 block">Contact</span>
                <span className="font-semibold text-white">{fullName || 'Customer'} ({phone || 'Pending'})</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4">
            <button
              type="button"
              onClick={handlePrevStep}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#C8102E] hover:bg-[#A50D24] rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              {isSubmitting ? (
                <span>Sending Booking Request...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Submit Booking Request</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* STEP 6: CONFIRMATION SCREEN */}
      {currentStep === 6 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 md:p-12 text-center space-y-6 shadow-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <div className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">
              Request Received
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              Thanks for choosing Eagle Nest Property Care!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We’ve logged your request for <strong>{selectedServiceObj.title}</strong> at <strong>{propertyAddress}, {propertyCity}, VT</strong>. We'll review your property details and contact you via {contactMethod} to confirm exact timing.
            </p>
          </div>

          {/* Reference Badge */}
          <div className="inline-block bg-slate-50 border border-slate-200 rounded-xl px-4 sm:px-5 py-2 sm:py-2.5 text-xs">
            <span className="text-slate-500">Booking Reference: </span>
            <span className="font-mono font-bold text-[#0B2545]">{bookingReference}</span>
          </div>

          {/* Next Steps Card */}
          <div className="max-w-md mx-auto bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 text-left text-xs space-y-3">
            <div className="font-bold text-slate-900">What Happens Next:</div>
            <div className="space-y-2 text-slate-600">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0B2545] text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                <span><strong>Verification:</strong> We check local satellite terrain and route scheduling for {propertyCity}.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0B2545] text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                <span><strong>Confirmation:</strong> You’ll receive a message at <strong>{phone}</strong> to confirm your slot.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0B2545] text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                <span><strong>Service Day:</strong> We arrive on time, complete the work with Eagle Scout care, and leave your property immaculate.</span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl bg-slate-50 min-h-[44px] cursor-pointer"
            >
              Print Summary
            </button>
            <button
              onClick={onNavigateHome}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0B2545] hover:bg-[#133966] rounded-xl transition-colors min-h-[44px] cursor-pointer"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
