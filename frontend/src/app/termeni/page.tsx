import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "Termeni și condiții | IT Advisors",
  description: "Termenii și condițiile de utilizare a serviciilor IT Advisors.",
};

export default function TermeniPage() {
  return (
    <>
      <PageHeader
        title="Termeni și condiții"
        description="Termenii și condițiile de utilizare a serviciilor noastre"
      />

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600">
            
            <h2>1. Definiții</h2>
            <p>
              <strong>„Prestator"</strong> - CAM Advisors Project SRL, cu sediul în București, Str. Prevederii 9, 
              Bloc PM20, Scara 1, Etaj 9, Apartament 56, Sector 3, cod poștal 032292.
            </p>
            <p>
              <strong>„Client"</strong> - persoana fizică sau juridică care utilizează serviciile Prestatorului.
            </p>
            <p>
              <strong>„Servicii"</strong> - serviciile IT furnizate de Prestator, incluzând dar fără a se limita la: 
              administrare IT, suport tehnic, telefonie VoIP, web design, hosting, virtualizare și securitate IT.
            </p>

            <h2>2. Obiectul contractului</h2>
            <p>
              Prestatorul se obligă să furnizeze Clientului serviciile IT solicitate, în condițiile și 
              la nivelul de calitate stabilite prin oferta acceptată sau contractul încheiat.
            </p>

            <h2>3. Obligațiile Prestatorului</h2>
            <ul>
              <li>Să furnizeze serviciile în conformitate cu specificațiile agreate</li>
              <li>Să asigure confidențialitatea informațiilor Clientului</li>
              <li>Să respecte termenele de răspuns stabilite prin SLA</li>
              <li>Să informeze Clientul despre orice modificări ale serviciilor</li>
              <li>Să asigure backup-ul datelor conform planului stabilit</li>
            </ul>

            <h2>4. Obligațiile Clientului</h2>
            <ul>
              <li>Să furnizeze informațiile necesare pentru prestarea serviciilor</li>
              <li>Să asigure accesul la infrastructura IT, când este necesar</li>
              <li>Să achite facturile în termenul stabilit</li>
              <li>Să nu utilizeze serviciile în scopuri ilegale</li>
              <li>Să informeze Prestatorul despre orice modificări relevante</li>
            </ul>

            <h2>5. Plata serviciilor</h2>
            <p>
              Serviciile se facturează lunar/conform contractului, cu termen de plată de 15 zile calendaristice 
              de la data emiterii facturii. Întârzierea la plată atrage penalități de 0.1% pe zi de întârziere.
            </p>

            <h2>6. Limitarea răspunderii</h2>
            <p>
              Prestatorul nu răspunde pentru daunele indirecte, pierderi de profit sau date, cu excepția 
              cazurilor de neglijență gravă sau dol. Răspunderea totală a Prestatorului este limitată la 
              valoarea serviciilor prestate în ultimele 12 luni.
            </p>

            <h2>7. Forța majoră</h2>
            <p>
              Niciuna dintre părți nu răspunde pentru neexecutarea obligațiilor contractuale dacă aceasta 
              se datorează unui eveniment de forță majoră, așa cum este definit de legislația română.
            </p>

            <h2>8. Confidențialitate</h2>
            <p>
              Ambele părți se obligă să păstreze confidențialitatea informațiilor obținute în cadrul 
              colaborării, cu excepția cazurilor în care divulgarea este cerută de lege.
            </p>

            <h2>9. Proprietate intelectuală</h2>
            <p>
              Toate drepturile de proprietate intelectuală asupra soluțiilor dezvoltate de Prestator 
              rămân proprietatea Prestatorului, cu excepția cazurilor în care se convine altfel în scris.
            </p>

            <h2>10. Modificarea termenilor</h2>
            <p>
              Prestatorul își rezervă dreptul de a modifica acești termeni. Modificările vor fi comunicate 
              Clienților cu cel puțin 30 de zile înainte de intrarea în vigoare.
            </p>

            <h2>11. Legea aplicabilă</h2>
            <p>
              Acești termeni sunt guvernați de legea română. Orice litigiu va fi soluționat de instanțele 
              competente din București.
            </p>

            <div className="bg-gray-50 p-6 rounded-xl not-prose mt-8">
              <p className="font-semibold text-gray-900">CAM Advisors Project SRL</p>
              <p className="text-gray-600 mt-2">Str. Prevederii 9, Bloc PM20, Scara 1, Etaj 9, Ap. 56</p>
              <p className="text-gray-600">Sector 3, București, 032292, România</p>
              <p className="text-gray-600 mt-2">Email: <a href="mailto:contact@it-advisors.ro" className="text-[#2e6932] hover:underline">contact@it-advisors.ro</a></p>
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

