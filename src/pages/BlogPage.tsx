import ContentSkeleton from "@/components/content/ContentSkeleton";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { useCatalog } from "@/lib/content/useCatalog";
import CatalogState from "@/components/content/CatalogState";
import InnerPageHero from "@/components/site/InnerPageHero";
import SEO from "@/components/site/SEO";

export default function BlogPage() {
  const { entries: displayPosts, loading, error, retry } = useCatalog("blogs");
  const featuredPost = displayPosts.find(post => post.featured);
  const regularPosts = displayPosts.filter(post => post.id !== featuredPost?.id);

  return (
    <main className="bg-neutral-50 dark:bg-neutral-950 min-h-screen">
      <SEO
        title="Blog & Insights"
        description="Thoughts, tutorials, and insights on web development, mobile apps, design, and building successful digital products."
      />
      <InnerPageHero
        eyebrow="INSIGHTS & RESOURCES"
        title="Our Latest"
        highlightTitle="Thinking"
        description="Thoughts, tutorials, and insights on design, development, and building successful digital products."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl pt-6 sm:pt-8 md:pt-10">

        <CatalogState loading={false} error={error} empty={!loading && !displayPosts.length} label="articles" retry={retry} />
        {loading ? (
          <ContentSkeleton label="articles" variant="cards" className="mx-auto max-w-7xl px-5 py-10" />
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
          <Link to={`/blog/${featuredPost.slug}`} className="group block mb-12 sm:mb-16">
            <div className="relative rounded-3xl overflow-hidden bg-white shadow-sm border border-neutral-100 flex flex-col lg:flex-row hover:shadow-xl transition-all duration-300">
              <div className="w-full lg:w-1/2 aspect-video lg:aspect-auto relative overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                </div>
              </div>
              <div className="w-full lg:w-1/2 p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {featuredPost.date}</span>
                  <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {featuredPost.readTime}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-8 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center">
                      <User className="w-5 h-5 text-neutral-500" />
                    </div>
                    <span className="font-medium text-foreground">{featuredPost.author}</span>
                  </div>
                  <div className="text-primary font-bold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group block h-full">
              <div className="h-full rounded-2xl overflow-hidden bg-white shadow-sm border border-neutral-100 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-foreground text-[10px] font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-100">
                    <span className="text-sm font-medium text-foreground">{post.author}</span>
                    <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        </>
        )}
      </div>
    </main>
  );
}
