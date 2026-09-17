/**
 * Diving Club's own photographs (owner-confirmed real, see PRODUCT.md "Evidence on Hand").
 *
 * Static imports, so next/image gets intrinsic sizes and a blur placeholder for free. Use these
 * where the admin has no image yet — never as a stand-in for a *specific* dive site or course
 * they don't show.
 */
import boatSunrise from "@/public/assets/sunrise-trincomalee-beach-sri-lanka.webp";
import couple from "@/public/assets/couple-scuba-diving-trincomalee.webp";
import group from "@/public/assets/group-scuba-diving-trincomalee-sri-lanka.webp";
import instructor from "@/public/assets/J-rockshan-with-open-water-students.webp";
import jetSki from "@/public/assets/jet-ski-ride-trincomalee-beach.webp";
import wreckDiver from "@/public/assets/scuba-diver-exploring-shipwreck-trincomalee.webp";
import okSignal from "@/public/assets/scuba-diver-ok-signal-underwater-trincomalee.webp";
import diver from "@/public/assets/scuba-diving-trincomalee-sri-lanka.webp";
import reef from "@/public/assets/sea-snake-tropical-fish-trincomalee.webp";
import wreckPair from "@/public/assets/two-female-divers-shipwreck-trincomalee.webp";
import jetSkiPair from "@/public/assets/two-men-jet-ski-trincomalee-ocean.webp";
import type { StaticImageData } from "next/image";

export interface Photo {
  src: StaticImageData;
  alt: string;
}

export const photos = {
  boatSunrise: { src: boatSunrise, alt: "Dive boat on the beach at sunrise in Trincomalee, Sri Lanka" },
  couple: { src: couple, alt: "Couple scuba diving together in the clear waters of Trincomalee, Sri Lanka" },
  group: { src: group, alt: "Three scuba divers waving underwater on a dive in Trincomalee, Sri Lanka" },
  instructor: { src: instructor, alt: "J Rockshan with two newly certified Open Water students on the beach in Trincomalee, Sri Lanka" },
  jetSki: { src: jetSki, alt: "Two riders on a jet ski off the beach in Trincomalee" },
  wreckDiver: { src: wreckDiver, alt: "Scuba diver framed in a shipwreck doorway off Trincomalee" },
  okSignal: { src: okSignal, alt: "Scuba diver kneeling on the sand giving the OK signal underwater in Trincomalee" },
  diver: { src: diver, alt: "Scuba diver hovering over the sand in Trincomalee, Sri Lanka" },
  reef: { src: reef, alt: "Moray eel and tropical fish on a Trincomalee reef" },
  wreckPair: { src: wreckPair, alt: "Two divers on a shipwreck in the green water off Trincomalee" },
  jetSkiPair: { src: jetSkiPair, alt: "Jet ski ride on the ocean off Trincomalee" },
} satisfies Record<string, Photo>;

/** Real photos of the activity itself, for activity types the admin hasn't photographed yet. */
export const activityPhotos: Record<string, Photo> = {
  "jet-ski": photos.jetSki,
};

/** The gallery's fallback when the admin gallery is empty. */
export const galleryFallback: Photo[] = [
  photos.wreckDiver,
  photos.reef,
  photos.couple,
  photos.wreckPair,
  photos.okSignal,
  photos.group,
];
