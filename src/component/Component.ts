import actions from "../store/actions";
import store from "../store/store";

const html = `
<p>Count: <span>${store.count}</span></p>
<button type="button">Count Up</button>
`;

export default class Component extends HTMLElement {
  private _count = 0;
  private span: HTMLSpanElement | null = null;
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = html;

    this.span = shadowRoot.querySelector("span");
    const button = shadowRoot.querySelector("button");
    if (button !== null) {
      button.onclick = () => {
        actions.countUp();
      };
    }

    this.handleStoreChange = this.handleStoreChange.bind(this);
  }

  connectedCallback() {
    //storeのstateの変更を監視する;
    store.addEventListener("CHANGE", this.handleStoreChange);
    //最初の描画;
    this.handleStoreChange();
  }

  disconnectedCallback() {
    store.removeEventListener("CHANGE", this.handleStoreChange);
  }

  handleStoreChange() {
    //storeのstateが変更されたらcomponentのstateへ渡す;
    this.count = store.count;
  }

  set count(value: number) {
    //componentのstateが新しい値に置き換わった時のみ描画する
    if (value === this._count) return;
    this._count = value;

    if (this.span !== null) {
      this.span.innerHTML = String(value);
    }
  }
}
