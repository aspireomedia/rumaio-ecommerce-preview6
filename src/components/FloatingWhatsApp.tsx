"use client";

const WHATSAPP_NUMBER = "6281234567890"; // TODO: replace with the real business WhatsApp number when provided.
const WHATSAPP_MESSAGE = "Halo Casen Living, saya ingin bertanya mengenai produk.";

export function FloatingWhatsApp() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Hubungi Casen Living melalui WhatsApp"
      title="Hubungi kami via WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M24.21 19.34c-.36-.18-2.13-1.05-2.46-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.78.09-.36-.18-1.52-.56-2.9-1.79-1.07-.95-1.79-2.13-2-2.49-.21-.36-.02-.55.16-.73.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.29-.7-.59-.6-.81-.61-.21-.01-.45-.01-.69-.01s-.63.09-.96.45c-.33.36-1.26 1.23-1.26 3s1.29 3.48 1.47 3.72c.18.24 2.54 3.88 6.16 5.44.86.37 1.53.59 2.05.76.86.27 1.64.23 2.26.14.69-.1 2.13-.87 2.43-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42Z" />
      </svg>
    </a>
  );
}
