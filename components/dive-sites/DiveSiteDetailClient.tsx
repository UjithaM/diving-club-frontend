import DetailPanel from "@/components/ui/DetailPanel";

interface DiveSiteDetailClientProps {
  siteName: string;
  depth: string;
  boatTime: string;
  season: string;
  difficulty: string;
}

export default function DiveSiteDetailClient({
  siteName,
  depth,
  boatTime,
  season,
  difficulty,
}: DiveSiteDetailClientProps) {
  return (
    <DetailPanel
      eyebrow="Book a dive here"
      intro={<>Tell us which sites you want and we&apos;ll sort the rest.</>}
      rows={[
        { label: "Depth", value: depth },
        { label: "Boat time", value: boatTime },
        { label: "Season", value: season },
        { label: "Level", value: difficulty, accent: true },
      ]}
      book={{ href: `/book?type=dive-site&item=${encodeURIComponent(siteName)}`, label: "Book a Dive" }}
      footnote="Equipment included · Local guides · Small groups"
    />
  );
}
