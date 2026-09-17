import DetailPanel from "@/components/ui/DetailPanel";

interface ActivityDetailClientProps {
  experienceName: string;
  price: number;
  currency: string;
  duration: string;
  minAge: number;
  divesIncluded?: number;
  metaLabel: string;
}

export default function ActivityDetailClient({
  experienceName,
  price,
  currency,
  duration,
  minAge,
  divesIncluded,
  metaLabel,
}: ActivityDetailClientProps) {
  return (
    <DetailPanel
      eyebrow="Activity price"
      price={{ amount: `$${price}`, currency, note: "per person" }}
      rows={[
        { label: "Duration", value: duration },
        { label: "Min age", value: `${minAge}+` },
        ...(divesIncluded ? [{ label: "Dives included", value: divesIncluded, accent: true }] : []),
        { label: "Type", value: metaLabel, accent: true },
      ]}
      book={{ href: `/book?type=activity&item=${encodeURIComponent(experienceName)}`, label: "Book Now" }}
      footnote="All equipment included · Small groups · Expert guides"
    />
  );
}
