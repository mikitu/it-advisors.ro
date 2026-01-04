import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import ProductsSection from "@/components/shop/ProductsSection";
import { getProducts, getProductCategories, type Product, type ProductCategory } from "@/lib/strapi";
import { mockProducts, mockBrands, mockCategories } from "@/lib/mock-products";

export const metadata = {
  title: "Produse IT | IT Advisors",
  description: "Hardware, software și servicii cloud de la parteneri de încredere. Cumpără online sau solicită ofertă personalizată.",
};

export default async function ProdusePage() {
  let products: Product[] = [];
  let categories: ProductCategory[] = [];
  let brands: string[] = [];

  try {
    products = await getProducts();
    categories = await getProductCategories();
    // Extract unique brands from products
    brands = [...new Set(products.map(p => p.brand).filter(Boolean))] as string[];
  } catch (error) {
    console.error("Failed to fetch products from Strapi:", error);
    products = mockProducts;
    categories = mockCategories;
    brands = mockBrands;
  }

  // If no products from Strapi, use mock data
  if (products.length === 0) {
    products = mockProducts;
    categories = mockCategories;
    brands = mockBrands;
  }

  return (
    <>
      <PageHeader
        badge="🛒 Shop Online"
        title="Produse IT"
        description="Cumpără online hardware, software și licențe. Livrare rapidă în toată țara."
      />

      {/* Products Grid with Filters */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProductsSection
            products={products}
            categories={categories}
            brands={brands}
          />
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
            Pentru cantități mari sau proiecte speciale, contactează-ne pentru prețuri preferențiale.
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

