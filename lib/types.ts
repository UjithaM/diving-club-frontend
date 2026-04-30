export interface Course {
  slug: string;
  name: string;
  level: "beginner" | "advanced" | "specialty" | "professional";
  duration: string;
  price: number;
  currency: string;
  description: string;
  whatYouLearn: string[];
  includes: string[];
  requirements: string;
  minAge: number;
  maxDepth: string;
  image: string;
  popular: boolean;
}

export interface Experience {
  slug: string;
  name: string;
  type: "fun-diving" | "try-diving" | "snorkeling" | "whale-watching" | "jet-ski" | "boat-tour" | "sunset-tour";
  duration: string;
  price: number;
  currency: string;
  description: string;
  includes: string[];
  requirements: string;
  minAge: number;
  image: string;
  popular: boolean;
  divesIncluded?: number;
}

export interface DiveSite {
  slug: string;
  name: string;
  depth: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Technical";
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
