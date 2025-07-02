
const div = (value: string = "", attributes: Record<string, string> = {}, childs: HTMLElement[] = []): HTMLDivElement => {
  const div: HTMLDivElement = document.createElement("div");
  div.innerHTML = value;

  Object.keys(attributes).forEach((key) => {
    div.setAttribute(key, attributes[key]);
  });

  childs.forEach((child: HTMLElement) => {
    div.appendChild(child);
  });

  return div;
};

export { div as Div };
