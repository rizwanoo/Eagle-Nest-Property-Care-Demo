/**
 * Eagle Nest Property Care - Verified Business Information & Data Model
 * Location: Milton, Vermont, USA
 */

import lawnImg from '../assets/images/service_lawn_yard_1790335292547.jpg';
import seasonalImg from '../assets/images/service_seasonal_cleanup_1790335304020.jpg';
import repairsImg from '../assets/images/service_small_repairs_1790335316546.jpg';
import propertyImg from '../assets/images/hero_vermont_property_1790335280039.jpg';
import winterImg from '../assets/images/service_winter_maintenance_1790335328849.jpg';

export interface ServiceItem {
  id: string;
  category: 'lawn' | 'seasonal' | 'repairs' | 'maintenance';
  title: string;
  tagline: string;
  description: string;
  image: string;
  included: string[];
  idealFor: string;
  typicalDuration: string;
  startingPrice: string;
  badge?: string;
}

export interface ServiceArea {
  town: string;
  county: string;
  zip: string;
  status: 'Primary' | 'Covered' | 'By Request';
  coordinates: { x: number; y: number }; // percentage on VT map
  travelTimeFromMilton: string;
}

export const BUSINESS_INFO = {
  name: "Eagle Nest Property Care",
  shortName: "Eagle Nest",
  slogan: "Built on Hard Work, Honesty & Service",
  missionStatement: "Quality work. Honest service, and an Eagle Scout’s commitment to doing things right.",
  address: "25 Centre Dr",
  city: "Milton",
  state: "VT",
  zip: "05468",
  country: "United States",
  fullAddress: "25 Centre Dr, Milton, VT 05468, United States",
  phone: "(802) 893-CARE", // Clean placeholder representation
  phoneFormatted: "(802) 893-2273",
  email: "service@eaglenestpropertycare.com",
  hours: [
    { days: "Monday - Friday", hours: "7:00 AM - 6:00 PM" },
    { days: "Saturday", hours: "8:00 AM - 4:00 PM" },
    { days: "Sunday", hours: "Emergency / Seasonal On-Call" }
  ],
  facebookFollowers: 5,
  categories: ["Home Improvement", "Lawn Care", "Yard Cleanup", "Property Maintenance", "Small Repairs"],
  serviceAreasList: [
    "Milton, VT",
    "South Burlington South, VT",
    "South Burlington North, VT",
    "Essex Junction, VT",
    "Williston, VT",
    "Chittenden County, VT",
    "Franklin County, VT",
    "Colchester, VT",
    "Winooski, VT",
    "Burlington, VT",
    "Georgia, VT",
    "St. Albans, VT"
  ]
};

