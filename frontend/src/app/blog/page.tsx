import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { getBlogPosts, getBlogCategories, type BlogPost, type BlogCategory } from "@/lib/strapi";

export const metadata = {
  title: "Blog | IT Advisors",
  description: "Sfaturi IT, experiențe din teren și ghiduri practice de la echipa IT Advisors.",
};

export default async function BlogPage() {
  let blogPosts: BlogPost[] = [];
  let blogCategories: BlogCategory[] = [];

  try {
    [blogPosts, blogCategories] = await Promise.all([
      getBlogPosts(),
      getBlogCategories()
    ]);
  } catch (error) {
    console.error("Failed to fetch blog data from Strapi:", error);
  }

  const categories = ["Toate", ...blogCategories.map(c => c.name)];
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
                      {post.category?.name || 'Necategorizat'}
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime} citire</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#2e6932] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.publishedDate}</span>
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

