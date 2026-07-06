import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Share2, Loader2 } from "lucide-react";
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
  image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2000",
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
      <div className="relative w-full h-[60vh] min-h-[400px]">
        <img 
          src={postData.image} 
          alt={postData.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-4 md:px-6 max-w-4xl pb-16">
          <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors w-fit">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>
          
          <div className="mb-6">
            <span className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider">
              {postData.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {postData.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" /> {postData.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {postData.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> {postData.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-6 max-w-4xl py-16 md:py-24 flex flex-col md:flex-row gap-12">
        {/* Social Share Sidebar */}
        <div className="hidden md:flex flex-col gap-4 sticky top-32 h-fit">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Share</span>
          <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-neutral-200">
            <Share2 className="w-4 h-4" />
          </Button>
          {/* Add more social icons as needed */}
        </div>
        
        {/* Article Body */}
        <article 
          className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-neutral-600 dark:prose-p:text-neutral-400 prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:bg-neutral-50 dark:prose-blockquote:bg-neutral-900 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:font-medium prose-blockquote:italic max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.content }}
        />
      </div>
    </main>
  );
}
