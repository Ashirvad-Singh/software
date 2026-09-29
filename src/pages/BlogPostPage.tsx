import ContentSkeleton from "@/components/content/ContentSkeleton";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { useCatalog } from "@/lib/content/useCatalog";
import { prepareArticle } from "@/lib/content/article";
import CatalogState from "@/components/content/CatalogState";
import InnerPageHero from "@/components/site/InnerPageHero";
import DetailThumbnail from "@/components/content/DetailThumbnail";
import SEO from "@/components/site/SEO";

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { entries, loading, error, retry } = useCatalog("blogs", slug);
  const postData = entries[0];
  const article = useMemo(() => prepareArticle(postData?.content || ""), [postData?.content]);
  if (error) return <main className="min-h-screen pt-32"><CatalogState loading={false} error empty={false} label="this article" retry={retry} /></main>;

  if (loading) return <main className="min-h-screen"><ContentSkeleton variant="detail" label="article" /></main>;

  if (!postData) {
    return (
      <main className="bg-white dark:bg-neutral-950 min-h-screen flex flex-col items-center justify-center">
        <SEO title="Article Not Found" />
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Button onClick={() => navigate("/blog")}>Back to Blog</Button>
      </main>
    );
  }

  return (
    <main className="bg-white dark:bg-neutral-950 min-h-screen">
      <SEO
        title={postData.title}
        description={postData.excerpt || postData.content?.slice(0, 160) || ""}
      />
      <InnerPageHero
        eyebrow="ARTICLE / INSIGHTS"
        title={postData.title}
        description={`By ${postData.author || "ADAT Soft Solutions"} • ${postData.date || ""} • ${postData.readTime || ""}`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: postData.title },
        ]}
      />

      {/* Content Section */}
      {postData.image && (
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
          <DetailThumbnail src={postData.image} alt={postData.title} />
        </div>
      )}
      <div className="container mx-auto px-4 md:px-6 max-w-6xl py-10 flex flex-col lg:flex-row gap-10 lg:gap-16">
        
        {/* Article Body */}
        <div className="flex-1 min-w-0">
          <article 
            className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-p:leading-relaxed max-w-none"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />
        </div>

        {article.headings.length > 0 && <aside className="w-full lg:w-[280px] shrink-0">
          <nav aria-label="Table of contents" className="sticky top-28 rounded-xl bg-slate-50 p-5 sm:p-8 dark:bg-neutral-900">
            <h2 className="mb-6 text-lg font-bold">Table of contents</h2>
            <ul className="space-y-4 text-sm">
              {article.headings.map(heading => <li key={heading.id}><a className="hover:text-primary" href={`#${heading.id}`}>{heading.title}</a></li>)}
            </ul>
          </nav>
        </aside>}

        
      </div>
    </main>
  );
}
