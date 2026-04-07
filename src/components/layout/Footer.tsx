import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-900 text-white/80 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex items-center justify-center w-8 h-8 bg-white/10 rounded-lg text-white text-sm font-bold">
                GI
              </span>
              <span className="font-heading font-semibold text-white text-lg">
                GI Patient Hub
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Evidence-based patient education for gastrointestinal conditions. Designed to help patients understand their diagnosis and feel confident in their care.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/conditions" className="text-white/60 hover:text-white transition-colors">All Conditions</Link></li>
              <li><Link href="/for-physicians" className="text-white/60 hover:text-white transition-colors">For Physicians</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">Important Notice</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Always follow the specific instructions provided by your doctor. If they differ from this guide, your doctor&apos;s instructions take priority.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="bg-warning-500/10 border border-warning-500/20 rounded-xl p-5 mb-6">
            <p className="text-xs text-warning-200 leading-relaxed">
              <strong className="text-warning-100">Medical Disclaimer:</strong> This website provides general educational information and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </div>
          <p className="text-xs text-white/40 text-center">
            &copy; {currentYear} GI Patient Hub. Created by a Canadian gastroenterologist. Evidence-based. Regularly reviewed.
          </p>
        </div>
      </div>
    </footer>
  );
}
