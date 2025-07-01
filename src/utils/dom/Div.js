
const Div = (value = "", attributes = {}, childs = []) => {
  const div = document.createElement("div")
  div.innerHTML = value
  Object.keys(attributes).forEach(key => {
    div.setAttribute(key, attributes[key])
  });
  childs.forEach(child => {
    div.appendChild(child)
  })
  return div
}

export default Div