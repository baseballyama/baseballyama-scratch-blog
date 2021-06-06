import { Params } from "./router/URLParamResolver";
import router from "./router/router";

import Component from "./component/Component";
customElements.define("my-component", Component);

// ======================================================================
// 各ページを定義します.
// ======================================================================
import TopPage from "./page/top/TopPage";
customElements.define("x-top", TopPage);

import ArticlePage from "./page/article/ArticlePage";
customElements.define("x-article", ArticlePage);

const pages: { [key: string]: ((params: Params) => string) | string } = {
  "/": "<x-top />",
  "/home": `
  <a href="/">TOP</a>
    <a href="/home">HOME</a>
    <a href="/profile">PROFILE</a>
    <h1>ようこそ！</h1>
  `,
  "/profile": `
      <h1>私は太郎です。</h1>
    `,
  "/profile/:name": (params: Params) => `
    <h1>私は${params.name}です。</h1>
  `,
  "/article/:name": "<x-article />",
};

// ======================================================================
// 各コンポーネントを定義します.
// ======================================================================
import Articles from "./component/articles/Articles";
customElements.define("x-articles", Articles);

import Header from "./component/header/Header";
customElements.define("x-header", Header);

router(pages, `<h1>404 : Not Found<h1>`, document.getElementById("app")!!);
