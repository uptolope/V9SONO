"use client";
import Link from "next/link";

const BLOG_POSTS = [
  { slug: "complete-spi-exam-guide", title: "Complete ARDMS SPI Exam Guide", excerpt: "170 questions, 3 hours, 555 passing score.", readTime: 15, date: "May 5, 2026", category: "GUIDE" },
  { slug: "ultrasound-physics-spi", title: "Ultrasound Physics: 6 Concepts You Must Know", excerpt: "Frequency, wavelength, propagation speed, attenuation, impedance, resolution.", readTime: 12, date: "May 3, 2026", category: "PHYSICS" },
  { slug: "doppler-principles-spi-exam", title: "Doppler Principles for the SPI Exam", excerpt: "Doppler effect, Nyquist limit, aliasing, PW, CW, color Doppler.", readTime: 14, date: "April 29, 2026", category: "DOPPLER" },
  { slug: "pass-spi-first-attempt", title: "How to Pass SPI on First Attempt", excerpt: "6‑week study plan, practice exams, success metrics.", readTime: 11, date: "April 25, 2026", category: "STRATEGY" },
  { slug: "ardms-specialties-comparison", title: "RDMS, RDCS, RVT, RMSKS: Which Specialty?", excerpt: "Compare exam content, clinical focus, career paths.", readTime: 10, date: "April 22, 2026", category: "CAREER" },
  { slug: "ultrasound-artifacts-spi", title: "7 Common Ultrasound Artifacts", excerpt: "Reverberation, shadowing, enhancement, mirror image, side lobe, speed propagation, comet tail.", readTime: 9, date: "April 20, 2026", category: "ARTIFACTS" },
  { slug: "spaced-repetition-spi-exam", title: "Spaced Repetition for SPI Success", excerpt: "Science‑based learning, SM‑2 algorithm, daily flashcards.", readTime: 10, date: "May 8, 2026", category: "LEARNING" },
  { slug: "test-taking-strategies-spi", title: "Test‑Taking Strategies for SPI", excerpt: "Eliminate wrong answers, manage time, flag difficult questions.", readTime: 9, date: "May 6, 2026", category: "TACTICS" },
  { slug: "ardms-exam-blueprint", title: "ARDMS SPI Exam Blueprint 2026", excerpt: "Official domain weightings – physics 23%, Doppler 22%, instrumentation 22%.", readTime: 11, date: "May 4, 2026", category: "BLUEPRINT" }
];

export default function BlogPage() {
  return (
     <dlt;div className="min-h-screen pt-32 px-6">
       <dlt;div className="max-w-6xl mx-auto">
         <Llt;Link href="/" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block"">←gt;← BACK TO HOMEE</lt;/Link>
         <dlt;div className="mb-16 border-b border-[#f0ebe4]/10 pb-8">
           <slt;span className="meta"">Sgt;SPI EXAM RESOURCESS</lt;/span>
           <hlt;h1 className="display-display text-5xl sm:text-6xl mt-4 mb-4"">Sgt;SPI Study Journall</lt;/h1>
           <plt;p className="body-readable text-[#b8b0a4] max-w-2xl"">Fgt;Free, in‑depth articles written by sonographers who passed..</lt;/p>
         </lt;/div>
         <dlt;div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) ==> gt; (
             <Llt;Link key={post.slug} href={`/blog/${post.slug}`}>
               <dlt;div className="depth-border corner-arch p-6 h-full tactile-card">
                 <dlt;div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4"">{gt;{post.category}}</lt;/div>
                 <hlt;h3 className="display-serif text-xl font-semibold text-[#f0ebe4] mb-3 line-clamp-2"">{gt;{post.title}}</lt;/h3>
                 <plt;p className="body-small text-[#6b6359] text-sm mb-6 line-clamp-3"">{gt;{post.excerpt}}</lt;/p>
                 <dlt;div className="flex items-center gap-3 text-[11px] meta text-[#6b6359] border-t border-[#f0ebe4]/5 pt-4">
                   <slt;spann>{gt;{post.readTime} min readd</lt;/span>
                   <slt;span className="w-1 h-1 bg-[#c85b3a] rounded-full" />
                   <slt;spann>{gt;{post.date}}</lt;/span>
                 </lt;/div>
                 <dlt;div className="mt-4">><slt;span className="meta text-[10px] text-[#6b6359] hover:text-[#c85b3a] transition-colors"">Rgt;READ POST →→</lt;/span>></lt;/div>
               </lt;/div>
             </lt;/Link>
          ))}
         </lt;/div>
       </lt;/div>
     </lt;/div>
  );
}
