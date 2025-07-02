import { Span } from "../utils/dom/Span.ts"
import { Div } from "../utils/dom/Div.ts"

const card = (id: string, text: string, logo: string, value: string | number): HTMLElement => {
  const card: HTMLDivElement = Div("", { class: "card" });
  const span: HTMLSpanElement = Span(value.toString(), { id });

  card.append(Div("", { "class": "text-center" }, [span]))
  card.append(Div(text + " " + logo, { "class": "text-center" }))
  return card
}

export { card as Card }