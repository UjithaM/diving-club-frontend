import type { HomeActivity, Promotion } from "@/lib/types";
import ExperienceCard from "@/components/ui/ExperienceCard";
import { cardDeal } from "@/lib/discount";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { Mask } from "@/components/illustrations/Sea";

export default function FeaturedExperiencesSection({
  experiences,
  promotions = [],
}: {
  experiences: HomeActivity[];
  /** Live promotions; each card finds its own deal, since each item has its own value. */
  promotions?: Promotion[];
}) {
  return (
    <Section zone="surface" depth={3} log="Get in the Water" className="relative">
      <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 lg:mb-16 reveal">
        <div>
          <h2 className="text-section font-extrabold">Dive Right In</h2>
          <p className="text-lead text-muted mt-4 max-w-[46ch]">
            First-timers and experienced divers alike, there&apos;s something in these waters for everyone.
          </p>
        </div>
        <Button href="/activities" variant="ghost" arrow className="shrink-0">
          See all activities
        </Button>
        <Mask className="bob absolute -top-4 right-0 w-20 sm:w-24 lg:right-[30%] lg:-top-10 lg:w-32 -rotate-12" />
      </div>

      <ul className="rail md:grid-cols-3 lg:grid-cols-[minmax(0,6fr)_minmax(0,7fr)] lg:grid-rows-2 md:gap-8 lg:gap-x-10 lg:gap-y-10 list-none">
        {experiences.map((experience, i) => (
          <li key={experience.slug} className={`list-none reveal ${i === 0 ? "lg:row-span-2" : ""}`}>
            <ExperienceCard experience={experience} lead={i === 0} deal={cardDeal(promotions, "activity", experience.slug)} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
