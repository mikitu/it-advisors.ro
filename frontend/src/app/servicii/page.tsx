import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";

const services = [
  {
    slug: "administrare-it",
    icon: "🖥️",
    title: "Administrare IT",
    description: "Gestionarea completă a infrastructurii IT: servere, rețele, stații de lucru și periferice.",
    features: ["Monitorizare 24/7", "Mentenanță preventivă", "Gestionare active IT", "Rapoarte lunare"],
  },
  {
    slug: "suport-tehnic",
    icon: "🔧",
    title: "Suport tehnic IT",
    description: "Asistență tehnică prin telefon, email și remote helpdesk. Intervenții rapide on-site.",
    features: ["HelpDesk dedicat", "Suport remote", "Intervenții on-site", "SLA garantat"],
  },
  {
    slug: "telefonie-voip",
    icon: "📞",
    title: "Telefonie VoIP",
    description: "Soluții moderne de telefonie IP pentru comunicații eficiente și costuri reduse.",
    features: ["Centrale virtuale", "Numere virtuale", "Integrare CRM", "Costuri reduse 70%"],
  },
  {
    slug: "web-hosting",
    icon: "🌐",
    title: "Web Design & Hosting",
    description: "Design web modern, găzduire profesională și administrare email.",
    features: ["Design responsive", "Hosting SSD", "SSL gratuit", "Backup zilnic"],
  },
  {
    slug: "virtualizare",
    icon: "☁️",
    title: "Virtualizare",
    description: "Soluții de virtualizare pentru optimizarea resurselor și reducerea costurilor.",
    features: ["VMware / Hyper-V", "Cloud privat", "Disaster recovery", "Scalabilitate"],
  },
  {
    slug: "securitate",
    icon: "🛡️",
    title: "Securitate IT",
    description: "Protecție completă împotriva amenințărilor: antivirus, firewall, backup și disaster recovery.",
    features: ["Firewall enterprise", "Antivirus managed", "Backup cloud", "Audit securitate"],
  },
];

export const metadata = {
  title: "Servicii IT | IT Advisors",
  description: "Servicii IT complete pentru companii: administrare IT, suport tehnic, telefonie VoIP, web design, virtualizare și securitate IT.",
};

export default function ServiciiPage() {
  return (
    <>
      <PageHeader
        badge="Serviciile noastre"
        title="Servicii IT Profesionale"
        description="Oferim o gamă completă de servicii IT pentru a asigura buna funcționare și securitatea infrastructurii dumneavoastră."
      />

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/servicii/${service.slug}`}
                className="group p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 border border-transparent hover:border-gray-100"
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                      <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Detalii serviciu
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Nu ești sigur ce serviciu ai nevoie?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Contactează-ne pentru o consultanță gratuită și îți vom recomanda soluția potrivită pentru afacerea ta.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
          >
            Solicită consultanță gratuită
          </Link>
        </div>
      </section>
    </>
  );
}

