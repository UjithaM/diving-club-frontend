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
  type: "fun-diving" | "try-diving" | "snorkeling" | "whale-watching";
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
