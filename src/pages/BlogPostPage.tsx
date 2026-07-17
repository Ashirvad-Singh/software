import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
const fallbackPost = {
  title: "The Future of Web Development in 2026",
  category: "Technology",
  author: "Mike Johnson",
  date: "Oct 24, 2026",
  readTime: "5 min read",
  image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
  content: `
    <p>The landscape of web development has shifted dramatically over the past few years.</p>
    <h2>Conclusion</h2>
    <p>The future of web development is incredibly exciting.</p>
  `
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const q = query(collection(db, "blogs"), where("slug", "==", slug));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setPostData({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
        } else {
          setPostData(fallbackPost); // Fallback for demo
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setPostData(fallbackPost);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchPost();
  }, [slug]);

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
      <div className="w-full bg-gradient-to-r from-blue-500 to-sky-600 pt-36 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <Link to="/blog" className="inline-flex items-center text-white/90 hover:text-white mb-10 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to main blog
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white mb-10 leading-[1.1] tracking-tight max-w-4xl">
            {postData.title}
          </h1>
          
          <div className="flex items-center gap-3 text-white/90 text-sm font-medium">
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
          <article 
            className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-p:leading-relaxed max-w-none"
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />
        </div>

        {/* Right Sidebar - Table of Content */}
        <div className="w-full lg:w-[360px] shrink-0">
          <div className="sticky top-32 bg-slate-50 dark:bg-neutral-900 rounded-xl p-8">
            <h3 className="font-bold text-lg mb-8 text-neutral-900 dark:text-white">Table of Content</h3>
            <div className="flex flex-col gap-5 text-sm font-semibold text-neutral-600 dark:text-neutral-400">
              <a href="#" className="hover:text-blue-600 transition-colors leading-relaxed">What Are Google Ads and Facebook Ads?</a>
              <div className="h-px bg-neutral-200 dark:bg-neutral-800" />
              <a href="#" className="hover:text-blue-600 transition-colors leading-relaxed">Key Differences Between Google Ads and Facebook Ads for DTC Brands</a>
              <div className="h-px bg-neutral-200 dark:bg-neutral-800" />
              <a href="#" className="hover:text-blue-600 transition-colors leading-relaxed">Google Ads vs Facebook Ads Across the Sales Funnel</a>
              <div className="h-px bg-neutral-200 dark:bg-neutral-800" />
              <a href="#" className="hover:text-blue-600 transition-colors leading-relaxed">1. Building Awareness at the Top of the Funnel</a>
              <div className="h-px bg-neutral-200 dark:bg-neutral-800" />
              <a href="#" className="hover:text-blue-600 transition-colors leading-relaxed">2. Building Consideration in the Middle of the Funnel</a>
            </div>
          </div>
        </div>
        
      </div>
    </main>
  );
}
