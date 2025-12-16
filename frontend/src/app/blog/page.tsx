import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";

const blogPosts = [
  {
    slug: "de-ce-sa-externalizezi-serviciile-it",
    title: "De ce să externalizezi serviciile IT ale companiei tale",
    excerpt: "Externalizarea IT-ului poate reduce costurile cu până la 40% și îți oferă acces la expertiză de top. Descoperă toate avantajele.",
    date: "15 Decembrie 2024",
    category: "Sfaturi",
    readTime: "5 min",
  },
  {
    slug: "securitate-cibernetica-2024",
    title: "Ghid de securitate cibernetică pentru IMM-uri în 2024",
    excerpt: "Amenințările cibernetice evoluează constant. Află cum să îți protejezi afacerea cu măsuri simple dar eficiente.",
    date: "10 Decembrie 2024",
    category: "Securitate",
    readTime: "8 min",
  },
  {
    slug: "migrare-cloud-pas-cu-pas",
    title: "Migrarea în cloud: ghid pas cu pas pentru companii",
    excerpt: "Totul despre migrarea infrastructurii în cloud - de la planificare la implementare și optimizare.",
    date: "5 Decembrie 2024",
    category: "Cloud",
    readTime: "10 min",
  },
  {
    slug: "backup-date-importanta",
    title: "De ce backup-ul datelor îți poate salva afacerea",
    excerpt: "Am văzut companii care au pierdut totul din cauza lipsei unui backup. Nu lăsa să ți se întâmple și ție.",
    date: "28 Noiembrie 2024",
    category: "Experiențe",
    readTime: "6 min",
  },
  {
    slug: "telefonie-voip-avantaje",
    title: "Telefonia VoIP: cum am redus costurile unui client cu 70%",
    excerpt: "Studiu de caz: implementarea unei soluții VoIP pentru o companie cu 50 de angajați.",
    date: "20 Noiembrie 2024",
    category: "Studii de caz",
    readTime: "7 min",
  },
  {
    slug: "windows-11-migrare-enterprise",
    title: "Migrarea la Windows 11 în mediul enterprise",
    excerpt: "Ce trebuie să știi înainte de a face upgrade-ul la Windows 11 în compania ta.",
    date: "15 Noiembrie 2024",
    category: "Sfaturi",
    readTime: "5 min",
  },
];

const categories = ["Toate", "Sfaturi", "Securitate", "Cloud", "Experiențe", "Studii de caz"];

export const metadata = {
  title: "Blog | IT Advisors",
  description: "Sfaturi IT, experiențe din teren și ghiduri practice de la echipa IT Advisors.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        badge="Blog IT Advisors"
        title="Povești din experiența noastră"
        description="Sfaturi practice, studii de caz și tot ce am învățat în 15 ani de IT"
      />

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "Toate"
                    ? "bg-[#2e6932] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog posts grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-[#2e6932] to-[#28504a] flex items-center justify-center">
                  <span className="text-6xl opacity-50">📝</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-[#2e6932]/10 text-[#2e6932] text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime} citire</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#2e6932] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <span className="text-[#2e6932] text-sm font-medium group-hover:underline">
                      Citește →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 bg-slate-900 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Abonează-te la newsletter
            </h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Primește sfaturi IT și noutăți direct în inbox. Fără spam, promitem.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Adresa ta de email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2e6932]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#2e6932] text-white font-semibold rounded-xl hover:bg-[#3d8a42] transition-colors"
              >
                Abonează-te
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

