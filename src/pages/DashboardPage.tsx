import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { sendJobStatusUpdateEmail } from "@/lib/email";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  ExternalLink,
  Lock,
  X,
  Download,
  MessageSquare,
  UserCheck,
  Layers,
  FolderKanban,
  BookOpen,
  Image as ImageIcon,
  Users,
  MessageSquareQuote,
  Cpu,
  FileText,
  Briefcase,
  LogOut,
  Menu,
  Globe,
  ChevronRight,
  ShieldCheck,
  Home,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import BlogsTab from "@/components/dashboard/BlogsTab";
import JobsTab from "@/components/dashboard/JobsTab";
import ServicesTab from "@/components/dashboard/ServicesTab";
import TechStackTab from "@/components/dashboard/TechStackTab";
import GalleryTab from "@/components/dashboard/GalleryTab";
import TeamTab from "@/components/dashboard/TeamTab";
import TestimonialsTab from "@/components/dashboard/TestimonialsTab";
import ProjectsTab from "@/components/dashboard/ProjectsTab";
import CaseStudiesTab from "@/components/dashboard/CaseStudiesTab";

interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
  createdAt: any;
}

interface JobApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  currentCity: string;
  position: string;
  experience: string;
  currentCompany?: string;
  currentCtc?: string;
  expectedCtc?: string;
  noticePeriod: string;
  linkedin?: string;
  portfolio?: string;
  skills: string;
  coverLetter?: string;
  resumeDownloadURL: string;
  status?: string;
  createdAt: any;
}

type TabType =
  | "contact"
  | "applications"
  | "services"
  | "projects"
  | "case_studies"
  | "gallery"
  | "team"
  | "testimonials"
  | "tech_stack"
  | "blogs"
  | "jobs";

