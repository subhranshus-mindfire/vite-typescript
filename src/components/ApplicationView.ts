import Div from "../utils/dom/Div.ts";
import Applications from "./Applications.ts";
import ToggleViewButtons from "./ToggleViewButtons.ts";

const ApplicationsView = () => {
  const wrapper: HTMLDivElement = Div("", { class: "right" });
  const heading: HTMLHeadingElement = document.createElement("h2");

  heading.className = "text-center right-heading";
  heading.textContent = "Job Applications";

  wrapper.appendChild(heading);
  wrapper.appendChild(ToggleViewButtons());

  const apps = Applications();
  if (apps instanceof HTMLElement) {
    wrapper.appendChild(apps);
  }

  return wrapper;
};

export default ApplicationsView;
