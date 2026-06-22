import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20 pt-10 pb-8 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          <div>
            <p className="meta text-[9px] text-[#4a453f] mb-3">QUESTION BANKS</p>
            <div className="space-y-2">
              <Link href="/ultrasound-physics" className="block text-sm text-[#8a8279] hover:text-[#c85b3a] transition-colors">Physics</Link>
              <Link href="/abdominal-ultrasound" className="block text-sm text-[#8a8279] hover:text-[#c85b3a] transition-colors">Abdomen</Link>
              <Link href="/vascular-ultrasound" className="block text-sm text-[#8a8279] hover:text-[#c85b3a] transition-colors">Vascular</Link>
            </div>
          </div>
          <div>
            <p className="meta text-[9px] text-[#4a453f] mb-3">PRODUCT</p>
            <div className="space-y-2">
              <Link href="/products" className="block text-sm text-[#8a8279] hover:text-[#c85b3a] transition-colors">All Products</Link>
              <Link href="/demo" className="block text-sm text-[#8a8279] hover:text-[#c85b3a] transition-colors">Free Demo</Link>
              <Link href="/blog" className="block text-sm text-[#8a8279] hover:text-[#c85b3a] transition-colors">Blog</Link>
            </div>
          </div>
          <div>
            <p className="meta text-[9px] text-[#4a453f] mb-3">LEGAL</p>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-sm text-[#8a8279] hover:text-[#c85b3a] transition-colors">Privacy</Link>
              <Link href="/terms" className="block text-sm text-[#8a8279] hover:text-[#c85b3a] transition-colors">Terms</Link>
            </div>
          </div>
          <div>
            <p className="meta text-[9px] text-[#4a453f] mb-3">SONOPREP</p>
            <p className="text-xs text-[#4a453f] leading-relaxed">
              Licensed ultrasound question banks for ARDMS exam preparation.
            </p>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 text-center">
          <p className="meta text-[9px] text-[#2e2b27]">
            © {new Date().getFullYear()} SonoPrep. All content is original and copyright protected.
            SonoPrep is not affiliated with or endorsed by ARDMS. SPI® is a registered trademark of ARDMS.
          </p>
        </div>
      </div>
    </footer>
  );
}
