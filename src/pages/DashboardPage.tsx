import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ExternalLink, Lock, X, Download } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import BlogsTab from "@/components/dashboard/BlogsTab";
import JobsTab from "@/components/dashboard/JobsTab";
import ServicesTab from "@/components/dashboard/ServicesTab";
import TechStackTab from "@/components/dashboard/TechStackTab";
import GalleryTab from "@/components/dashboard/GalleryTab";
import TeamTab from "@/components/dashboard/TeamTab";
import TestimonialsTab from "@/components/dashboard/TestimonialsTab";
import ProjectsTab from "@/components/dashboard/ProjectsTab";

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
  createdAt: any;
}

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const [activeTab, setActiveTab] = useState<"contact" | "applications" | "services" | "tech_stack" | "blogs" | "jobs" | "gallery" | "team" | "testimonials" | "projects">("contact");
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [careers, setCareers] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const contactQuery = query(collection(db, "contact_submissions"), orderBy("createdAt", "desc"));
      const contactSnapshot = await getDocs(contactQuery);
      const contactData = contactSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ContactSubmission[];
      setContacts(contactData);

      const careersQuery = query(collection(db, "job_applications"), orderBy("createdAt", "desc"));
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

  if (!isAuthenticated) {
    return (
      <main className="pt-32 pb-24 min-h-screen bg-neutral-50 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200 w-full max-w-md mx-4"
        >
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Lock className="w-6 h-6" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-neutral-800 mb-2">Admin Dashboard</h1>
          <p className="text-center text-neutral-500 mb-8">Sign in with your admin credentials</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <Input 
              type="email" 
              placeholder="Admin Email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full text-center h-12"
              required
            />
            <Input 
              type="password" 
              placeholder="Enter passcode"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full text-center tracking-widest h-12"
              required
            />
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-black text-white rounded-md h-12 font-medium hover:bg-neutral-800 transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center"
            >
              {isLoggingIn ? <Loader2 className="w-5 h-5 animate-spin" /> : "Access Dashboard"}
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-24 min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-neutral-800">Admin Dashboard</h1>
          <div className="flex flex-col xl:flex-row items-center gap-4 w-full xl:w-auto">
            <div className="flex flex-wrap bg-white rounded-lg p-1 border border-neutral-200 shadow-sm w-full xl:w-auto justify-center gap-1">
              <button
                onClick={() => setActiveTab("contact")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "contact" ? "bg-black text-white" : "text-neutral-600 hover:text-black"
                }`}
              >
                Inquiries
              </button>
              <button
                onClick={() => setActiveTab("applications")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "applications" ? "bg-black text-white" : "text-neutral-600 hover:text-black"
                }`}
              >
                Applications
              </button>
              <button
                onClick={() => setActiveTab("services")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "services" ? "bg-black text-white" : "text-neutral-600 hover:text-black"
                }`}
              >
                Services
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "projects" ? "bg-black text-white" : "text-neutral-600 hover:text-black"
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => setActiveTab("gallery")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "gallery" ? "bg-black text-white" : "text-neutral-600 hover:text-black"
                }`}
              >
                Gallery
              </button>
              <button
                onClick={() => setActiveTab("team")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "team" ? "bg-black text-white" : "text-neutral-600 hover:text-black"
                }`}
              >
                Team
              </button>
              <button
                onClick={() => setActiveTab("testimonials")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "testimonials" ? "bg-black text-white" : "text-neutral-600 hover:text-black"
                }`}
              >
                Testimonials
              </button>
              <button
                onClick={() => setActiveTab("tech_stack")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "tech_stack" ? "bg-black text-white" : "text-neutral-600 hover:text-black"
                }`}
              >
                Tech Stack
              </button>
              <button
                onClick={() => setActiveTab("blogs")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "blogs" ? "bg-black text-white" : "text-neutral-600 hover:text-black"
                }`}
              >
                Blogs
              </button>
              <button
                onClick={() => setActiveTab("jobs")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "jobs" ? "bg-black text-white" : "text-neutral-600 hover:text-black"
                }`}
              >
                Jobs
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors w-full sm:w-auto border border-red-200 bg-white"
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {activeTab === "services" && <ServicesTab />}
            {activeTab === "projects" && <ProjectsTab />}
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
                    <tr className="bg-neutral-50 border-b border-neutral-200 text-sm text-neutral-500">
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Name</th>
                      <th className="p-4 font-medium">Email / Phone</th>
                      <th className="p-4 font-medium">Subject</th>
                      <th className="p-4 font-medium min-w-[300px]">Message</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {contacts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-neutral-500">No contact inquiries found.</td>
                      </tr>
                    ) : (
                      contacts.map((contact) => (
                        <tr key={contact.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                          <td className="p-4 whitespace-nowrap text-neutral-500">{formatDate(contact.createdAt)}</td>
                          <td className="p-4 font-medium text-neutral-800">{contact.fullName}</td>
                          <td className="p-4">
                            <div className="text-neutral-800">{contact.email}</div>
                            <div className="text-neutral-500 text-xs mt-1">{contact.phone}</div>
                          </td>
                          <td className="p-4 text-neutral-800">{contact.subject}</td>
                          <td className="p-4 text-neutral-600 max-w-xs truncate" title={contact.message}>{contact.message}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {activeTab === "applications" && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-200 text-sm text-neutral-500">
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Applicant</th>
                      <th className="p-4 font-medium">Role</th>
                      <th className="p-4 font-medium">Experience</th>
                      <th className="p-4 font-medium">Resume</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {careers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-neutral-500">No job applications found.</td>
                      </tr>
                    ) : (
                      careers.map((app) => (
                        <tr key={app.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                          <td className="p-4 whitespace-nowrap text-neutral-500">{formatDate(app.createdAt)}</td>
                          <td className="p-4">
                            <div className="font-medium text-neutral-800">{app.fullName}</div>
                            <div className="text-neutral-500 text-xs mt-1">{app.email}</div>
                          </td>
                          <td className="p-4 text-neutral-800">{app.position}</td>
                          <td className="p-4 text-neutral-800">{app.experience}</td>
                          <td className="p-4">
                            <button
                              onClick={() => setSelectedApp(app)}
                              className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium bg-blue-50 px-3 py-1.5 rounded-md transition-colors text-sm"
                            >
                              View Details
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
            
            <AnimatePresence>
              {selectedApp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl shadow-xl border border-neutral-200 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
                  >
                    <div className="p-6 border-b flex justify-between items-center bg-neutral-50">
                      <h2 className="text-xl font-bold">Application: {selectedApp.fullName}</h2>
                      <button onClick={() => setSelectedApp(null)} className="text-neutral-500 hover:text-black">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="p-6 overflow-y-auto flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-4">
                          <h3 className="font-bold border-b pb-2">Personal Info</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className="text-neutral-500">Email:</span>
                            <span className="font-medium break-words">{selectedApp.email}</span>
                            <span className="text-neutral-500">Phone:</span>
                            <span className="font-medium">{selectedApp.phone}</span>
                            <span className="text-neutral-500">Location:</span>
                            <span className="font-medium">{selectedApp.currentCity}</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="font-bold border-b pb-2">Professional Details</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className="text-neutral-500">Position:</span>
                            <span className="font-medium text-primary">{selectedApp.position}</span>
                            <span className="text-neutral-500">Experience:</span>
                            <span className="font-medium">{selectedApp.experience}</span>
                            <span className="text-neutral-500">Notice Period:</span>
                            <span className="font-medium">{selectedApp.noticePeriod}</span>
                            <span className="text-neutral-500">Current CTC:</span>
                            <span className="font-medium">{selectedApp.currentCtc || "N/A"}</span>
                            <span className="text-neutral-500">Expected CTC:</span>
                            <span className="font-medium">{selectedApp.expectedCtc || "N/A"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 mb-8">
                        <h3 className="font-bold border-b pb-2">Skills & Links</h3>
                        <p className="text-sm font-medium">{selectedApp.skills}</p>
                        <div className="flex gap-4 mt-2">
                          {selectedApp.linkedin && (
                            <a href={selectedApp.linkedin} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1">
                              LinkedIn <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {selectedApp.portfolio && (
                            <a href={selectedApp.portfolio} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1">
                              Portfolio <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>

                      {selectedApp.coverLetter && (
                        <div className="space-y-4 mb-8">
                          <h3 className="font-bold border-b pb-2">Cover Letter</h3>
                          <p className="text-sm text-neutral-700 whitespace-pre-wrap">{selectedApp.coverLetter}</p>
                        </div>
                      )}

                      <div className="space-y-4 h-[500px] flex flex-col">
                        <div className="flex justify-between items-center border-b pb-2">
                          <h3 className="font-bold">Resume Viewer</h3>
                          <a href={selectedApp.resumeDownloadURL.replace(/\/upload\//, '/upload/fl_attachment/')} download className="text-xs bg-black text-white px-3 py-1 rounded flex items-center gap-2">
                            <Download className="w-3 h-3" /> Download Resume
                          </a>
                        </div>
                        {selectedApp.resumeDownloadURL.toLowerCase().endsWith('.pdf') ? (
                          <div className="w-full flex-1 border rounded-lg bg-neutral-100 overflow-auto flex flex-col items-center p-4">
                            <p className="text-sm text-neutral-500 mb-4 text-center">Previewing first page. Click Download for the full document.</p>
                            <img 
                              src={selectedApp.resumeDownloadURL.replace(/\.pdf$/i, '.jpg')} 
                              alt="Resume Preview"
                              className="max-w-full h-auto shadow-sm"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                (e.target as HTMLImageElement).parentElement!.innerHTML += '<p class="text-sm text-red-500 mt-4">Preview not available. Please download to view.</p>';
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-full flex-1 border rounded-lg bg-neutral-100 flex items-center justify-center">
                            <p className="text-sm text-neutral-500">Preview not available for this file type. Please click Download.</p>
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
      </div>
    </main>
  );
}
