import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";

const solutions = [
  {
    title: "Pachet START",
    subtitle: "Pentru afaceri mici",
    price: "de la 300",
    period: "€/lună",
    description: "Ideal pentru companiile cu până la 10 angajați care au nevoie de suport IT de bază.",
    features: [
      "Suport tehnic remote",
      "Monitorizare infrastructură",
      "Backup date (50GB)",
      "Antivirus managed",
      "Răspuns în 8 ore",
    ],
    highlighted: false,
  },
  {
    title: "Pachet BUSINESS",
    subtitle: "Cel mai popular",
    price: "de la 600",
    period: "€/lună",
    description: "Soluția completă pentru companii în creștere cu 10-50 angajați.",
    features: [
      "Tot ce include START",
      "Administrare completă IT",
      "Backup date (200GB)",
      "Telefonie VoIP",
      "Răspuns în 4 ore",
      "Vizite lunare on-site",
    ],
    highlighted: true,
  },
  {
    title: "Pachet ENTERPRISE",
    subtitle: "Pentru companii mari",
    price: "Personalizat",
    period: "",
    description: "Soluții personalizate pentru companii cu nevoi complexe și cerințe speciale.",
    features: [
      "Tot ce include BUSINESS",
      "Manager IT dedicat",
      "SLA personalizat",
      "Infrastructură cloud",
      "Securitate avansată",
      "Răspuns în 1 oră",
      "Suport 24/7",
    ],
    highlighted: false,
  },
];

export const metadata = {
  title: "Soluții IT | IT Advisors",
  description: "Pachete de servicii IT adaptate nevoilor companiei tale. De la startup la enterprise, avem soluția potrivită.",
};

export default function SolutiiPage() {
  return (
    <>
      <PageHeader
        badge="Pachete și soluții"
        title="Soluții IT Complete"
        description="Alege pachetul potrivit pentru afacerea ta. Toate pachetele includ consultanță și suport tehnic profesional."
      />

      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution) => (
              <div
                key={solution.title}
                className={`relative p-8 rounded-2xl ${
                  solution.highlighted
                    ? "bg-[#2e6932] text-white shadow-xl shadow-[#2e6932]/25 scale-105"
                    : "bg-white border border-gray-200"
                }`}
              >
                {solution.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#3d8a42] text-white text-sm font-semibold rounded-full">
                    Recomandat
                  </div>
                )}
                <div className={`text-sm font-medium mb-2 ${solution.highlighted ? "text-white/80" : "text-[#2e6932]"}`}>
                  {solution.subtitle}
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${solution.highlighted ? "text-white" : "text-gray-900"}`}>
                  {solution.title}
                </h2>
                <div className="mb-4">
                  <span className={`text-3xl font-bold ${solution.highlighted ? "text-white" : "text-gray-900"}`}>
                    {solution.price}
                  </span>
                  <span className={solution.highlighted ? "text-white/80" : "text-gray-500"}>
                    {solution.period}
                  </span>
                </div>
                <p className={`mb-6 ${solution.highlighted ? "text-white/80" : "text-gray-600"}`}>
                  {solution.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <svg className={`w-5 h-5 ${solution.highlighted ? "text-[#4a9c50]" : "text-[#2e6932]"}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className={solution.highlighted ? "text-white" : "text-gray-700"}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block w-full py-3 text-center font-semibold rounded-xl transition-colors ${
                    solution.highlighted
                      ? "bg-white text-[#2e6932] hover:bg-gray-100"
                      : "bg-[#2e6932] text-white hover:bg-[#3d8a42]"
                  }`}
                >
                  Solicită ofertă
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Întrebări frecvente</h2>
          <div className="space-y-6">
            {[
              { q: "Cum funcționează externalizarea IT?", a: "Preluăm complet administrarea infrastructurii IT a companiei dumneavoastră. Echipa noastră monitorizează, întreține și optimizează toate sistemele, oferind suport tehnic ori de câte ori este nevoie." },
              { q: "Cât durează implementarea?", a: "De obicei, tranziția durează între 1-2 săptămâni, în funcție de complexitatea infrastructurii. În această perioadă, facem un audit complet și preluăm treptat toate serviciile." },
              { q: "Ce se întâmplă în caz de urgență?", a: "Oferim suport prioritar pentru urgențe. În funcție de pachetul ales, timpul de răspuns variază între 1-8 ore. Pentru pachetul Enterprise, oferim suport 24/7." },
            ].map((faq) => (
              <div key={faq.q} className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

