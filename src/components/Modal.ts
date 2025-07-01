import { getState, setState } from "../app.state";
import { saveToStorage } from "../app.storage";
import Div from "../utils/dom/Div";
import { showAlert } from "./Alert";

const Modal = () => {
  const modal = Div("", { id: "customModal", class: "custom-modal hidden" });

  modal.innerHTML = `
    <div class="modal-content">
      <p id="modal-message">Are you sure to Delete?</p>
      <div class="modal-actions">
        <button id="modal-confirm">Yes</button>
        <button id="modal-cancel">No</button>
      </div>
    </div>
  `;

  function hideModal() {
    const modal = document.getElementById("customModal");
    if (modal) modal.classList.add("hidden");
  }

  function deleteApplication() {
    console.log("hii")
    const apps = getState("applications") || [];
    const index = getState("deleteIndex")

    apps.splice(index, 1);
    setState("applications", apps);
    saveToStorage("applications", apps)
    showAlert("Deleted Successfully")
  }

  modal.querySelector("#modal-confirm").onclick = () => {
    deleteApplication()
    hideModal();
  };

  modal.querySelector("#modal-cancel").onclick = () => {
    hideModal();
  };

  return modal;
};

export function showModal(message) {
  let modal = document.getElementById("customModal");
  document.getElementById("modal-message").textContent = message;
  modal.classList.remove("hidden");
}


export default Modal;
