// Static Tailwind classes keep brand colors available in production CSS.
const colors: Record<string,string> = {
  IconBrandReact:"text-[#149eca]", IconBrandNextjs:"text-[#111111] dark:text-white",
  IconBrandVue:"text-[#42b883]", IconBrandAngular:"text-[#dd0031]", IconBrandSvelte:"text-[#ff3e00]",
  IconBrandTailwind:"text-[#06b6d4]", IconBrandTypescript:"text-[#3178c6]", IconBrandJavascript:"text-[#c8a900]",
  IconBrandHtml5:"text-[#e34f26]", IconBrandCss3:"text-[#1572b6]", IconBrandNodejs:"text-[#539e43]",
  IconBrandPython:"text-[#3776ab]", IconBrandPhp:"text-[#777bb4]", IconBrandLaravel:"text-[#ff2d20]",
  IconBrandDjango:"text-[#0c4b33]", IconBrandFlutter:"text-[#02569b]", IconBrandSwift:"text-[#f05138]",
  IconBrandKotlin:"text-[#7f52ff]", IconBrandMysql:"text-[#00758f]", IconBrandMongodb:"text-[#47a248]",
  IconBrandAws:"text-[#ed8b00]", IconBrandFirebase:"text-[#f5820d]", IconBrandDocker:"text-[#2496ed]",
  IconBrandGithub:"text-[#24292f] dark:text-white", IconBrandVercel:"text-[#111111] dark:text-white",
  IconBrandSupabase:"text-[#239a6b]", IconBrandGolang:"text-[#00add8]", IconBrandGraphql:"text-[#e10098]",
  IconBrandWordpress:"text-[#21759b]", IconBrandShopify:"text-[#7ab55c]",
};
export const technologyIconColor = (icon:string) => colors[icon] || "text-sky-600";
