import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import ServiceStats from "@/components/service/ServiceStats";
import ServiceBenefits from "@/components/service/ServiceBenefits";
import ServiceProcess from "@/components/service/ServiceProcess";
import ServiceTestimonials from "@/components/service/ServiceTestimonials";
import ServiceShowcases from "@/components/service/ServiceShowcases";
import { getServiceBySlug, getServices } from "@/lib/strapi";
import { mockServiceData } from "@/lib/mock-service-data";

export async function generateStaticParams() {
  try {
    const services = await getServices();
    return services.map((service) => ({ slug: service.slug }));
  } catch {
    return Object.keys(mockServiceData).map((slug) => ({ slug }));
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let service = null;
  try {
    service = await getServiceBySlug(slug);
  } catch {
    // Strapi not available, use mock data
  }

  // Fallback to mock data if service not found or Strapi unavailable
  const mockData = mockServiceData[slug];
  if (!service && !mockData) notFound();

  const title = service?.title || mockData?.title || "";
  const description = service?.description || mockData?.description || "";
  const icon = service?.icon || mockData?.icon || "🔧";
  const features = service?.features || mockData?.features || [];
  const fullDescription = service?.fullDescription || mockData?.fullDescription;
  const benefits = service?.benefits || mockData?.benefits || [];
  const process = service?.process || mockData?.process || [];
  const stats = service?.stats || mockData?.stats || {};
  const testimonials = service?.testimonials || mockData?.testimonials || [];
  const showcases = service?.showcases || mockData?.showcases || [];

  const breadcrumbs = [
    { label: "Servicii", href: "/servicii" },
    { label: title },
  ];

  return (
    <>
      <PageHeader
        badge={icon + " Serviciu"}
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
      />

      {/* Stats Section */}
      {Object.keys(stats).length > 0 && <ServiceStats stats={stats} />}

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {fullDescription && (
                <p className="text-lg text-gray-600 mb-8">{fullDescription}</p>
              )}
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ce include acest serviciu</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {features?.map((feature, index) => (
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

      {/* Benefits Section */}
      {benefits.length > 0 && <ServiceBenefits benefits={benefits} />}

      {/* Process Section */}
      {process.length > 0 && <ServiceProcess process={process} />}

      {/* Testimonials Section */}
      {testimonials.length > 0 && <ServiceTestimonials testimonials={testimonials} />}

      {/* Showcases/Case Studies Section */}
      {showcases.length > 0 && <ServiceShowcases showcases={showcases} />}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#2e6932] to-[#28504a]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pregătit să îmbunătățești infrastructura IT?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Contactează-ne pentru o consultație gratuită și o ofertă personalizată
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-[#2e6932] font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Solicită ofertă gratuită
            </Link>
            <Link
              href="tel:+40212345678"
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/30"
            >
              📞 Sună acum
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

