
import Div from '../utils/dom/Div'

const Alert = () => {
  const alertBox = Div("", { "id": "customAlert", "class": "custom-alert hidden" })
  alertBox.className = `custom-alert success`;
  return alertBox;
}

export function showAlert(message) {
  console.log("alert Called")
  document.getElementById("customAlert").classList.add("show")
  document.getElementById("customAlert").classList.remove("hidden")
  document.getElementById("customAlert").textContent = message;

  setTimeout(() => {
    document.getElementById("customAlert").classList.add("hidden")
    document.getElementById("customAlert").classList.remove("show")
  }, 3000)
}

export default Alert