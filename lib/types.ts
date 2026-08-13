/**
 * The advance a customer pays upfront to hold a booking. Admin-managed: a site-wide
 * default with per-item overrides.
 *
 * NEVER compute the advance. `amount` is server-side and already accounts for the
 * per-item override, per-person maths, any discount, and clamping to the total — read
 * it from GET /bookings/{reference} and render it. Before a booking exists there is no
 * amount, so show the rule (`type` + `value`) as a label instead.
 *
 * Careful: `type: "fixed"` here means that amount PER PERSON. On a discount it means a
 * flat amount off the whole total. The two are deliberately different.
 */
export interface Deposit {
  enabled: boolean;
  type: "percentage" | "fixed";
  /** 20 = 20%, or 50 = $50 per person, depending on `type`. */
  value: number;
  /** Authoritative, and only present on GET /bookings/{reference}. */
  amount?: number;
  currency?: string;
}

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
  /** The effective advance for this item. No `amount` — headcount isn't known yet. */
  deposit?: Deposit;
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
  /**
   * Cap for the "How many dives?" input, admin-set per activity. null (or absent) means
   * there's nothing to choose and no `quantity` goes in the booking. Courses never have it.
   */
  maxQuantity?: number | null;
  /** The effective advance for this item. No `amount` — headcount isn't known yet. */
  deposit?: Deposit;
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

/**
 * What a booking form needs to describe and price something. Course and Experience both
 * satisfy this. `maxQuantity` is spliced in rather than Pick'd — only activities carry it,
 * the courses endpoint doesn't return the field at all.
 */
export type BookableItem = Pick<
  Course,
  "slug" | "name" | "duration" | "price" | "currency" | "originalPrice" | "includes" | "minAge"
> & { maxQuantity?: number | null };

// GET /api/home returns trimmed versions of the three types above, with a nullable
// image. The full types are supersets, so the cards accept either.

export type HomeCourse = Pick<
  Course,
  | "slug"
  | "name"
  | "description"
  | "level"
  | "duration"
  | "price"
  | "currency"
  | "originalPrice"
  | "popular"
  | "featured"
> & { image: string | null };

export type HomeActivity = Pick<
  Experience,
  | "slug"
  | "name"
  | "description"
  | "type"
  | "duration"
  | "price"
  | "currency"
  | "originalPrice"
  | "popular"
  | "featured"
  | "divesIncluded"
> & { image: string | null };

export type HomeDiveSite = Pick<
  DiveSite,
  "slug" | "name" | "description" | "depth" | "difficulty" | "boatTime" | "popular"
> & { image: string | null };

export interface HomeData {
  courses: HomeCourse[];
  activities: HomeActivity[];
  diveSites: HomeDiveSite[];
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
  /** One entry per booked item. `quantity` is already people × per-person quantity. */
  items: { name: string; quantity: number }[];
  participants: number;
  /** Already discounted. Don't subtract discount_amount again. */
  total_price: number;
  /** 0 when no discount link was used. */
  discount_amount: number;
  currency: string;
  /** `deposit.amount` here is the authoritative advance — never recompute it. */
  deposit: Deposit;
}

export interface PaymentGatewayPayPal {
  id: number;
  enabled: boolean;
  client_id: string;
  mode: string;
}

export interface PaymentGatewayBankTransfer {
  id: number;
  enabled: boolean;
  bank_name: string;
  account_name: string;
  account_number: string;
  iban: string;
}

export interface PaymentOptions {
  gateways: {
    paypal?: PaymentGatewayPayPal;
    bank_transfer?: PaymentGatewayBankTransfer;
  };
  /**
   * SITE DEFAULT only — it can't know about per-item overrides, because there's no
   * booking yet. Fine for generic copy ("pay 10% to reserve"), never for a real number
   * on a real booking.
   *
   * `percentage` is kept for backwards compatibility but is null when type is "fixed".
   */
  deposit: Deposit & { percentage: number | null };
}
