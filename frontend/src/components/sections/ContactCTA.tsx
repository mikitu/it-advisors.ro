import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2e6932]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#28504a]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Pregătit să îți
            <span className="block bg-gradient-to-r from-[#3d8a42] to-[#28504a] bg-clip-text text-transparent">
              optimizezi infrastructura IT?
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Contactați-ne pentru o consultanță gratuită. Analizăm împreună nevoile afacerii 
            dumneavoastră și vă propunem soluția optimă.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#2e6932] text-white font-semibold rounded-xl hover:bg-[#3d8a42] hover:shadow-xl hover:shadow-[#2e6932]/25 transition-all duration-300"
            >
              Solicită consultanță gratuită
            </Link>
            <a
              href="tel:+40728691520"
              className="px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Sună acum
            </a>
          </div>

          {/* Quick contact info */}
          <div className="mt-16 grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#2e6932]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#3d8a42]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <p className="text-gray-400 text-sm mb-1">Telefon</p>
              <p className="text-white font-semibold">+40 (728) 691 520</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#2e6932]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#3d8a42]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <p className="text-gray-400 text-sm mb-1">Email</p>
              <p className="text-white font-semibold">contact@it-advisors.ro</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#2e6932]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#3d8a42]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-400 text-sm mb-1">Program</p>
              <p className="text-white font-semibold">Luni - Vineri: 9-18</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

