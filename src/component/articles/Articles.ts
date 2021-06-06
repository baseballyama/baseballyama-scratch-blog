import PageBase from "../../middleware/PageBase";
import style from "./style.scss";
import html from "./template.html";

import ArticleCard from "../articleCard/ArticleCard";

import { Article } from "../../types";

export default class Articles extends PageBase {
  private articles: Article[] = [];
  constructor() {
    super(html, style);
    this.fetchArticles();

    const articlesHtml = this.articles
      .map((article) => {
        const articleCard = new ArticleCard(article);
        return articleCard.createElement();
      })
      .join("");
    this.update(html.replace(/{articles}/, articlesHtml), style);
  }

  private fetchArticles() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "articles/index.json", false);
    xmlhttp.send();
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {
        this.articles = JSON.parse(xmlhttp.responseText);
      }
    }
  }
}
