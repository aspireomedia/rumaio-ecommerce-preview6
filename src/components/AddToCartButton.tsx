"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

type AddToCartButtonProps = {
  onAdd: () => void;
  className?: string;
  children?: React.ReactNode;
  icon?: boolean;
};

export function AddToCartButton({ onAdd, className = "", children = "Tambah ke Keranjang", icon = false }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  useEffect(() => {
    if (!added) return;
    const timeout = window.setTimeout(() => setAdded(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [added]);
  const add = () => {
    if (added) return;
    onAdd();
    setAdded(true);
  };
  return <button type="button" className={`${className} ${added ? "is-added" : ""}`.trim()} onClick={add} disabled={added} aria-live="polite">
    {added ? <><Check size={16} aria-hidden="true" /> <span className="cart-feedback-label">Berhasil Ditambahkan</span></> : <>{icon && <ShoppingBag size={16} aria-hidden="true" />}<span className="cart-default-label">{children}</span></>}
  </button>;
}
