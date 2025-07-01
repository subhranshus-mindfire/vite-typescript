import Div from "../utils/dom/Div"
import ApplicationsView from "./ApplicationView"
import Form from "./Form"

const Hero = () => {
  const hero = Div("", { "class": "grid halfs gap-2" })
  hero.appendChild(Form())
  hero.appendChild(ApplicationsView())
  return hero
}

export default Hero