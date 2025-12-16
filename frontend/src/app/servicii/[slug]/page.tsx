import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";

const servicesData: Record<string, {
  title: string;
  description: string;
  icon: string;
  longDescription: string;
  benefits: string[];
  features: { title: string; description: string }[];
}> = {
  "administrare-it": {
    title: "Administrare IT",
    description: "Gestionarea completă a infrastructurii IT",
    icon: "🖥️",
    longDescription: "Preluăm complet administrarea infrastructurii IT a companiei dumneavoastră. De la servere și rețele, până la stații de lucru și periferice, ne asigurăm că totul funcționează perfect.",
    benefits: ["Reducerea costurilor cu până la 40%", "Personal IT disponibil oricând", "Monitorizare proactivă 24/7", "Mentenanță preventivă"],
    features: [
      { title: "Monitorizare non-stop", description: "Sistemele sunt monitorizate 24/7 pentru a detecta și rezolva problemele înainte să afecteze activitatea." },
      { title: "Administrare servere", description: "Gestionăm serverele fizice și virtuale, asigurând performanța și securitatea optimă." },
      { title: "Managementul rețelei", description: "Configurare, optimizare și securizare a întregii infrastructuri de rețea." },
      { title: "Rapoarte detaliate", description: "Rapoarte lunare cu statusul infrastructurii și recomandări de îmbunătățire." },
    ],
  },
  "suport-tehnic": {
    title: "Suport Tehnic IT",
    description: "Asistență tehnică rapidă și profesională",
    icon: "🔧",
    longDescription: "Oferim suport tehnic prin multiple canale: telefon, email și remote helpdesk. Intervenim rapid pentru a rezolva orice problemă IT.",
    benefits: ["Timp de răspuns garantat", "Suport remote și on-site", "HelpDesk dedicat", "Tehnicieni certificați"],
    features: [
      { title: "HelpDesk 24/7", description: "Sistem de ticketing profesional pentru gestionarea eficientă a solicitărilor." },
      { title: "Suport remote", description: "Rezolvăm majoritatea problemelor remote, fără a fi nevoie de deplasare." },
      { title: "Intervenții on-site", description: "Când e nevoie, echipa noastră ajunge la sediul dumneavoastră în cel mai scurt timp." },
      { title: "Documentație", description: "Documentăm toate intervențiile pentru referință și analiză ulterioară." },
    ],
  },
  "telefonie-voip": {
    title: "Telefonie VoIP",
    description: "Comunicații moderne și eficiente",
    icon: "📞",
    longDescription: "Soluții de telefonie IP care reduc costurile și îmbunătățesc comunicarea în cadrul companiei și cu partenerii de afaceri.",
    benefits: ["Reducere costuri 70%", "Numere din orice țară", "Integrare cu CRM", "Mobilitate totală"],
    features: [
      { title: "Centrale virtuale", description: "Centrale telefonice în cloud, fără investiții în echipamente." },
      { title: "Numere virtuale", description: "Numere de telefon din România și din străinătate." },
      { title: "Conferințe audio/video", description: "Soluții complete pentru întâlniri online." },
      { title: "Integrări", description: "Integrare cu sistemele existente: CRM, ERP, helpdesk." },
    ],
  },
  "web-hosting": {
    title: "Web Design & Hosting",
    description: "Prezență online profesională",
    icon: "🌐",
    longDescription: "De la design web modern până la găzduire profesională și email business, oferim toate serviciile pentru prezența ta online.",
    benefits: ["Design responsive", "Hosting SSD rapid", "SSL gratuit", "Backup zilnic"],
    features: [
      { title: "Web Design", description: "Site-uri web moderne, optimizate pentru mobil și SEO." },
      { title: "Hosting performant", description: "Servere SSD cu uptime 99.9% și suport tehnic inclus." },
      { title: "Email profesional", description: "Adrese email @domeniul-tau.ro cu antispam și antivirus." },
      { title: "Mentenanță", description: "Actualizări, backup și monitorizare continuă." },
    ],
  },
  "virtualizare": {
    title: "Virtualizare",
    description: "Optimizarea resurselor IT",
    icon: "☁️",
    longDescription: "Implementăm soluții de virtualizare care optimizează utilizarea resurselor hardware și reduc costurile operaționale.",
    benefits: ["Reducere costuri hardware", "Scalabilitate facilă", "Disaster recovery", "Management simplificat"],
    features: [
      { title: "VMware / Hyper-V", description: "Implementare și administrare platforme de virtualizare enterprise." },
      { title: "Cloud privat", description: "Infrastructură cloud privată pentru control total și securitate." },
      { title: "Migrare", description: "Migrare servere fizice în mediu virtual fără downtime." },
      { title: "Backup & DR", description: "Soluții de backup și disaster recovery pentru medii virtuale." },
    ],
  },
  "securitate": {
    title: "Securitate IT",
    description: "Protecție completă pentru afacerea ta",
    icon: "🛡️",
    longDescription: "Protejăm infrastructura IT împotriva tuturor amenințărilor: viruși, ransomware, atacuri cibernetice și pierderi de date.",
    benefits: ["Protecție 360°", "Monitorizare amenințări", "Backup securizat", "Conformitate GDPR"],
    features: [
      { title: "Firewall enterprise", description: "Protecție perimetrală cu firewall-uri next-generation." },
      { title: "Antivirus managed", description: "Soluții antivirus gestionate central cu actualizări automate." },
      { title: "Backup & Recovery", description: "Backup automat în cloud cu recuperare rapidă a datelor." },
      { title: "Audit securitate", description: "Evaluare periodică a vulnerabilităților și recomandări." },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) notFound();

  return (
    <>
      <PageHeader badge={service.icon + " Serviciu"} title={service.title} description={service.description} />

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="text-lg text-gray-600 mb-8">{service.longDescription}</p>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ce include acest serviciu</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {service.features.map((feature) => (
                  <div key={feature.title} className="p-6 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="sticky top-28 p-6 bg-[#2e6932] rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-4">Beneficii</h3>
                <ul className="space-y-3 mb-6">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-[#4a9c50]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="block w-full py-3 bg-white text-[#2e6932] text-center font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                  Solicită ofertă
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

