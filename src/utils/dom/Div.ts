interface Attribute {
  class?: string;
  id?: string;
  href?: string;
  src?: string;
};


const Div = (value: string = "", attributes: Attribute = {}, childs: HTMLElement[] = []): HTMLDivElement => {
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

export default Div;
