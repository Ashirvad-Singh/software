import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import { Loader2, ExternalLink, Lock } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

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
  const [passwordInput, setPasswordInput] = useState("");
  
  const [activeTab, setActiveTab] = useState<"contact" | "careers">("contact");
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [careers, setCareers] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(false);

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
    if (sessionStorage.getItem("adminAuth") === "true") {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD;
    if (!adminPass) {
      toast.error("Admin password not configured in .env");
      return;
    }
    
    if (passwordInput === adminPass) {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuth", "true");
      toast.success("Login successful");
      fetchData();
    } else {
      toast.error("Invalid password");
      setPasswordInput("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("adminAuth");
    setContacts([]);
    setCareers([]);
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
          <p className="text-center text-neutral-500 mb-8">Enter your passcode to access the dashboard</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
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
              className="w-full bg-black text-white rounded-md h-12 font-medium hover:bg-neutral-800 transition-colors shadow-sm"
            >
              Access Dashboard
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
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex bg-white rounded-lg p-1 border border-neutral-200 shadow-sm w-full sm:w-auto">
              <button
                onClick={() => setActiveTab("contact")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-1/2 sm:w-auto ${
                  activeTab === "contact" ? "bg-black text-white" : "text-neutral-600 hover:text-black"
                }`}
              >
                Contact Inquiries
              </button>
              <button
                onClick={() => setActiveTab("careers")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-1/2 sm:w-auto ${
                  activeTab === "careers" ? "bg-black text-white" : "text-neutral-600 hover:text-black"
                }`}
              >
                Job Applications
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
            className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden"
          >
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

              {activeTab === "careers" && (
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
                            {app.resumeDownloadURL ? (
                              <a
                                href={app.resumeDownloadURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium bg-blue-50 px-3 py-1.5 rounded-md transition-colors"
                              >
                                View <ExternalLink className="w-4 h-4" />
                              </a>
                            ) : (
                              <span className="text-neutral-400">N/A</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
