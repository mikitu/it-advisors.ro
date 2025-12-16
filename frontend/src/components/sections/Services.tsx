import Link from "next/link";

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: "Administrare IT",
    description: "Gestionarea completă a infrastructurii IT: servere, rețele, stații de lucru și periferice.",
    href: "/servicii/administrare-it",
    color: "blue",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: "Suport tehnic IT",
    description: "Asistență tehnică prin telefon, email și remote helpdesk. Intervenții rapide on-site.",
    href: "/servicii/suport-tehnic",
    color: "green",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    title: "Telefonie VoIP",
    description: "Soluții moderne de telefonie IP pentru comunicații eficiente și costuri reduse.",
    href: "/servicii/telefonie-voip",
    color: "purple",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "Web Design & Hosting",
    description: "Design web modern, găzduire profesională și administrare email.",
    href: "/servicii/web-hosting",
    color: "cyan",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
      </svg>
    ),
    title: "Virtualizare",
    description: "Soluții de virtualizare pentru optimizarea resurselor și reducerea costurilor.",
    href: "/servicii/virtualizare",
    color: "orange",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Securitate IT",
    description: "Protecție completă împotriva amenințărilor: antivirus, firewall, backup și disaster recovery.",
    href: "/servicii/securitate",
    color: "red",
  },
];

const colorClasses = {
  blue: { bg: "bg-[#2e6932]/10", text: "text-[#2e6932]", hover: "group-hover:bg-[#2e6932]" },
  green: { bg: "bg-[#2e6932]/10", text: "text-[#2e6932]", hover: "group-hover:bg-[#2e6932]" },
  purple: { bg: "bg-purple-100", text: "text-purple-600", hover: "group-hover:bg-purple-600" },
  cyan: { bg: "bg-[#28504a]/10", text: "text-[#28504a]", hover: "group-hover:bg-[#28504a]" },
  orange: { bg: "bg-orange-100", text: "text-orange-600", hover: "group-hover:bg-orange-600" },
  red: { bg: "bg-red-100", text: "text-red-600", hover: "group-hover:bg-red-600" },
};

export default function Services() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#2e6932] font-semibold text-sm uppercase tracking-wider">Servicii</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            Soluții complete pentru infrastructura IT
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Oferim o gamă completă de servicii IT pentru a asigura buna funcționare a afacerii dumneavoastră.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const colors = colorClasses[service.color as keyof typeof colorClasses];
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 border border-transparent hover:border-gray-100"
              >
                <div className={`w-16 h-16 ${colors.bg} ${colors.hover} rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300`}>
                  <div className={`${colors.text} group-hover:text-white transition-colors duration-300`}>
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#2e6932] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center text-[#2e6932] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Află mai multe
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

