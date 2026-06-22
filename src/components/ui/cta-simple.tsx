import Link from "next/link";

export default function SimpleCTA() {
  return (
    <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-10 text-center">
      <p className="body-readable text-white text-sm mb-4">
        Ready to test yourself? Try the full SPI exam simulator with random questions from our complete bank.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/demo" className="btn-industrial px-4 py-2 text-sm">Try Free Demo →</Link>
        <Link href="/products" className="btn-industrial-outline px-4 py-2 text-sm">View Products →</Link>
      </div>
    </div>
  );
}
