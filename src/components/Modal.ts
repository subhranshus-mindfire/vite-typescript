import { getState, setState } from "../app.state.ts";
import { saveToStorage } from "../app.storage.ts";
import { Div } from "../utils/dom/Div.ts";
import { showAlert } from "./Alert";
import type { Application } from "../utils/types/types";

const modal = (): HTMLDivElement => {
  const modal: HTMLDivElement = Div("", { id: "customModal", class: "custom-modal hidden" });

  modal.innerHTML = `
    <div class="modal-content">
      <p id="modal-message">Are you sure to Delete?</p>
      <div class="modal-actions">
        <button id="modal-confirm">Yes</button>
        <button id="modal-cancel">No</button>
      </div>
    </div>
  `;

  function hideModal(): void {
    const modal = document.getElementById("customModal");
    if (modal instanceof HTMLElement) {
      modal.classList.add("hidden");
    }
  }

  function deleteApplication(): void {
    const apps = getState("applications") as Application[] || [];
    const index = getState("deleteIndex") as number;

    if (typeof index === "number" && index >= 0 && index < apps.length) {
      apps.splice(index, 1);
      setState("applications", apps);
      saveToStorage("applications", apps);
      showAlert("Deleted Successfully");
    }
  }

  const confirmBtn = modal.querySelector("#modal-confirm") as HTMLButtonElement | null;
  const cancelBtn = modal.querySelector("#modal-cancel") as HTMLButtonElement | null;

  confirmBtn?.addEventListener("click", () => {
    deleteApplication();
    hideModal();
  });

  cancelBtn?.addEventListener("click", () => {
    hideModal();
  });

  return modal;
};

export function showModal(message: string): void {
  const modal = document.getElementById("customModal") as HTMLElement | null;
  const messageBox = document.getElementById("modal-message") as HTMLElement | null;

  if (modal && messageBox) {
    messageBox.textContent = message;
    modal.classList.remove("hidden");
  }
}

export { modal as Modal };
