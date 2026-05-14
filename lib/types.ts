export interface Course {
  slug: string;
  name: string;
  level: "beginner" | "advanced" | "specialty" | "professional";
  duration: string;
  price: number;
  originalPrice?: number | null;
  currency: string;
  description: string;
  whatYouLearn: string[];
  includes: string[];
  requirements: string;
  minAge: number;
  maxDepth: string;
  schedule?: string;
  maxParticipants?: number;
  image: string;
  popular: boolean;
  featured?: boolean;
}

export interface Experience {
  slug: string;
  name: string;
  type: string;
  duration: string;
  price: number;
  originalPrice?: number | null;
  currency: string;
  description: string;
  includes: string[];
  requirements: string;
  minAge: number;
  image: string;
  popular: boolean;
  featured?: boolean;
  divesIncluded?: number;
}

export interface DiveSite {
  slug: string;
  name: string;
  depth: string;
  difficulty: string;
  boatTime: string;
  season: string;
  description: string;
  marineLife: string[];
  highlights: string[];
  currentsVisibility: string;
  relatedCourses: string[];
  image: string;
  popular: boolean;
}

export interface Faq {
  question: string;
  answer: string;
  category: "diving-basics" | "trincomalee" | "booking-travel" | "safety-eco";
}

export interface PageFaq {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  country: string;
  course?: string;
  text: string;
  rating: number;
  date: string;
}

export interface GalleryImage {
  id: number;
  title: string;
  description: string;
  url: string;
  category: "general" | "course" | "activity";
  sort_order: number;
}

export interface ApiFaq {
  id: number;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
}

export interface Promotion {
  id: number;
  title: string;
  description: string;
  discount_type: "percentage" | "fixed";
  discount_value: string;
  starts_at: string;
  ends_at: string;
  applicable_to: "all" | "course" | "activity";
  is_currently_active: boolean;
}

export interface BlogPostFaq {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  authorTitle: string;
  category: "dive-sites" | "beginner" | "marine-life" | "courses" | "planning" | "destination";
  primaryKeyword: string;
  readingTime: string;
  body: string[];
  faqs: BlogPostFaq[];
  relatedPosts: string[];
  relatedCourses: string[];
  relatedDiveSites: string[];
  relatedActivities: string[];
  featured: boolean;
}

export interface BookingConfirmation {
  reference: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  payment_status: "unpaid" | "partial" | "paid";
  booking_date: string;
  booking_type: string;
  item: string;
  participants: number;
  total_price: number;
  currency: string;
}
