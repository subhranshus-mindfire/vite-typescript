
const Span = (value, attributes = {}) => {
  const span = document.createElement("span")
  span.innerHTML = value
  Object.keys(attributes).forEach(key => {
    span.setAttribute(key, attributes[key])
  });
  return span
}

export default Span