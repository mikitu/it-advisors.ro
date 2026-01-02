import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { getProductCategories, type ProductCategory } from "@/lib/strapi";

export const metadata = {
  title: "Produse IT | IT Advisors",
  description: "Hardware, software și servicii cloud de la parteneri de încredere. Consultanță gratuită pentru alegerea produselor potrivite.",
};

export default async function ProdusePage() {
  let products: ProductCategory[] = [];

  try {
    products = await getProductCategories();
  } catch (error) {
    console.error("Failed to fetch products from Strapi:", error);
  }
  return (
    <>
      <PageHeader
        badge="Produse și licențe"
        title="Produse IT"
        description="Suntem parteneri autorizați pentru cele mai importante branduri IT. Oferim consultanță gratuită pentru alegerea produselor potrivite."
      />

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {products.map((category) => (
            <div key={category.name} className="mb-16 last:mb-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <span className="w-12 h-1 bg-[#2e6932] rounded-full" />
                {category.name}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.products?.map((item) => (
                  <div
                    key={item.name}
                    className="p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 border border-transparent hover:border-gray-100"
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-gray-500 mb-8">Parteneri și furnizori</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {["Microsoft", "Dell", "HP", "Cisco", "VMware", "Sophos", "Lenovo", "APC"].map((partner) => (
              <div key={partner} className="text-2xl font-bold text-gray-400">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ai nevoie de o ofertă personalizată?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Trimite-ne cerințele tale și îți vom pregăti o ofertă cu cele mai bune prețuri de pe piață.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-4 bg-[#2e6932] text-white font-semibold rounded-xl hover:bg-[#3d8a42] transition-colors"
          >
            Solicită ofertă
          </Link>
        </div>
      </section>
    </>
  );
}

