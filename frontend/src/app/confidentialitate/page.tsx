import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "Politica de confidențialitate | IT Advisors",
  description: "Politica de confidențialitate a IT Advisors privind colectarea și utilizarea datelor personale.",
};

export default function ConfidentialitatePage() {
  return (
    <>
      <PageHeader
        title="Politica de confidențialitate"
        description="Informații privind modul în care colectăm, utilizăm și protejăm datele dumneavoastră"
      />

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600">
            
            <p>
              <strong>CAM Advisors Project SRL</strong> respectă confidențialitatea datelor dumneavoastră personale. 
              Această politică descrie ce informații colectăm, cum le folosim și cum le protejăm.
            </p>

            <h2>Ce date colectăm</h2>
            <ul>
              <li>Informații de identificare (nume, prenume)</li>
              <li>Date de contact (adresă email, număr de telefon)</li>
              <li>Informații despre companie (denumire, CUI)</li>
              <li>Date tehnice (adresă IP, tip browser, pentru funcționalitatea site-ului)</li>
            </ul>

            <h2>Cum folosim datele</h2>
            <ul>
              <li>Pentru a răspunde solicitărilor dumneavoastră</li>
              <li>Pentru a furniza serviciile contractate</li>
              <li>Pentru facturare și livrare</li>
              <li>Pentru a vă informa despre serviciile și produsele noastre</li>
              <li>Pentru îmbunătățirea serviciilor noastre</li>
            </ul>

            <h2>Cât timp păstrăm datele</h2>
            <p>
              Păstrăm datele personale atât timp cât este necesar pentru scopurile pentru care au fost colectate, 
              conform obligațiilor legale și pentru perioada necesară îndeplinirii obligațiilor contractuale.
            </p>

            <h2>Cum protejăm datele</h2>
            <p>
              Utilizăm măsuri tehnice și organizatorice adecvate pentru a proteja datele personale împotriva 
              accesului neautorizat, modificării, divulgării sau distrugerii. Acestea includ:
            </p>
            <ul>
              <li>Criptare SSL pentru transmiterea datelor</li>
              <li>Acces restricționat la date pe bază de necesitate</li>
              <li>Sisteme de backup și recuperare</li>
              <li>Instruirea angajaților privind protecția datelor</li>
            </ul>

            <h2>Drepturile dumneavoastră</h2>
            <p>
              Conform GDPR, aveți dreptul la: acces, rectificare, ștergere, restricționare, 
              portabilitate și obiecție cu privire la datele personale. 
              Pentru detalii complete, consultați <a href="/gdpr" className="text-[#2e6932] hover:underline">pagina GDPR</a>.
            </p>

            <h2>Contact</h2>
            <p>
              Pentru orice întrebări privind politica de confidențialitate sau pentru exercitarea drepturilor dumneavoastră, 
              ne puteți contacta la:
            </p>
            <div className="bg-gray-50 p-6 rounded-xl not-prose">
              <p className="text-gray-600">Email: <a href="mailto:protectiedate@it-advisors.ro" className="text-[#2e6932] hover:underline">protectiedate@it-advisors.ro</a></p>
              <p className="text-gray-600">Telefon: <a href="tel:+40728691520" className="text-[#2e6932] hover:underline">+40 (728) 691 520</a></p>
              <p className="text-gray-600 mt-2">Str. Prevederii 9, Bloc PM20, Sector 3, București, 032292</p>
            </div>

            <p className="text-sm text-gray-500 mt-8">
              Ultima actualizare: Decembrie 2024
            </p>

          </div>
        </div>
      </section>
    </>
  );
}

