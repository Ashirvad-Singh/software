import { ImageUpload } from "@/components/ui/image-upload";
import type { TechnologyDetail } from "@/data/technologyDetails";

const textFields = [
  ["name", "Page title"], ["category", "Hero highlighted text"], ["badge", "Hero badge"],
  ["tagline", "Hero subtitle"], ["overviewTitle", "Overview heading"], ["overview", "Overview description"],
  ["featuresTitle", "Features heading"], ["useCasesTitle", "Use cases heading"],
  ["processTitle", "Process heading"], ["faqTitle", "FAQ heading"],
  ["ctaTitle", "Consultation heading"], ["ctaDescription", "Consultation description"], ["ctaLabel", "Contact button label"],
  ["seoTitle", "SEO title"], ["seoDescription", "SEO description"], ["seoKeywords", "SEO keywords"],
] as const;
const collections = [
  {key:"benefits", label:"Benefits cards", fields:["title", "desc", "icon"]},
  {key:"useCases", label:"Use cases", fields:["title", "desc"]},
  {key:"process", label:"Delivery process", fields:["step", "title", "desc"]},
  {key:"faqs", label:"FAQs", fields:["q", "a"]},
] as const;
const fieldLabels: Record<string,string> = {title:"Title",desc:"Description",icon:"Icon",step:"Step number",q:"Question",a:"Answer"};
const inputClass = "mt-2 w-full rounded-lg border border-neutral-300 bg-white p-3 text-sm font-normal";
export default function TechnologyPageEditor({value, onChange, onUploadingChange}: {value:TechnologyDetail; onChange:(value:TechnologyDetail)=>void; onUploadingChange:(uploading:boolean)=>void}) {
  return <div className="mt-4 space-y-6 border-t border-neutral-200 pt-5">
    <p className="text-sm text-neutral-500">Edit this technology’s detail page below. Save the category to publish your changes. Remove rows to hide unused sections.</p>
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Featured Image</h4>
      <p className="text-xs text-neutral-500">Upload or change the main image shown on this technology’s detail page.</p>
      <ImageUpload value={value.featuredImageUrl || ""} onChange={url => onChange({...value, featuredImageUrl:url})} onUploadingChange={onUploadingChange} />
    </div>
    <div className="grid gap-4 md:grid-cols-2">{textFields.map(([key,label]) => <label key={key} className={`text-sm font-medium ${["overview","ctaDescription","seoDescription"].includes(key) ? "md:col-span-2" : ""}`}>{label}
      {["overview","ctaDescription","seoDescription"].includes(key) ? <textarea rows={4} className={inputClass} value={value[key] || ""} onChange={event=>onChange({...value,[key]:event.target.value})} /> : <input className={inputClass} value={value[key] || ""} onChange={event=>onChange({...value,[key]:event.target.value})} />}
    </label>)}</div>
    <label className="block text-sm font-medium">Technical features — one per line<textarea rows={5} className={inputClass} value={value.keyFeatures.join("\n")} onChange={event=>onChange({...value,keyFeatures:event.target.value.split("\n")})} /></label>
    {collections.map(group => <section key={group.key} className="space-y-4 rounded-xl border border-neutral-200 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3"><h5 className="font-semibold">{group.label}</h5><button type="button" className="rounded-lg bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700" onClick={()=>{
        const row=Object.fromEntries(group.fields.map(field=>[field,field==="icon" ? "Code2" : field==="step" ? String(value.process.length+1).padStart(2,"0") : ""]));
        onChange({...value,[group.key]:[...value[group.key],row]});
      }}>Add row</button></div>
      {value[group.key].map((row,index)=><div key={index} className="grid gap-3 rounded-lg bg-neutral-50 p-4 md:grid-cols-2">
        {group.fields.map(field=><label key={field} className="text-sm font-medium">{fieldLabels[field]}
          {field === "icon" ? <select className={inputClass} value={(row as unknown as Record<string,string>)[field]} onChange={event=>onChange({...value,[group.key]:value[group.key].map((item,i)=>i===index ? {...item,[field]:event.target.value} : item)})}>{["CheckCircle2","Code2","Zap","Layers","ShieldCheck","Cpu","Server","Globe"].map(icon=><option key={icon}>{icon}</option>)}</select> : <textarea rows={field==="desc" || field==="a" ? 3 : 1} className={inputClass} value={(row as unknown as Record<string,string>)[field] || ""} onChange={event=>onChange({...value,[group.key]:value[group.key].map((item,i)=>i===index ? {...item,[field]:event.target.value} : item)})} />}
        </label>)}
        <button type="button" aria-label={`Remove ${group.label} row ${index+1}`} className="justify-self-start text-sm text-red-600" onClick={()=>onChange({...value,[group.key]:value[group.key].filter((_,i)=>i!==index)})}>Remove row</button>
      </div>)}
    </section>)}
  </div>;
}
