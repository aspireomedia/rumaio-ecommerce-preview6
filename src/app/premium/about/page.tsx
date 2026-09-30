"use client";
import { PremiumFooter, PremiumHeader, usePremiumStore } from "../PremiumShell";

export default function PremiumAboutPage() {
  const store = usePremiumStore();
  return (
    <>
      <PremiumHeader store={store} />
      <main>
        <section className="premium-about-hero">
          <span>Casen Living</span>
          <h1 className="premium-serif">Inspired by Casa &mdash; Reimagined for Living</h1>
          <p>Where Space Becomes Home.</p>
        </section>

        <section className="premium-about-body premium-shell">
          <div>
            <h2 className="premium-serif">Our Brand Philosophy</h2>
            <p>Terinspirasi dari Casa, Casen Living menggambarkan perjalanan sebuah ruang menjadi tempat yang benar-benar hidup dan memiliki makna. Mulai dari tempat tidur di mana hari dimulai dan diakhiri, furniture yang menjadi bagian dari kebersamaan, hingga ruang kerja tempat ide dan pencapaian tercipta. Setiap elemen memiliki peran dalam membentuk pengalaman seseorang di dalam ruangnya.</p>
          </div>

          <div>
            <h2 className="premium-serif">Casa &rarr; Casen</h2>
            <p>Transformasi nama dari Casa menjadi Casen memberikan identitas yang lebih modern dan khas, namun tetap mempertahankan akar filosofinya tentang rumah.</p>
          </div>

          <div>
            <h2 className="premium-serif">Living</h2>
            <p>Penambahan kata &ldquo;Living&rdquo; memperluas makna tersebut. Casen Living tidak hanya berbicara tentang tempat tinggal, tetapi tentang berbagai cara manusia menjalani kehidupan di dalam sebuah ruang, yaitu sebagai tempat beristirahat, berkumpul, bekerja, bertumbuh, dan menikmati kenyamanan rumah.</p>
          </div>

          <div>
            <h2 className="premium-serif" style={{ marginBottom: 20 }}>Brand Essence</h2>
            <div className="premium-essence">
              <span>Modern</span>
              <span>Home</span>
              <span>Comfort</span>
              <span>Everyday Living</span>
              <span>Versatile</span>
            </div>
          </div>
        </section>

        <section className="premium-about-closing">
          <h2 className="premium-serif">Where Space Becomes Home.</h2>
        </section>
      </main>
      <PremiumFooter />
    </>
  );
}
