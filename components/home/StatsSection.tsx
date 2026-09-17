import Readout from "@/components/ui/Readout";

const stats = [
  { value: "15+", label: "Years in Business" },
  { value: "2,000+", label: "Divers Trained" },
  { value: "12", label: "Dive Sites" },
  { value: "9", label: "PADI Courses" },
];

/** The instrument strip on the fold line, still at the surface. */
export default function StatsSection() {
  return (
    <section className="hidden sm:block zone-surface px-5 sm:px-8 pt-2 pb-6 lg:pt-0 lg:pb-10" aria-label="Diving Club in numbers">
      <div className="max-w-6xl mx-auto">
        <Readout size="section" cells={stats} />
      </div>
    </section>
  );
}
