import PageBase from "../../middleware/PageBase";
import style from "./style.scss";
import html from "./template.html";

import marked from "marked";

export default class ArticlePage extends PageBase {
  private article: string = "";

  constructor() {
    super(html, style);
    this.fetchArticle();
    this.update(html.replace(/{article}/g, this.article), style);
  }

  private fetchArticle() {
    const xmlhttp = new XMLHttpRequest();
    const articleFileName = this.getArticleFileName();
    xmlhttp.open("GET", `/articles/${articleFileName}`, false);
    xmlhttp.send();
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {
        this.article = marked(xmlhttp.responseText, {
          renderer: this.renderer,
        });
      }
    }
  }

  private get renderer() {
    const renderer = new marked.Renderer();
    renderer.link = function (href, title, text) {
      return (
        '<a target="_blank" rel="noopener noreferrer" href="' +
        href +
        '" title="' +
        title +
        '">' +
        text +
        "</a>"
      );
    };
    return renderer;
  }

  private getArticleFileName(): string {
    const path = window.location.pathname;
    return path.split("/")[2] + ".md";
  }
}
