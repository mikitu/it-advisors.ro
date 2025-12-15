import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "Cariere | IT Advisors",
  description: "Alătură-te echipei IT Advisors. Descoperă oportunitățile de carieră în domeniul IT.",
};

export default function CarierePage() {
  return (
    <>
      <PageHeader
        badge="Cariere"
        title="Lucrează cu noi"
        description="Construim o echipă de profesioniști pasionați de tehnologie"
      />

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-50 rounded-2xl p-12">
            <div className="text-6xl mb-6">🚀</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Momentan nu avem poziții deschise
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Dar suntem mereu în căutare de oameni talentați! Dacă ești pasionat de IT și vrei să faci parte 
              din echipa noastră, trimite-ne CV-ul tău și te vom contacta când apare o oportunitate potrivită.
            </p>
            <a
              href="mailto:cariere@it-advisors.ro"
              className="inline-flex px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Trimite CV-ul tău
            </a>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "💡",
                title: "Învățare continuă",
                description: "Acces la training-uri, certificări și conferințe în domeniul IT.",
              },
              {
                icon: "🏠",
                title: "Flexibilitate",
                description: "Program flexibil și posibilitatea de a lucra remote.",
              },
              {
                icon: "📈",
                title: "Creștere profesională",
                description: "Proiecte diverse și oportunități de avansare în carieră.",
              },
            ].map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 mb-4">Ai întrebări despre carierele la IT Advisors?</p>
          <a href="mailto:cariere@it-advisors.ro" className="text-blue-400 hover:text-blue-300 font-medium">
            cariere@it-advisors.ro
          </a>
        </div>
      </section>
    </>
  );
}

