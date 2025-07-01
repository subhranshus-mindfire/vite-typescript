import Div from "../utils/dom/Div";
import Applications from "./Applications";
import ToggleViewButtons from "./ToggleViewButtons";

const ApplicationsView = () => {
  const wrapper = Div("", { class: "right" });

  const heading = document.createElement("h2");
  heading.className = "text-center right-heading";
  heading.textContent = "Job Applications";

  wrapper.appendChild(heading);
  wrapper.appendChild(ToggleViewButtons());
  wrapper.appendChild(Applications());

  return wrapper;
};

export default ApplicationsView;
