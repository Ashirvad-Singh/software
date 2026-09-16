import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { useCatalog } from "@/lib/content/useCatalog";
import { prepareArticle } from "@/lib/content/article";
import CatalogState from "@/components/content/CatalogState";
export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { entries, loading, error, retry } = useCatalog("blogs", slug);
  const postData = entries[0];
  const article = useMemo(() => prepareArticle(postData?.content || ""), [postData?.content]);
  if (error) return <main className="min-h-screen pt-32"><CatalogState loading={false} error empty={false} label="this article" retry={retry} /></main>;

  if (loading) {
    return (
      <main className="bg-white dark:bg-neutral-950 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </main>
    );
  }

  if (!postData) {
    return (
      <main className="bg-white dark:bg-neutral-950 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Button onClick={() => navigate("/blog")}>Back to Blog</Button>
      </main>
    );
  }

  return (
    <main className="bg-white dark:bg-neutral-950 min-h-screen">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-blue-500 to-sky-600 pt-36 pb-10 md:pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <Link to="/blog" className="inline-flex items-center text-white/90 hover:text-white mb-10 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to main blog
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white mb-10 leading-[1.1] tracking-tight max-w-4xl">
            {postData.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-3 text-white/90 text-sm font-medium">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
               <User className="w-5 h-5 text-white" />
            </div>
            <span>{postData.author}</span>
            <span className="w-1 h-1 rounded-full bg-white/50 mx-1" />
            <span>{postData.date}</span>
            <span className="w-1 h-1 rounded-full bg-white/50 mx-1" />
            <span>{postData.readTime}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-6 max-w-6xl py-16 flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Article Body */}
        <div className="flex-1 min-w-0">
          {postData.image && <img src={postData.image} alt={postData.title} className="mb-8 aspect-video w-full rounded-2xl object-cover" />}
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
