import style from "./style.scss";
import html from "./template.html";

import { Article } from "../../types";

export default class ArticleCard {
  constructor(private article: Article) {}

  public createElement(): string {
    const html2 = html
      .replace(/{title}/g, this.article.title)
      .replace(/{fileName}/g, this.article.fileName)
      .replace(/{createdAt}/g, this.article.createdAt)
      .replace(/{summary}/g, this.article.summary)
      .replace(/{eyecatch}/g, this.article.eyecatch);

    return `<style>${style}</style>${html2}`;
  }
}
