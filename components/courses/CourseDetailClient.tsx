import DetailPanel from "@/components/ui/DetailPanel";
import { money } from "@/lib/money";

interface CourseDetailClientProps {
  courseName: string;
  price: number;
  currency: string;
  duration: string;
  maxDepth: string;
  minAge: number;
  metaLabel: string;
}

export default function CourseDetailClient({
  courseName,
  price,
  currency,
  duration,
  maxDepth,
  minAge,
  metaLabel,
}: CourseDetailClientProps) {
  return (
    <DetailPanel
      eyebrow="Course price"
      price={{ amount: money(price, currency), currency }}
      rows={[
        { label: "Duration", value: duration },
        ...(maxDepth !== "N/A" ? [{ label: "Max depth", value: maxDepth }] : []),
        { label: "Min age", value: `${minAge}+` },
        { label: "Level", value: metaLabel, accent: true },
      ]}
      book={{ href: `/book?type=course&item=${encodeURIComponent(courseName)}`, label: "Book This Course" }}
      footnote="All equipment included · Small groups · PADI certified"
    />
  );
}
