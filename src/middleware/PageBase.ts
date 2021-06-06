export default abstract class PageBase extends HTMLElement {
  constructor(html: string, style: string) {
    super();

    this.attachShadow({ mode: "open" });
    this.update(html, style);
  }

  protected update(html: string, style: string) {
    const template = document.createElement("template");
    if (!template) return;
    template.innerHTML = `<style>${style}</style>${html}`;
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = template.innerHTML;
    this.shadowRoot.addEventListener("click", (event: Event) => {
      // TODO: EBNFを使用した解析処理が必要
      const element = event.target;
      if (!element) return;
      const elementString = (element as any).outerHTML as string;
      const buf = elementString.split("@click");
      if (buf.length < 2) return;
      const buf2 = buf[1].replace(/^=\s*[\"\']/, "");
      const funcNameAndPath = buf2.split(")")[0] + ")";
      const funcName = funcNameAndPath.split("(")[0];
      const params = funcNameAndPath.split("(")[1].split(")")[0];
      const paramNames = params.split(",").map((p) => p.replace(" ", ""));
      (this as any)[funcName](
        ...paramNames.map((p) => {
          if (p.startsWith('"') || p.startsWith("&quot;")) {
            const p2 = p.replace(/&quot;/g, "'");
            return p2.substring(1, p2.length - 1);
          } else {
            return (this as any)[p];
          }
        })
      );
    });
  }

  private connectedCallback() {
    this.setATagClickedEvent();
  }

  // aタグクリック時にSPAのページ遷移をします.
  private setATagClickedEvent() {
    const template = this.shadowRoot;
    if (!template) return;
    template.querySelectorAll("a").forEach((a) => {
      a.onclick = (event) => {
        const href = a.getAttribute("href") || "";
        if (!href.startsWith("http")) {
          event.preventDefault();
          window.history.pushState(null, "", a.href);
        }
      };
    });
  }
}
