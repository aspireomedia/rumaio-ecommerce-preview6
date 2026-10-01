import type { Metadata } from "next";
import "./premium.css";

export const metadata: Metadata = {
  title: "Casen Living | Furniture Premium",
  description: "Furniture berkualitas untuk cara Anda menjalani kehidupan. Terinspirasi dari Casa, dihadirkan kembali untuk kehidupan.",
};

export default function PremiumLayout({ children }: { children: React.ReactNode }) {
  return <div className="premium-root">{children}</div>;
}
