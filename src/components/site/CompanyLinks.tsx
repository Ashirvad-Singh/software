import { IconBrandLinkedin } from "@tabler/icons-react";
import { socialProfiles } from "@/data/socialProfiles";
const platforms = [
  {name:"LinkedIn", href:socialProfiles.linkedin},
  {name:"Glassdoor", href:socialProfiles.glassdoor, icon:"/icons/glassdoor.svg"},
  {name:"AmbitionBox", href:socialProfiles.ambitionbox, icon:"/icons/ambitionbox.png"},
];
export default function CompanyLinks({contact=false}:{contact?:boolean}) {
  return <div className="flex flex-wrap gap-4">{platforms.map(platform=><a key={platform.name} href={platform.href} target="_blank" rel="noopener noreferrer" aria-label={`ADAT Soft Solutions on ${platform.name} (opens in a new tab)`} title={platform.name} className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${contact ? 'site-icon-tile text-sky-600 hover:bg-sky-100 focus-visible:outline-white' : 'text-muted-foreground hover:bg-sky-50 hover:text-primary focus-visible:outline-sky-600'}`}>
    {platform.icon ? <img src={platform.icon} alt="" aria-hidden="true" className="h-5 w-5 object-contain" /> : <IconBrandLinkedin aria-hidden="true" className="h-5 w-5" />}
  </a>)}</div>;
}
