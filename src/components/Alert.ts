
import Div from '../utils/dom/Div.ts'

const Alert = (): HTMLElement => {
  const alertBox: HTMLElement = Div("", { "id": "customAlert", "class": "custom-alert hidden" })
  alertBox.className = `custom-alert success`;
  return alertBox;
}

export function showAlert(message: string): void {
  console.log('alert Called');

  const alertEl = document.getElementById('customAlert');
  if (!alertEl) return;

  alertEl.classList.add('show');
  alertEl.classList.remove('hidden');
  alertEl.textContent = message;

  setTimeout(() => {
    alertEl.classList.add('hidden');
    alertEl.classList.remove('show');
  }, 3000);
}
export default Alert