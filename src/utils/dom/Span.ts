interface Attribute {
  class?: string;
  id?: string;
  title?: string;
  [key: string]: string | undefined;
}

const span = (value: string = "", attributes: Attribute = {}): HTMLSpanElement => {
  const span: HTMLSpanElement = document.createElement("span");
  span.innerHTML = value;

  Object.entries(attributes).forEach(([key, val]) => {
    if (val !== undefined) {
      span.setAttribute(key, val);
    }
  });

  return span;
};

export { span as Span };
