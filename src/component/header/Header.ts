import PageBase from "../../middleware/PageBase";
import style from "./style.scss";
import html from "./template.html";

export default class Header extends PageBase {
  constructor() {
    super(html, style);
  }
}
