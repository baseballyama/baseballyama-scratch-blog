import matcherToParamExtractor, { Params } from "./URLParamResolver";
export default (
  pages: { [key: string]: ((params: Params) => string) | string },
  notfound: string,
  element: HTMLElement
) => {
  //引数で受け取ったpagesをビルドする。
  const builtPages = Object.keys(pages).map((matcher) => ({
    render(params: Params) {
      const page = pages[matcher];
      return typeof page === "string" ? page : page(params);
    },
    test: matcherToParamExtractor(matcher),
  }));
  //DOM書き換え処理
  const updateView = () => {
    //innerHTMLを使ってDOMを書き換える
    const mount = (html: string) => {
      element.innerHTML = html;
      setClickEvent();
    };
    const path = window.location.pathname;
    //マッチャーにマッチするページまでforで繰り返し
    for (const page of builtPages) {
      const params = page.test(path);
      if (params) {
        mount(page.render(params));
        //見つかればreturn
        return;
      }
    }
    //見つからなければ404のページを表示
    mount(notfound);
  };

  const setClickEvent = () => {
    //アンカーリンクにルーターのリンクを仕込む
    document.querySelectorAll("a").forEach((a) => {
      a.onclick = (event) => {
        event.preventDefault();
        window.history.pushState(null, "", a.href);
        updateView();
      };
    });
  };

  setClickEvent();

  //ブラウザバックを監視
  window.addEventListener("popstate", () => {
    updateView();
  });

  let href = window.location.href;
  window.setInterval(() => {
    const cureentHref = window.location.href;
    if (href !== cureentHref) {
      href = cureentHref;
      updateView();
    }
  }, 50);

  //初期化
  updateView();
};
