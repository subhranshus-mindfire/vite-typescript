import { Div } from "../utils/dom/Div.ts";
import { ApplicationsView } from "./ApplicationView";
import { Form } from "./Form";

const hero = (): HTMLDivElement => {
  const hero: HTMLDivElement = Div("", { class: "grid halfs gap-2" });
  const formElement = Form();
  const applicationsElement = ApplicationsView();

  hero.appendChild(formElement);
  hero.appendChild(applicationsElement);
  return hero;
};

export { hero as Hero };