interface NavGroup {
  groupName: string;
  items: {
    id: TabType;
    label: string;
    icon: React.ElementType;
    badge?: number;
  }[];
}

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<TabType>("contact");
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [careers, setCareers] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleStatusUpdate = async (appId: string, newStatus: string) => {
    if (
      !confirm(
        `Are you sure you want to change the status to '${newStatus}'? This will send an automated email to the candidate.`,
      )
    )
      return;

    setIsUpdatingStatus(true);
    try {
      await updateDoc(doc(db, "job_applications", appId), {
        status: newStatus,
      });

      const app = careers.find((a) => a.id === appId);
      if (app) {
        await sendJobStatusUpdateEmail(
          app.fullName,
          app.email,
          app.position,
          newStatus,
        );
        toast.success(`Status updated to ${newStatus} and email sent!`);
      }

      fetchData();
      setSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const contactQuery = query(
        collection(db, "contact_submissions"),
        orderBy("createdAt", "desc"),
      );
      const contactSnapshot = await getDocs(contactQuery);
      const contactData = contactSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ContactSubmission[];
      setContacts(contactData);

      const careersQuery = query(
        collection(db, "job_applications"),
        orderBy("createdAt", "desc"),
      );
      const careersSnapshot = await getDocs(careersQuery);
      const careersData = careersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as JobApplication[];
      setCareers(careersData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        setIsAuthenticated(false);
        setContacts([]);
        setCareers([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, emailInput, passwordInput);
      toast.success("Login successful");
      setEmailInput("");
      setPasswordInput("");
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout");
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
  };

  const navGroups: NavGroup[] = [
    {
      groupName: "Inbox & Leads",
      items: [
        {
          id: "contact",
          label: "Inquiries",
          icon: MessageSquare,
          badge: contacts.length > 0 ? contacts.length : undefined,
        },
        {
          id: "applications",
          label: "Applications",
          icon: UserCheck,
          badge: careers.length > 0 ? careers.length : undefined,
        },
      ],
    },
    {
      groupName: "Portfolio & Work",
      items: [
        { id: "services", label: "Services", icon: Layers },
        { id: "projects", label: "Projects", icon: FolderKanban },
        { id: "case_studies", label: "Case Studies", icon: BookOpen },
        { id: "blogs", label: "Blogs & Articles", icon: FileText },
        { id: "jobs", label: "Careers & Jobs", icon: Briefcase },
      ],
    },
    {
      groupName: "Company Media",
      items: [
        { id: "gallery", label: "Office Gallery", icon: ImageIcon },
        { id: "team", label: "Team Members", icon: Users },
        { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
        { id: "tech_stack", label: "Tech Stack", icon: Cpu },
      ],
    },
  ];

  const getTabTitle = (tab: TabType) => {
    switch (tab) {
      case "contact":
        return "Contact Inquiries";
      case "applications":
        return "Job Applications";
      case "services":
        return "Manage Services";
      case "projects":
        return "Manage Projects";
      case "case_studies":
        return "Manage Case Studies";
      case "gallery":
        return "Office Gallery";
      case "team":
        return "Team Showcase";
      case "testimonials":
        return "Client Testimonials";
      case "tech_stack":
        return "Tech Stack Overview";
      case "blogs":
        return "Blogs & Articles";
      case "jobs":
        return "Careers & Job Openings";
      default:
        return "Dashboard";
    }
  };

  // Render Login Page if not authenticated
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900/90 border border-neutral-800 p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-xl w-full max-w-md relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col items-center text-center mb-8">
            <Link to="/" className="mb-5 inline-block group">
              <img
                src="/adat-logo.png"
                alt="Adat Soft Solutions"
                className="h-12 w-auto drop-shadow-md group-hover:scale-105 transition-transform"
              />
            </Link>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Adat Control Center
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Admin Portal
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Sign in with your authorized admin credentials
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5 ml-1">
                Admin Email
              </label>
              <Input
                type="email"
                placeholder="admin@adatsoft.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-neutral-950/80 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-primary focus:ring-primary h-12 rounded-xl text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5 ml-1">
                Security Passcode
              </label>
              <Input
                type="password"
                placeholder="••••••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-neutral-950/80 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-primary focus:ring-primary h-12 rounded-xl text-sm tracking-widest"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full mt-2 bg-gradient-to-r from-neutral-100 to-white text-black font-semibold rounded-xl h-12 text-sm hover:from-white hover:to-neutral-200 transition-all shadow-lg hover:shadow-white/10 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  Authenticating...
                </>
              ) : (
                <>
                  Access Dashboard
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-800/80 text-center">
            <Link
              to="/"
              className="text-xs text-neutral-500 hover:text-neutral-300 inline-flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              Return to Public Website
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  // Sidebar Menu Content helper component
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white text-neutral-800 border-r border-neutral-200">
      {/* Brand & Logo Header */}
      <div className="p-6 border-b border-neutral-150 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/adat-logo.png"
            alt="Adat Soft Solutions"
            className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div>
            <div className="font-bold text-neutral-900 tracking-tight text-base leading-tight flex items-center gap-1.5">
              Adat Admin
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] font-medium text-neutral-400">
              Control Panel v2.0
            </p>
          </div>
        </Link>
        {/* Mobile close icon */}
        <button
          onClick={() => setIsMobileSidebarOpen(false)}
          className="lg:hidden p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-neutral-200">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1.5">
            <h2 className="px-3 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              {group.groupName}
            </h2>
            <div className="space-y-1 mt-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-neutral-900 text-white shadow-md shadow-neutral-900/10 font-semibold"
                        : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? "text-primary" : "text-neutral-400"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full font-bold transition-colors ${
                          isActive
                            ? "bg-primary text-white"
                            : "bg-neutral-100 text-neutral-700"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-neutral-200 bg-neutral-50/60 space-y-2">
        <Link
          to="/"
          target="_blank"
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50 rounded-lg transition-colors"
        >
          <span className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-neutral-500" />
            View Live Website
          </span>
          <ExternalLink className="w-3 h-3 text-neutral-400" />
        </Link>

        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
              A
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-neutral-800 truncate">
                Admin User
              </p>
              <p className="text-[10px] text-neutral-400 truncate">
                Active Session
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors border border-transparent hover:border-red-100"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col lg:flex-row font-sans text-neutral-900">
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-40 w-64">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer (AnimatePresence) */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            {/* Drawer Content */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw]"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 min-h-screen">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-neutral-200 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-neutral-900 tracking-tight flex items-center gap-2 truncate">
                {getTabTitle(activeTab)}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700 border border-neutral-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Live CMS
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Dashboard Main Workspace */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-80 gap-3">
              <Loader2 className="w-9 h-9 animate-spin text-primary" />
              <p className="text-xs text-neutral-500 font-medium">
                Loading dashboard data...
              </p>
            </div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-7xl mx-auto"
            >
              {activeTab === "services" && <ServicesTab />}
              {activeTab === "projects" && <ProjectsTab />}
              {activeTab === "case_studies" && <CaseStudiesTab />}
              {activeTab === "tech_stack" && <TechStackTab />}
              {activeTab === "blogs" && <BlogsTab />}
              {activeTab === "jobs" && <JobsTab />}
              {activeTab === "gallery" && <GalleryTab />}
              {activeTab === "team" && <TeamTab />}
              {activeTab === "testimonials" && <TestimonialsTab />}

              {(activeTab === "contact" || activeTab === "applications") && (
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    {activeTab === "contact" && (
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-neutral-50/80 border-b border-neutral-200 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                            <th className="p-4">Date</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email / Phone</th>
                            <th className="p-4">Subject</th>
                            <th className="p-4 min-w-[300px]">Message</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {contacts.length === 0 ? (
                            <tr>
                              <td
                                colSpan={5}
                                className="p-12 text-center text-neutral-500"
                              >
                                <MessageSquare className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                                No contact inquiries found.
                              </td>
                            </tr>
                          ) : (
                            contacts.map((contact) => (
                              <tr
                                key={contact.id}
                                className="border-b border-neutral-100 hover:bg-neutral-50/80 transition-colors"
                              >
                                <td className="p-4 whitespace-nowrap text-xs text-neutral-500 font-mono">
                                  {formatDate(contact.createdAt)}
                                </td>
                                <td className="p-4 font-semibold text-neutral-900">
                                  {contact.fullName}
                                </td>
                                <td className="p-4">
                                  <div className="text-neutral-900 font-medium">
                                    {contact.email}
                                  </div>
                                  <div className="text-neutral-500 text-xs mt-0.5 font-mono">
                                    {contact.phone}
                                  </div>
                                </td>
                                <td className="p-4 text-neutral-800 font-medium">
                                  {contact.subject}
                                </td>
                                <td
                                  className="p-4 text-neutral-600 max-w-xs truncate"
                                  title={contact.message}
                                >
                                  {contact.message}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    )}

                    {activeTab === "applications" && (
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-neutral-50/80 border-b border-neutral-200 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                            <th className="p-4">Date</th>
                            <th className="p-4">Applicant</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Experience</th>
                            <th className="p-4">Action</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {careers.length === 0 ? (
                            <tr>
                              <td
                                colSpan={6}
                                className="p-12 text-center text-neutral-500"
                              >
                                <UserCheck className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                                No job applications found.
                              </td>
                            </tr>
                          ) : (
                            careers.map((app) => (
                              <tr
                                key={app.id}
                                className="border-b border-neutral-100 hover:bg-neutral-50/80 transition-colors"
                              >
                                <td className="p-4 whitespace-nowrap text-xs text-neutral-500 font-mono">
                                  {formatDate(app.createdAt)}
                                </td>
                                <td className="p-4">
                                  <div className="font-semibold text-neutral-900">
                                    {app.fullName}
                                  </div>
                                  <div className="text-neutral-500 text-xs mt-0.5">
                                    {app.email}
                                  </div>
                                </td>
                                <td className="p-4 text-neutral-800 font-medium">
                                  {app.position}
                                </td>
                                <td className="p-4">
                                  <span
                                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                      app.status === "Selected"
                                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                        : app.status === "Rejected"
                                          ? "bg-rose-100 text-rose-800 border border-rose-200"
                                          : app.status === "Interview Scheduled"
                                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                                            : app.status === "Reviewed"
                                              ? "bg-sky-100 text-sky-800 border border-sky-200"
                                              : "bg-neutral-100 text-neutral-700 border border-neutral-200"
                                    }`}
                                  >
                                    {app.status || "New"}
                                  </span>
                                </td>
                                <td className="p-4 text-neutral-800">
                                  {app.experience}
                                </td>
                                <td className="p-4">
                                  <button
                                    onClick={() => setSelectedApp(app)}
                                    className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-semibold bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors text-xs"
                                  >
                                    Manage
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* Job Application Modal Detail */}
              <AnimatePresence>
                {selectedApp && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white rounded-3xl shadow-2xl border border-neutral-200 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
                    >
                      <div className="p-6 border-b flex justify-between items-center bg-neutral-50/80">
                        <div>
                          <h2 className="text-xl font-bold text-neutral-900">
                            Application: {selectedApp.fullName}
                          </h2>
                          <div className="mt-1.5 flex items-center gap-2">
                            <span className="text-xs text-neutral-500 font-medium">
                              Current Status:
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                selectedApp.status === "Selected"
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                  : selectedApp.status === "Rejected"
                                    ? "bg-rose-100 text-rose-800 border border-rose-200"
                                    : selectedApp.status === "Interview Scheduled"
                                      ? "bg-amber-100 text-amber-800 border border-amber-200"
                                      : selectedApp.status === "Reviewed"
                                        ? "bg-sky-100 text-sky-800 border border-sky-200"
                                        : "bg-neutral-100 text-neutral-700 border border-neutral-200"
                              }`}
                            >
                              {selectedApp.status || "New"}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedApp(null)}
                          className="p-2 text-neutral-400 hover:text-neutral-900 rounded-xl hover:bg-neutral-100 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="p-6 overflow-y-auto flex-1 space-y-8">
                        {/* Status Update Actions */}
                        <div className="bg-sky-50/80 border border-sky-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-sky-950 text-sm">
                              Update Status & Notify Candidate
                            </h3>
                            <p className="text-xs text-sky-700 mt-0.5">
                              Changing the status will automatically trigger an email notification to {selectedApp.email}.
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <select
                              className="text-sm border border-neutral-300 rounded-xl px-3 py-2 bg-white text-neutral-900 font-medium focus:ring-primary focus:border-primary shadow-sm"
                              onChange={(e) =>
                                e.target.value &&
                                handleStatusUpdate(
                                  selectedApp.id,
                                  e.target.value,
                                )
                              }
                              value=""
                              disabled={isUpdatingStatus}
                            >
                              <option value="" disabled>
                                Change Status...
                              </option>
                              <option value="Reviewed">Mark as Reviewed</option>
                              <option value="Interview Scheduled">
                                Invite for Interview
                              </option>
                              <option value="Selected">Select Candidate</option>
                              <option value="Rejected">Reject Candidate</option>
                            </select>
                            {isUpdatingStatus && (
                              <Loader2 className="w-5 h-5 animate-spin text-sky-600" />
                            )}
                          </div>
                        </div>

                        {/* Personal & Professional Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-neutral-50/60 p-5 rounded-2xl border border-neutral-200/80 space-y-3">
                            <h3 className="font-bold text-neutral-900 border-b pb-2 text-sm">
                              Personal Information
                            </h3>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <span className="text-neutral-500">Email:</span>
                              <span className="font-semibold text-neutral-900 break-words">
                                {selectedApp.email}
                              </span>
                              <span className="text-neutral-500">Phone:</span>
                              <span className="font-semibold text-neutral-900">
                                {selectedApp.phone}
                              </span>
                              <span className="text-neutral-500">Location:</span>
                              <span className="font-semibold text-neutral-900">
                                {selectedApp.currentCity}
                              </span>
                            </div>
                          </div>

                          <div className="bg-neutral-50/60 p-5 rounded-2xl border border-neutral-200/80 space-y-3">
                            <h3 className="font-bold text-neutral-900 border-b pb-2 text-sm">
                              Professional Details
                            </h3>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <span className="text-neutral-500">Position:</span>
                              <span className="font-semibold text-primary">
                                {selectedApp.position}
                              </span>
                              <span className="text-neutral-500">Experience:</span>
                              <span className="font-semibold text-neutral-900">
                                {selectedApp.experience}
                              </span>
                              <span className="text-neutral-500">Notice Period:</span>
                              <span className="font-semibold text-neutral-900">
                                {selectedApp.noticePeriod}
                              </span>
                              <span className="text-neutral-500">Current CTC:</span>
                              <span className="font-semibold text-neutral-900">
                                {selectedApp.currentCtc || "N/A"}
                              </span>
                              <span className="text-neutral-500">Expected CTC:</span>
                              <span className="font-semibold text-neutral-900">
                                {selectedApp.expectedCtc || "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Skills & Links */}
                        <div className="bg-neutral-50/60 p-5 rounded-2xl border border-neutral-200/80 space-y-2">
                          <h3 className="font-bold text-neutral-900 text-sm">
                            Skills & Portfolio
                          </h3>
                          <p className="text-xs text-neutral-700 font-medium">
                            {selectedApp.skills}
                          </p>
                          <div className="flex gap-4 pt-2">
                            {selectedApp.linkedin && (
                              <a
                                href={selectedApp.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-blue-600 hover:underline font-semibold inline-flex items-center gap-1"
                              >
                                LinkedIn <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {selectedApp.portfolio && (
                              <a
                                href={selectedApp.portfolio}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-blue-600 hover:underline font-semibold inline-flex items-center gap-1"
                              >
                                Portfolio <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Cover Letter if any */}
                        {selectedApp.coverLetter && (
                          <div className="bg-neutral-50/60 p-5 rounded-2xl border border-neutral-200/80 space-y-2">
                            <h3 className="font-bold text-neutral-900 text-sm">
                              Cover Letter
                            </h3>
                            <p className="text-xs text-neutral-700 leading-relaxed whitespace-pre-wrap">
                              {selectedApp.coverLetter}
                            </p>
                          </div>
                        )}

                        {/* Resume Viewer */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center border-b pb-2">
                            <h3 className="font-bold text-sm text-neutral-900">
                              Resume Document
                            </h3>
                            <a
                              href={selectedApp.resumeDownloadURL.replace(
                                /\/upload\//,
                                "/upload/fl_attachment/",
                              )}
                              download
                              className="text-xs bg-neutral-900 hover:bg-black text-white font-medium px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" /> Download Resume
                            </a>
                          </div>
                          {selectedApp.resumeDownloadURL
                            .toLowerCase()
                            .endsWith(".pdf") ? (
                            <div className="w-full h-96 border rounded-2xl bg-neutral-100 overflow-auto flex flex-col items-center p-4">
                              <p className="text-xs text-neutral-500 mb-3 text-center">
                                Document preview loaded below. Click Download for offline viewing.
                              </p>
                              <img
                                src={selectedApp.resumeDownloadURL.replace(
                                  /\.pdf$/i,
                                  ".jpg",
                                )}
                                alt="Resume Preview"
                                className="max-w-full h-auto shadow-md rounded-lg"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display =
                                    "none";
                                  (
                                    e.target as HTMLImageElement
                                  ).parentElement!.innerHTML +=
                                    '<p class="text-xs text-red-500 mt-4">Preview not available. Please click Download Resume above.</p>';
                                }}
                              />
                            </div>
                          ) : (
                            <div className="w-full h-48 border rounded-2xl bg-neutral-100 flex items-center justify-center">
                              <p className="text-xs text-neutral-500">
                                Direct preview unavailable for this format. Please click Download Resume.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
