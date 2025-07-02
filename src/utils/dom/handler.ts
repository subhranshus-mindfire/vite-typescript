import { getState, setState } from "../../app.state";
import { saveToStorage } from "../../app.storage";
import { showAlert } from "../../components/Alert";
import type { Application } from "../types/types";

export function resetForm(): void {
  (document.getElementById("applicationForm") as HTMLFormElement).reset();
  (document.getElementById("update") as HTMLElement).classList.add("hidden");
  (document.getElementById("submit") as HTMLElement).classList.remove("hidden");

  const jobType = (document.getElementById("jobType") as HTMLSelectElement).value;
  const locationDiv = document.getElementById("location") as HTMLDivElement;

  locationDiv.style.display = jobType === "remote" ? "none" : "flex";

  document.querySelectorAll(".text-danger").forEach(el => {
    if (!el.classList.contains("hidden")) {
      el.classList.add("hidden");
    }
  });
}

export const populateForm = (index: number, application: Application): void => {
  const prevFocus = getState("prevFocus");
  if (prevFocus) {
    const prevEl = document.getElementById(prevFocus);
    if (prevEl) prevEl.classList.remove("add-focus");
  }

  const currentId = `app-${index}`;
  setState("prevFocus", currentId);

  const currentEl = document.getElementById(currentId);
  if (currentEl) currentEl.classList.add("add-focus");

  (document.getElementById("applicationId") as HTMLInputElement).value = application.id;
  (document.getElementById("applicantName") as HTMLInputElement).value = application.applicantName;
  (document.getElementById("companyName") as HTMLInputElement).value = application.companyName;
  (document.getElementById("jobRole") as HTMLInputElement).value = application.jobRole;
  (document.getElementById("jobType") as HTMLSelectElement).value = application.jobType;
  (document.getElementById("applicationDate") as HTMLInputElement).value = application.applicationDate;
  (document.getElementById("jobStatus") as HTMLSelectElement).value = application.jobStatus;
  (document.getElementById("notes") as HTMLInputElement).value = application.notes;

  const locationDiv = document.getElementById("location") as HTMLDivElement;
  const locationInput = document.getElementById("locationInput") as HTMLInputElement;

  if (application.jobType === "remote") {
    locationDiv.style.display = "none";
  } else {
    locationDiv.style.display = "flex";
    locationInput.value = application.location;
  }

  (document.getElementById("submit") as HTMLElement).classList.add("hidden");
  (document.getElementById("update") as HTMLElement).classList.remove("hidden");

  const updateBtn = document.getElementById("update-btn") as HTMLButtonElement;
  updateBtn.onclick = () => {
    updateApplication(application.id);
  };

  const cancelBtn = document.getElementById("cancel-btn") as HTMLButtonElement;
  cancelBtn.onclick = () => {
    window.location.reload();
  };
};

function updateApplication(appId: string): void {
  const applications: Application[] = getState("applications") || [];

  const updated: Application = {
    id: appId,
    applicantName: (document.getElementById("applicantName") as HTMLInputElement).value.trim(),
    companyName: (document.getElementById("companyName") as HTMLInputElement).value.trim(),
    jobRole: (document.getElementById("jobRole") as HTMLInputElement).value.trim(),
    jobType: (document.getElementById("jobType") as HTMLSelectElement).value as Application["jobType"],
    location:
      (document.getElementById("jobType") as HTMLSelectElement).value === "remote"
        ? "Remote"
        : (document.getElementById("locationInput") as HTMLInputElement).value.trim(),
    applicationDate: (document.getElementById("applicationDate") as HTMLInputElement).value,
    jobStatus: (document.getElementById("jobStatus") as HTMLSelectElement).value as Application["jobStatus"],
    notes: (document.getElementById("notes") as HTMLInputElement).value.trim(),
  };

  const index = applications.findIndex(app => app.id === appId);
  if (index !== -1) {
    applications[index] = updated;
    saveToStorage("applications", applications);
    setState("applications", applications);
    showAlert("Updated Successfully");
    resetForm();
  }
}
