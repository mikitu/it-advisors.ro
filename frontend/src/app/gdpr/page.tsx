import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "GDPR - Prelucrarea datelor cu caracter personal | IT Advisors",
  description: "Informații privind prelucrarea datelor cu caracter personal conform GDPR.",
};

export default function GDPRPage() {
  return (
    <>
      <PageHeader
        title="Prelucrarea datelor cu caracter personal"
        description="Conform Regulamentului General privind Protecția Datelor (GDPR)"
      />

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600">
            
            <p>
              Conform legislației în vigoare, Legea nr. 677/2001 cu referire la protecția persoanelor în raport cu 
              prelucrarea datelor personale, <strong>CAM Advisors Project SRL</strong> se obligă să respecte în stricte condiții 
              de siguranță datele personale furnizate de utilizatori.
            </p>

            <h2>Care este scopul colectării de date personale?</h2>
            <p>
              Scopul principal este de informare a clienților CAM Advisors Project SRL cu privire la starea contului creat, 
              pentru facturarea și livrarea serviciilor sau produselor comandate și soluționarea oricăror probleme ce țin 
              de serviciile prestate, respectiv de produsele livrate (informații, garanții, etc.).
            </p>
            <p>
              La utilizarea formularului de contact de pe website, utilizatorul este rugat să completeze un formular, 
              astfel acceptând ca datele lui personale solicitate vor fi incluse într-o bază de date atent supravegheată.
            </p>

            <h2>Care sunt drepturile dumneavoastră?</h2>
            
            <h3>1. Dreptul la accesarea datelor</h3>
            <p>
              Aveți dreptul de a obține confirmarea că datele dvs. cu caracter personal sunt sau nu procesate de către noi. 
              În plus, aveți dreptul să obțineți informații mai detaliate în ceea ce privește datele personale stocate.
            </p>

            <h3>2. Dreptul la rectificarea datelor</h3>
            <p>
              Aveți dreptul să solicitați rectificarea datelor personale incorecte și, ținând cont de scopul în care 
              ele sunt procesate, să solicitați completarea datelor personale care lipsesc.
            </p>

            <h3>3. Dreptul la ștergerea datelor</h3>
            <p>În anumite cazuri, aveți dreptul la ștergerea datelor dvs. personale fără întârzieri nejustificate:</p>
            <ul>
              <li>Când datele personale nu mai sunt necesare în raport cu scopurile pentru care au fost colectate</li>
              <li>Când vă retrageți consimțământul pentru procesarea pe bază de consimțământ</li>
              <li>Când procesarea este în scopuri de marketing direct</li>
              <li>Când datele personale au fost procesate fără respectarea legislației în vigoare</li>
            </ul>

            <h3>4. Dreptul la restricționarea procesării</h3>
            <p>
              În anumite cazuri, aveți dreptul la restricționarea procesării datelor dvs. personale. 
              Acolo unde procesarea a fost restricționată, noi putem continua să stocăm datele dvs. personale.
            </p>

            <h3>5. Dreptul la portabilitatea datelor</h3>
            <p>
              Aveți dreptul să obțineți datele dvs. cu caracter personal într-un format structurat, 
              folosit în mod uzual și compatibil cu dispozitivele de citire generice.
            </p>

            <h3>6. Dreptul la obiecție</h3>
            <p>
              Aveți dreptul să obiectați cu privire la procesarea datelor dvs. personale din considerente 
              specifice situației dvs. individuale.
            </p>

            <h3>7. Dreptul la retragerea consimțământului</h3>
            <p>
              În măsura în care temeiul legal pentru procesarea datelor decurge din consimțământul dvs., 
              aveți dreptul să vă retrageți în orice moment din acel consimțământ.
            </p>

            <h3>8. Dreptul de a face plângere</h3>
            <p>
              Aveți dreptul să înregistrați oricând o plângere la autoritatea locală de supraveghere a protecției datelor:
            </p>
            <div className="bg-gray-50 p-6 rounded-xl not-prose">
              <p className="font-semibold text-gray-900">Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal</p>
              <p className="text-gray-600 mt-2">Bld. General Gheorghe Magheru 28-30, 010336, București, România</p>
              <p className="text-gray-600">Telefon: +40 318 059 211</p>
              <p className="text-gray-600">Website: <a href="http://www.dataprotection.ro" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.dataprotection.ro</a></p>
            </div>

            <h2>Cum sunt stocate datele dumneavoastră?</h2>
            <p>
              Prelucrarea datelor cu caracter personal se realizează prin mijloace automate/manuale, 
              cu respectarea cerințelor legale și în condiții care să asigure securitatea, 
              confidențialitatea și respectarea drepturilor persoanelor vizate.
            </p>

            <h2>Contact pentru protecția datelor</h2>
            <p>
              Puteți modifica datele furnizate sau adresa întrebări referitoare la datele cu caracter personal 
              la adresa de email: <a href="mailto:protectiedate@it-advisors.ro" className="text-blue-600 hover:underline">protectiedate@it-advisors.ro</a>
            </p>

            <div className="bg-gray-50 p-6 rounded-xl not-prose mt-8">
              <p className="font-semibold text-gray-900">CAM Advisors Project SRL</p>
              <p className="text-gray-600 mt-2">Str. Prevederii 9, Bloc PM20, Scara 1, Etaj 9, Apartament 56</p>
              <p className="text-gray-600">Sector 3, București, 032292, România</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

