import Span from "../utils/dom/Span"
import Div from "../utils/dom/Div"

const Card = (id, text, logo, value) => {
  const card = Div("", { "class": "card" })
  const span = Span(value, { "id": id })
  card.append(Div("", { "class": "text-center" }, [span]))
  card.append(Div(text + " " + logo, { "class": "text-center" }))

  return card
}

export default Card