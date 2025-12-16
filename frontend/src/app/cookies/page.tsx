import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "Politica de cookies | IT Advisors",
  description: "Informații despre utilizarea cookie-urilor pe site-ul IT Advisors.",
};

export default function CookiesPage() {
  return (
    <>
      <PageHeader
        title="Politica de cookies"
        description="Informații despre utilizarea cookie-urilor pe site-ul nostru"
      />

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600">
            
            <h2>Ce sunt cookie-urile?</h2>
            <p>
              Cookie-urile sunt fișiere text de mici dimensiuni care sunt stocate pe dispozitivul dumneavoastră 
              (computer, telefon, tabletă) atunci când vizitați un site web. Acestea permit site-ului să 
              recunoască dispozitivul dumneavoastră și să îmbunătățească experiența de navigare.
            </p>

            <h2>Ce tipuri de cookie-uri folosim?</h2>
            
            <h3>Cookie-uri esențiale</h3>
            <p>
              Aceste cookie-uri sunt necesare pentru funcționarea corectă a site-ului. Fără acestea, 
              site-ul nu ar funcționa corespunzător. Nu colectează informații în scopuri de marketing.
            </p>

            <h3>Cookie-uri de performanță</h3>
            <p>
              Aceste cookie-uri colectează informații despre modul în care vizitatorii folosesc site-ul 
              (de exemplu, paginile cele mai vizitate). Informațiile sunt agregate și anonime, 
              fiind folosite doar pentru îmbunătățirea funcționării site-ului.
            </p>

            <h3>Cookie-uri de funcționalitate</h3>
            <p>
              Permit site-ului să rețină alegerile dumneavoastră (precum limba preferată sau regiunea) 
              și să ofere funcționalități îmbunătățite și personalizate.
            </p>

            <h2>Cookie-uri utilizate pe acest site</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Nume</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Tip</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Scop</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Expirare</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm">_session</td>
                    <td className="px-4 py-3 text-sm">Esențial</td>
                    <td className="px-4 py-3 text-sm">Sesiune utilizator</td>
                    <td className="px-4 py-3 text-sm">Sesiune</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm">cookie_consent</td>
                    <td className="px-4 py-3 text-sm">Esențial</td>
                    <td className="px-4 py-3 text-sm">Memorează consimțământul</td>
                    <td className="px-4 py-3 text-sm">1 an</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Cum puteți controla cookie-urile?</h2>
            <p>
              Puteți controla și/sau șterge cookie-urile după preferință. Puteți șterge toate cookie-urile 
              care sunt deja pe dispozitivul dumneavoastră și puteți seta majoritatea browserelor să blocheze 
              plasarea acestora.
            </p>
            <p>
              Pentru a modifica setările cookie-urilor în browser, accesați:
            </p>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/ro/kb/cookies-informatii-site-uri-stocate-calculator" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/ro-ro/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/ro-ro/microsoft-edge/ștergerea-modulelor-cookie-în-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Microsoft Edge</a></li>
            </ul>

            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl not-prose mt-8">
              <p className="text-emerald-800">
                <strong>Notă:</strong> Acest site folosește cookie-uri doar pentru funcționalitatea site-ului, 
                nu pentru tracking sau beacon. Respectăm confidențialitatea dumneavoastră.
              </p>
            </div>

            <h2>Contact</h2>
            <p>
              Pentru întrebări despre politica de cookies, ne puteți contacta la: 
              <a href="mailto:contact@it-advisors.ro" className="text-emerald-600 hover:underline">contact@it-advisors.ro</a>
            </p>

            <p className="text-sm text-gray-500 mt-8">
              Ultima actualizare: Decembrie 2024
            </p>

          </div>
        </div>
      </section>
    </>
  );
}

