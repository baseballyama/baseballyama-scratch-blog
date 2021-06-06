import dispatcher from "./dispatcher";

export default {
  countUp() {
    dispatcher.dispatchEvent(new CustomEvent("countUp"));
  },
};
