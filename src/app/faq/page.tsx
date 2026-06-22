import Link from "next/link";

const FAQ_ITEMS = [
  { q: "How many questions are in the full exam simulator?", a: "170+ questions in the bank. Each exam session draws 110 questions — the same count as the real SPI — randomized and domain-weighted, so every attempt is unique. You get 3 exam attempts within a 90-day access window." },
  { q: "How long do I have access after purchase?", a: "90 days from the date of purchase. Enough time to complete the recommended 6‑week study plan." },
  { q: "What is the refund policy?", a: "14‑day money‑back guarantee. If you're not satisfied, contact support@sonoprep.com within 14 days for a full refund." },
  { q: "Can I share my account with a friend?", a: "No. Each license is for single‑user use only. Sharing credentials violates our terms and may result in account termination." },
  { q: "What is the passing score for the SPI exam?", a: "555 out of 700 (approximately 79%). You need to correctly answer about 87 of the 110 questions." },
  { q: "Do I need to pass SPI before taking RDMS or RDCS?", a: "Yes. SPI is a prerequisite for every ARDMS specialty credential (RDMS, RDCS, RVT, RMSKS)." },
  { q: "Are the questions exactly like the real exam?", a: "We write original questions based on the ARDMS content outline. They are not actual ARDMS questions but are designed to test the same concepts and difficulty level." },
  { q: "How many exam attempts do I get?", a: "3 attempts within your 90-day access window. Each attempt draws a fresh set of 110 random questions from the 170+ bank, so every exam is different. Once you start an attempt, the 2-hour timer begins and cannot be paused — make sure you're ready before clicking Start." },
  { q: "Does the simulator have a timer?", a: "Yes. The full exam simulator includes a 2‑hour countdown timer, matching the real exam. It auto‑submits when time runs out." },
  { q: "Can I review answers after the exam?", a: "Yes. After submission, you see your score and can review each question's correct answer and explanation." },
  { q: "What are the domain weightings?", a: "Physics 23%, Instrumentation 22%, Doppler 22%, Artifacts 12%, Safety 11%, QA 5%, Hemodynamics 5%." },
  { q: "Is there a free trial?", a: "Yes, the /demo page gives you 5 free exam questions and 10 flashcards – no account needed." },
  { q: "How do I upgrade from the demo to the full product?", a: "Sign in or create an account, then visit the Products page to purchase individual tools or the bundle." },
  { q: "What is spaced repetition?", a: "A study method where you review flashcards at increasing intervals. SonoPrep's flashcards use the SM‑2 algorithm to optimize retention." },
  { q: "Do you offer group or institutional licenses?", a: "Not yet. For updates on future group pricing, contact support@sonoprep.com." },
  { q: "What happens after 90 days?", a: "Access expires. You can purchase another 90‑day access if you need more time." },
  { q: "Can I download the study notes as PDF?", a: "Currently, notes are only available online with progress tracking. PDF export is not supported." }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#8a8279] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <h1 className="display-display text-5xl text-white mb-4">Frequently Asked Questions</h1>
        <div className="w-12 h-px bg-[#c85b3a] mb-10" />
        <div className="space-y-6">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className="border-l-[3px] border-[#c85b3a] pl-5">
              <h3 className="display-serif text-xl font-semibold text-white mb-2">{item.q}</h3>
              <p className="body-readable text-[#c2bab0] text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