export const SERVICE_AREAS: ServiceArea[] = [
  { town: "Milton", county: "Chittenden County", zip: "05468", status: "Primary", coordinates: { x: 42, y: 28 }, travelTimeFromMilton: "Home Base" },
  { town: "Essex Junction", county: "Chittenden County", zip: "05452", status: "Primary", coordinates: { x: 50, y: 48 }, travelTimeFromMilton: "15-20 min" },
  { town: "South Burlington", county: "Chittenden County", zip: "05403", status: "Primary", coordinates: { x: 38, y: 56 }, travelTimeFromMilton: "20-25 min" },
  { town: "Williston", county: "Chittenden County", zip: "05495", status: "Primary", coordinates: { x: 55, y: 58 }, travelTimeFromMilton: "20-25 min" },
  { town: "Colchester", county: "Chittenden County", zip: "05446", status: "Covered", coordinates: { x: 35, y: 38 }, travelTimeFromMilton: "10-15 min" },
  { town: "Winooski", county: "Chittenden County", zip: "05404", status: "Covered", coordinates: { x: 39, y: 46 }, travelTimeFromMilton: "15 min" },
  { town: "Burlington", county: "Chittenden County", zip: "05401", status: "Covered", coordinates: { x: 32, y: 50 }, travelTimeFromMilton: "20 min" },
  { town: "Georgia", county: "Franklin County", zip: "05454", status: "Covered", coordinates: { x: 44, y: 18 }, travelTimeFromMilton: "10 min" },
  { town: "St. Albans", county: "Franklin County", zip: "05478", status: "Covered", coordinates: { x: 48, y: 10 }, travelTimeFromMilton: "20 min" },
  { town: "Shelburne", county: "Chittenden County", zip: "05482", status: "Covered", coordinates: { x: 35, y: 68 }, travelTimeFromMilton: "30 min" },
  { town: "Jericho & Underhill", county: "Chittenden County", zip: "05465", status: "Covered", coordinates: { x: 65, y: 45 }, travelTimeFromMilton: "25 min" },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "lawn-care",
    category: "lawn",
    title: "Lawn Care & Precision Mowing",
    tagline: "Crisp cuts, clean edge lines, and regular turf maintenance.",
    description: "Reliable, scheduled lawn mowing tailored to Vermont's growing season. We cut at healthy turf heights, string trim all borders, blow clippings clean from hard surfaces, and keep your property looking immaculate.",
    image: lawnImg,
    included: [
      "Precision cut with sharp commercial blades",
      "Perimeter string trimming around beds, fences & structures",
      "Clean pavement and flowerbed edge detailing",
      "Complete blow-off of driveways, decks, and walkways"
    ],
    idealFor: "Homeowners wanting a neat, consistent, hassle-free yard all season.",
    typicalDuration: "45 - 90 min per visit",
    startingPrice: "From $55 / visit",
    badge: "Most Popular"
  },
  {
    id: "yard-cleanup",
    category: "seasonal",
    title: "Seasonal Yard Cleanup (Spring & Fall)",
    tagline: "Post-winter thaw recovery and heavy autumn leaf management.",
    description: "Vermont seasons are demanding. Our thorough cleanup services remove fallen winter branches, thatch, deep autumn leaves, and bed debris to protect your lawn and prepare it for the months ahead.",
    image: seasonalImg,
    included: [
      "Complete leaf raking, collection, and hauling",
      "Sticks, downed twigs, and storm debris removal",
      "Perennial cutbacks and garden bed cleanup",
      "Gutter line check and base property tidying"
    ],
    idealFor: "Seasonal property transitions in April/May and October/November.",
    typicalDuration: "Half-day to full-day project",
    startingPrice: "Free on-site quote",
    badge: "Seasonal Essential"
  },
  {
    id: "small-repairs",
    category: "repairs",
    title: "Small Repairs & Carpentry Fixes",
    tagline: "Honest, reliable fixes for the punch-list items around your property.",
    description: "Got a loose porch railing, broken fence slat, sticking gate, or damaged exterior trim? We handle minor property repairs with true craftsman care so small problems don't turn into costly replacements.",
    image: repairsImg,
    included: [
      "Deck and porch board repairs & railing tightening",
      "Wood fence board replacement and latch adjustments",
      "Shed door alignment, exterior trim, and siding touch-ups",
      "Hardware tightening and minor carpentry tasks"
    ],
    idealFor: "Homeowners with a growing list of small fixes that need skilled hands.",
    typicalDuration: "2 - 6 hours",
    startingPrice: "From $85 / hr or project rate"
  },
  {
    id: "property-maintenance",
    category: "maintenance",
    title: "General Property Maintenance",
    tagline: "Ongoing exterior care to preserve curb appeal and property value.",
    description: "Proactive property upkeep for Milton and Chittenden County homeowners. From pressure washing walkways to clearing perimeter overgrowth and refreshing mulch beds, we keep every corner of your property tidy.",
    image: propertyImg,
    included: [
      "Walkway and patio surface pressure washing",
      "Mulch and soil spreading for garden beds",
      "Overgrowth brush trimming and light hedge shaping",
      "Routine exterior inspection & seasonal preparation"
    ],
    idealFor: "Homeowners wanting comprehensive curb appeal and preventative care.",
    typicalDuration: "Flexible scheduling",
    startingPrice: "Custom project quote"
  },
  {
    id: "winter-maintenance",
    category: "seasonal",
    title: "Winter Property Maintenance",
    tagline: "Driveway, walkway, and entryway winter accessibility.",
    description: "Dependable winter property attention for Vermont homes. We help keep critical walkways, stairs, and access routes clear, salted, and secure during harsh snowy weather.",
    image: winterImg,
    included: [
      "Walkway, step, and entryway snow clearing",
      "Pet-safe ice melt and traction sand application",
      "Post-storm property check and driveway clearance",
      "Priority scheduling for recurring winter clients"
    ],
    idealFor: "Keeping home entrances safe and accessible throughout Vermont winters.",
    typicalDuration: "Storm-dependent",
    startingPrice: "Per storm or seasonal plan"
  }
];

export const TRUST_PILLARS = [
  {
    number: "01",
    title: "Quality Workmanship",
    description: "Every lawn line is straight, every repair is sturdy, and every property is left cleaner than we found it. We take immense pride in hands-on Vermont craftsmanship."
  },
  {
    number: "02",
    title: "Honest, Clear Service",
    description: "No hidden charges, no unreturned phone calls, and no unnecessary upsells. You receive clear estimates, honest advice, and upfront timelines before any work begins."
  },
  {
    number: "03",
    title: "Done Right The First Time",
    description: "Rooted in an Eagle Scout's commitment to honor, diligence, and accountability. When we take on a job at your property, we do it with total integrity."
  }
];
