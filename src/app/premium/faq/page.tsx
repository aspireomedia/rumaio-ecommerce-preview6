"use client";
import { PremiumFooter, PremiumHeader, usePremiumStore } from "../PremiumShell";

const faqGroups = [
  {
    title: "Orders & Payment",
    items: [
      ["How do I place an order?", "Browse the collection, add pieces to your cart, and follow the checkout steps. Contact our team for assistance with eligibility and next steps."],
      ["What payment methods are available?", "Contact our team for the current list of accepted payment methods for your order."],
      ["Can I modify or cancel an order?", "Contact our team as soon as possible after placing an order. Eligibility depends on how far the order has progressed."],
    ],
  },
  {
    title: "Delivery",
    items: [
      ["Where does Casen Living deliver?", "Contact our team to confirm delivery coverage for your area."],
      ["How long does delivery take?", "Delivery timing varies by piece and location. Contact our team for an estimate specific to your order."],
      ["How are large furniture items delivered?", "Large pieces are handled with dedicated delivery care. Contact our team for details on your specific item."],
      ["How can I track my order?", "Contact our team for assistance with eligibility and next steps on tracking your order."],
    ],
  },
  {
    title: "Returns & Warranty",
    items: [
      ["What is the return policy?", "Contact our team for assistance with eligibility and next steps for a return."],
      ["What should I do if an item arrives damaged?", "Contact our team immediately with photos of the item and packaging so we can help resolve it."],
      ["Is there a product warranty?", "Contact our team for warranty coverage details specific to your piece."],
    ],
  },
  {
    title: "Products",
    items: [
      ["Are product colors exactly as shown online?", "We aim for accurate representation, but screen displays can vary slightly. Contact our team if you'd like more detail on a specific color."],
      ["Where can I find product dimensions and materials?", "Full dimensions and materials are listed under \"About This Piece\" on every product page."],
      ["How should I care for my furniture?", "Care guidance specific to the material is listed on each product page. Contact our team for further advice."],
    ],
  },
  {
    title: "Services",
    items: [
      ["Does Casen Living offer furniture consultation?", "Contact our team to ask about consultation availability for your space."],
      ["Are assembly services available?", "Contact our team for assistance with eligibility and next steps for assembly services."],
      ["Can I order furniture for business/project requirements?", "Contact our team to discuss business or project furniture needs."],
    ],
  },
];

export default function PremiumFaqPage() {
  const store = usePremiumStore();
  return (
    <>
      <PremiumHeader store={store} />
      <main>
        <section className="premium-faq-hero">
          <h1 className="premium-serif">Frequently Asked Questions</h1>
          <p>Answers to common questions about shopping with Casen Living.</p>
        </section>
        <section className="premium-shell premium-faq-body">
          {faqGroups.map((group) => (
            <div key={group.title} className="premium-faq-group">
              <h2 className="premium-serif">{group.title}</h2>
              {group.items.map(([q, a]) => (
                <details key={q} className="premium-faq-item">
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          ))}
        </section>
      </main>
      <PremiumFooter />
    </>
  );
}
