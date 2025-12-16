import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "Despre noi | IT Advisors",
  description: "Descoperiți povestea IT Advisors - partenerul dumneavoastră IT din 2010. Experiență, profesionalism și dedicare.",
};

export default function DesprePage() {
  return (
    <>
      <PageHeader
        badge="Din 2010 alături de dumneavoastră"
        title="Despre IT Advisors"
        description="Peste 15 ani de experiență în soluții IT pentru companii mici și mijlocii"
      />

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Povestea noastră</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>CAM Advisors Project SRL</strong>, cunoscută sub brandul <strong>IT Advisors</strong>, 
                  a fost fondată în <strong>2010</strong> cu o misiune clară: să oferim companiilor mici și mijlocii 
                  acces la servicii IT de calitate enterprise, la prețuri accesibile.
                </p>
                <p>
                  De-a lungul anilor, am crescut împreună cu clienții noștri, adaptându-ne constant la 
                  noile tehnologii și cerințe ale pieței. Am trecut de la suport IT tradițional la 
                  soluții cloud, virtualizare și securitate cibernetică avansată.
                </p>
                <p>
                  Astăzi, suntem mândri să fim partenerul IT de încredere pentru peste 200 de companii 
                  din România, oferind suport 24/7 și soluții personalizate pentru fiecare client.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "2010", label: "Anul înființării" },
                { number: "15+", label: "Ani de experiență" },
                { number: "200+", label: "Clienți mulțumiți" },
                { number: "24/7", label: "Suport disponibil" },
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-50 p-6 rounded-2xl text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">De ce să ne alegeți</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Experiență dovedită",
                description: "Cu peste 15 ani pe piața IT din România, am acumulat experiența necesară pentru a gestiona orice provocare tehnică.",
              },
              {
                icon: "🤝",
                title: "Parteneriat real",
                description: "Nu suntem doar furnizori, suntem parteneri. Ne implicăm activ în succesul afacerii dumneavoastră.",
              },
              {
                icon: "⚡",
                title: "Răspuns rapid",
                description: "Timpul de răspuns garantat prin SLA. În situații critice, intervenim în maxim 1-4 ore.",
              },
              {
                icon: "🔒",
                title: "Securitate prioritară",
                description: "Protejăm datele și infrastructura dumneavoastră cu cele mai noi soluții de securitate.",
              },
              {
                icon: "💰",
                title: "Costuri predictibile",
                description: "Pachete cu preț fix lunar, fără surprize. Știți exact cât plătiți pentru serviciile IT.",
              },
              {
                icon: "📈",
                title: "Scalabilitate",
                description: "Soluțiile noastre cresc odată cu afacerea dumneavoastră, fără investiții majore.",
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-white p-6 rounded-2xl">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Date de contact</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">🏢</span>
                  <div>
                    <div className="font-semibold">Sediu social</div>
                    <div className="text-gray-400">Str. Prevederii 9, Bloc PM20, Scara 1, Etaj 9, Ap. 56<br/>Sector 3, București, 032292, România</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📞</span>
                  <div>
                    <div className="font-semibold">Telefon</div>
                    <a href="tel:+40728691520" className="text-gray-400 hover:text-emerald-400">+40 (728) 691 520</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📧</span>
                  <div>
                    <div className="font-semibold">Email</div>
                    <a href="mailto:contact@it-advisors.ro" className="text-gray-400 hover:text-emerald-400">contact@it-advisors.ro</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <p className="text-xl text-gray-300 mb-6">Pregătiți pentru o colaborare?</p>
              <Link
                href="/contact"
                className="inline-flex px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Contactează-ne acum
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

