import type { Metadata } from "next";
import "./premium.css";

export const metadata: Metadata = {
  title: "Casen Living | Furniture Premium",
  description: "Furniture berkualitas untuk cara Anda menjalani kehidupan. Terinspirasi dari Casa, dihadirkan kembali untuk kehidupan.",
};

export default function PremiumLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="premium-root">
      {/* The visible premium footer renders `--premium-primary` (#27545c) via the
          `.premium-root .premium-footer` rule, so the root overscroll layer must match
          that — not the unused #16302f literal. */}
      <style>{`:root{--page-overscroll-bg:#27545c}`}</style>
      {children}
    </div>
  );
}
