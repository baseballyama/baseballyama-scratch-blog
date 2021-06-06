import dispatcher from "./dispatcher";

class Store extends EventTarget {
  private _count = 0;
  get count() {
    return this._count;
  }
  constructor() {
    super();

    dispatcher.addEventListener("countUp", () => {
      this._count++;
      this.dispatchEvent(new Event("CHANGE"));
      //stateを変更したことをcomponentに伝える
    });
  }
}

export default new Store();
