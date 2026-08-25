"use client";

import { useInView } from "@/lib/hooks/useInView";

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}

export default function AnimatedSection({
  children,
  delay = 0,
  direction = "up",
  className,
}: AnimatedSectionProps) {
  const [ref, inView] = useInView<HTMLDivElement>("-80px");

  // 16px, not 40: a slide longer than a touch target means a tap mid-transition lands
  // beside the button rather than on it, which showed up as dead clicks on the ad pages.
  const from =
    direction === "up"
      ? "translateY(16px)"
      : direction === "left"
      ? "translateX(-16px)"
      : "translateX(16px)";

  const to = direction === "up" ? "translateY(0)" : "translateX(0)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? to : from,
        transition: `opacity 0.45s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.45s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      {children}
    </div>
  );
}
