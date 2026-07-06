import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

const blogPosts = [
  {
    id: 1,
    slug: "future-of-web-development-2026",
    title: "The Future of Web Development in 2026",
    excerpt: "Explore the cutting-edge trends shaping the digital landscape, from AI-driven UI generation to WASM-powered web apps.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
    category: "Technology",
    author: "Mike Johnson",
    date: "Oct 24, 2026",
    readTime: "5 min read",
    featured: true
  },
  {
    id: 2,
    slug: "mastering-react-server-components",
    title: "Mastering React Server Components",
    excerpt: "A deep dive into how RSCs are fundamentally changing the way we build and optimize React applications.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
    category: "Development",
    author: "Sarah Smith",
    date: "Oct 20, 2026",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 3,
    slug: "design-systems-for-scale",
    title: "Building Design Systems for Scale",
    excerpt: "Learn how to architect a flexible, maintainable design system that grows with your organization.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
    category: "Design",
    author: "John Doe",
    date: "Oct 15, 2026",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 4,
    slug: "mobile-first-vs-desktop-first",
    title: "Mobile-First vs Desktop-First in Modern Web",
    excerpt: "Why the classic debate is evolving and how to adopt an omni-channel responsive strategy.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
    category: "UX/UI",
    author: "Lisa Chen",
    date: "Oct 10, 2026",
    readTime: "4 min read",
    featured: false
  }
];

export default function BlogPage() {
  const [dbPosts, setDbPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (data.length > 0) {
          setDbPosts(data);
        } else {
          setDbPosts(blogPosts);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setDbPosts(blogPosts);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const displayPosts = dbPosts.length > 0 ? dbPosts : blogPosts;
  const featuredPost = displayPosts.find(post => post.featured);
  const regularPosts = displayPosts.filter(post => post.id !== featuredPost?.id);

  return (
    <main className="pt-32 pb-32 bg-neutral-50 dark:bg-neutral-950 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">
            Insights & Articles
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 text-foreground">
            Our Latest Thinking
          </h2>
          <p className="text-muted-foreground text-lg">
            Thoughts, tutorials, and insights on design, development, and building successful digital products.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
          <Link to={`/blog/${featuredPost.slug}`} className="group block mb-16">
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
              <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
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
