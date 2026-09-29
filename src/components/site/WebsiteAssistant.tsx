import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IconBrandFacebook, IconBrandLinkedin } from "@tabler/icons-react";
import { ArrowUpRight, Bot, Code2, BriefcaseBusiness, Star, Layers, RotateCcw, Send, Sparkles, X } from "lucide-react";
import "./WebsiteAssistant.css";
import { websiteReply, type AssistantReply } from "@/lib/chat/websiteAssistant";
import { useCatalog } from "@/lib/content/useCatalog";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { JobPost } from "@/components/dashboard/JobsTab";

function ChatJobs({ onNavigate }: { onNavigate: () => void }) {
  const [jobs, setJobs] = useState<(JobPost & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    getDocs(query(collection(db, "jobs"), where("active", "==", true)))
      .then(snapshot => {
        if (!active) return;
        setJobs(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as JobPost & { id: string })
          .filter(job => job.title).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)));
      })
      .catch(() => { if (active) setError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [attempt]);
  if (loading) return <p role="status" className="mt-3 text-xs text-sky-700">Loading current openings…</p>;
  if (error) return <div className="mt-3 text-sm"><p>Job openings couldn’t load.</p><button type="button" onClick={() => setAttempt(value => value + 1)} className="mt-2 font-semibold text-sky-700">Try again</button></div>;
  if (!jobs.length) return <p className="mt-3 text-sm">There are no open roles right now. Check back soon for new opportunities.</p>;
  return <div className="mt-4 space-y-3">{jobs.map(job => (
    <div key={job.id} className="rounded-xl border border-sky-100 bg-sky-50/60 p-3">
      <h4 className="text-sm font-semibold text-sky-800">{job.title}</h4>
      <p className="mt-1 text-xs text-neutral-500">{[job.department, job.location, job.type].filter(Boolean).join(" · ")}</p>
      {job.experience && <p className="mt-2 text-xs text-neutral-600">Experience: {job.experience}</p>}
      {job.description && <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-neutral-600">{job.description}</p>}
      <Link to={`/careers/${job.id}`} onClick={onNavigate} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:underline">Apply for this role <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
    </div>
  ))}</div>;
}

function ChatServices({ onNavigate }: { onNavigate: () => void }) {
  const { entries, loading, error, retry } = useCatalog("services");
  if (loading) return <p role="status" className="mt-3 text-xs text-sky-700">Loading our services…</p>;
  if (error) return <div className="mt-3 text-sm"><p>Services couldn’t load. Please try again.</p><button type="button" onClick={retry} className="mt-2 font-semibold text-sky-700">Try again</button></div>;
  if (!entries.length) return <p className="mt-3 text-sm">Our service list is being updated. Please check again shortly.</p>;
  return <div className="mt-4 space-y-3">
    {entries.map((service, index) => (
      <div key={service.id} className="rounded-xl border border-sky-100 bg-sky-50/60 p-3">
        <h4 className="text-sm font-semibold text-sky-800">
          <span className="mr-2 text-xs text-sky-500">{String(index + 1).padStart(2, "0")}</span>{service.title}
        </h4>
        <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-neutral-600">{service.description || "More details will be available soon."}</p>
        <Link to={`/services/${service.slug}`} onClick={onNavigate} aria-label={`More details about ${service.title}`} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:underline">
          More details <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    ))}
  </div>;
}

type Message = AssistantReply & { role: "assistant" | "user"; id: number };
const welcome: Message = {
  id: 0,
  role: "assistant",
  text: "Hi there! 👋 Welcome to ADAT. Have a digital project in mind? I can help you explore our services or find the right next step.",
};
const suggestions = [
  { label: "Explore services", detail: "Find your perfect fit", icon: Layers },
  { label: "Project estimate", detail: "Let’s plan something", icon: Code2 },
  { label: "AI & automation", detail: "Bring your idea to life", icon: Sparkles },
  { label: "Careers", detail: "Build your next chapter", icon: BriefcaseBusiness },
  { label: "Glassdoor", detail: "Company & employee reviews", icon: Star },
  { label: "LinkedIn", detail: "Connect with ADAT", icon: IconBrandLinkedin },
  { label: "Facebook", detail: "Follow our updates", icon: IconBrandFacebook },
];

export default function WebsiteAssistant() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const launcher = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => { if (open) input.current?.focus(); }, [open]);
  useEffect(() => {
    if (log.current) log.current.scrollTop = messages.length > 1 ? log.current.scrollHeight : 0;
  }, [messages, open]);

  function close() {
    setOpen(false);
    launcher.current?.focus();
  }

  function send(value: string) {
    const text = value.trim().slice(0, 500);
    if (!text) return;
    setMessages(previous => {
      const id = previous[previous.length - 1].id + 1;
      return [...previous.slice(-39), { id, role: "user", text } as Message, { id: id + 1, role: "assistant", ...websiteReply(text) } as Message];
    });
    setDraft("");
    input.current?.focus();
  }

  return (
    <aside className="adat-chat fixed bottom-5 left-4 z-[110] sm:bottom-6 sm:left-6" aria-label="ADAT website assistant" data-magnetic-zone>
      {open && (
        <section id="adat-assistant" role="dialog" aria-labelledby="adat-assistant-title" onKeyDown={event => { if (event.key === "Escape") { event.stopPropagation(); close(); } }} className="adat-chat-panel">
          <header className="adat-chat-header">
            <div className="adat-chat-avatar"><Bot aria-hidden="true" size={26} /><span /></div>
            <div className="flex-1">
              <h2 id="adat-assistant-title" className="text-base font-bold tracking-tight">ADAT <span className="font-normal text-sky-200">Assistant</span></h2>
              <p className="mt-1 text-[11px] text-sky-100">Your digital project starts here</p>
            </div>
            <button type="button" onClick={() => { setMessages([welcome]); setDraft(""); input.current?.focus(); }} aria-label="Start a new conversation" className="adat-chat-header-action"><RotateCcw size={16} /></button>
            <button type="button" onClick={close} aria-label="Close chat" className="adat-chat-header-action"><X size={19} /></button>
          </header>
          <div ref={log} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" data-lenis-prevent className="adat-chat-body min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-5">
            {messages.length === 1 && (
              <div className="adat-chat-welcome">

                <div className="adat-chat-quick-grid">
                  {suggestions.map(({ label, detail, icon: Icon }) => (
                    <button key={label} type="button" onClick={() => send(label)} className="adat-chat-quick-card">
                      <span className="adat-chat-quick-icon"><Icon size={18} /></span>
                      <span className="adat-chat-quick-title">{label}<ArrowUpRight size={13} /></span>
                      <span className="adat-chat-quick-detail">{detail}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.length > 1 && <p className="text-center text-[10px] font-medium uppercase tracking-widest text-slate-400">Your conversation with ADAT</p>}
            {(messages.length === 1 ? [] : messages).map(message => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`adat-chat-message max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === "user" ? "rounded-br-sm bg-sky-600 text-white" : "rounded-bl-sm border border-sky-100 bg-white text-neutral-700 shadow-sm"}`}>
                  <span className="sr-only">{message.role === "user" ? "You: " : "Assistant: "}</span>
                  <p className="whitespace-pre-wrap break-words">{message.text}</p>
                  {message.showServices && <ChatServices onNavigate={close} />}
                  {message.showJobs && <ChatJobs onNavigate={close} />}
                  {message.externalLink && <a href={message.externalLink.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:underline">{message.externalLink.label}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /><span className="sr-only"> (opens in a new tab)</span></a>}
                  {message.pages && <div className="mt-3 grid gap-2">{message.pages.map(page => <Link key={page.to} to={page.to} onClick={close} className="flex items-center justify-between gap-3 rounded-xl border border-sky-100 bg-sky-50 px-3 py-2.5 text-sm font-semibold text-sky-700 transition-colors hover:bg-sky-100">{page.label}<ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>)}</div>}
                  {message.link && <Link to={message.link.to} onClick={close} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:underline">{message.link.label}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>}
                </div>
              </div>
            ))}
          </div>
          <div className="shrink-0 border-t border-sky-100 bg-white p-4">
            {messages.length > 1 && <div className="mb-3 flex flex-wrap gap-2">
              {suggestions.filter(item => item.label !== "AI & automation").map(({ label }) => <button key={label} type="button" onClick={() => send(label)} className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 hover:bg-sky-100">{label}</button>)}
            </div>}
            <form onSubmit={event => { event.preventDefault(); send(draft); }} className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-1.5 focus-within:border-sky-400">
              <label htmlFor="assistant-message" className="sr-only">Your message</label>
              <input ref={input} id="assistant-message" value={draft} onChange={event => setDraft(event.target.value)} maxLength={500} autoComplete="off" placeholder="Tell us what you have in mind…" className="min-w-0 flex-1 bg-transparent px-2 py-2 text-base text-neutral-900 outline-none placeholder:text-neutral-400 sm:text-sm" />
              <button type="submit" disabled={!draft.trim()} aria-label="Send message" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-40"><Send aria-hidden="true" className="h-4 w-4" /></button>
            </form>
            <p className="mt-2 text-center text-[10px] text-neutral-400">ADAT Assistant · <Link to="/contact" onClick={close} className="text-sky-700 hover:underline">talk to our team</Link>.</p>
          </div>
        </section>
      )}
      <div className="flex justify-start">
        <button ref={launcher} type="button" onClick={() => open ? close() : setOpen(true)} aria-expanded={open} aria-controls="adat-assistant" aria-label={open ? "Close ADAT assistant" : "Open ADAT assistant"} className="adat-chat-launcher">
          <span className="adat-chat-launcher-icon">{open ? <X aria-hidden="true" size={24} /> : <Bot aria-hidden="true" size={28} />}<i /></span>
        </button>
      </div>
    </aside>
  );
}
