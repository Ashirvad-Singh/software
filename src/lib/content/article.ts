// Keep editor formatting while excluding executable markup and unsafe links.
export function prepareArticle(source: string) {
  const parsed = new DOMParser().parseFromString(source, "text/html");
  const allowed = new Set(["P", "BR", "H2", "H3", "H4", "UL", "OL", "LI", "STRONG", "B", "EM", "I", "U", "BLOCKQUOTE", "PRE", "CODE", "A", "IMG", "HR", "TABLE", "THEAD", "TBODY", "TR", "TH", "TD", "FIGURE", "FIGCAPTION"]);
  for (const element of Array.from(parsed.body.querySelectorAll("*"))) {
    if (["SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED", "SVG", "MATH", "FORM"].includes(element.tagName)) {
      element.remove(); continue;
    }
    if (!allowed.has(element.tagName)) {
      element.replaceWith(...element.childNodes); continue;
    }
    for (const attribute of Array.from(element.attributes)) {
      const permitted = (element.tagName === "A" && attribute.name === "href") ||
        (element.tagName === "IMG" && ["src", "alt"].includes(attribute.name));
      if (!permitted) element.removeAttribute(attribute.name);
    }
    for (const attribute of ["href", "src"]) {
      const value = element.getAttribute(attribute);
      if (value && !/^(https?:\/\/|\/(?!\/)|#)/i.test(value)) element.removeAttribute(attribute);
    }
  }
  const headings = Array.from(parsed.body.querySelectorAll("h2, h3")).map((heading, index) => {
    heading.id = `article-section-${index + 1}`;
    return { id: heading.id, title: heading.textContent || "Section" };
  });
  return { html: parsed.body.innerHTML, headings };
}
