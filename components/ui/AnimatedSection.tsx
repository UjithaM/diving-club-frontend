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

  const from =
    direction === "up"
      ? "translateY(40px)"
      : direction === "left"
      ? "translateX(-40px)"
      : "translateX(40px)";

  const to = direction === "up" ? "translateY(0)" : "translateX(0)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? to : from,
        transition: `opacity 0.6s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.6s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      {children}
    </div>
  );
}
