import type { Metadata } from "next";
import "./premium.css";

export const metadata: Metadata = {
  title: "Casen Living | Premium Furniture",
  description: "Beautiful furniture for the way you actually live. Inspired by Casa, reimagined for living.",
};

export default function PremiumLayout({ children }: { children: React.ReactNode }) {
  return <div className="premium-root">{children}</div>;
}
