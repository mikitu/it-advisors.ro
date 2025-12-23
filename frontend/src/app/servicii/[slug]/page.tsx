import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import { getServiceBySlug, getServices, type Service } from "@/lib/strapi";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <PageHeader badge={service.icon + " Serviciu"} title={service.title} description={service.description} />

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {service.fullDescription && (
                <p className="text-lg text-gray-600 mb-8">{service.fullDescription}</p>
              )}
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ce include acest serviciu</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {service.features?.map((feature, index) => (
                  <div key={index} className="p-6 bg-gray-50 rounded-xl flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#2e6932] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="sticky top-28 p-6 bg-[#2e6932] rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-4">De ce să ne alegi</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#4a9c50]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Expertiză de peste 15 ani
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#4a9c50]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Suport rapid și profesional
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#4a9c50]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Soluții personalizate
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#4a9c50]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Prețuri competitive
                  </li>
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

