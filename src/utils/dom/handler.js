import { getState, setState } from "../../app.state"
import { saveToStorage } from "../../app.storage";
import { showAlert } from "../../components/Alert";


export function resetForm() {
  document.getElementById("applicationForm").reset();
  document.getElementById("update").classList.add("hidden");
  document.getElementById("submit").classList.remove("hidden");

  const jobType = document.getElementById("jobType").value;
  if (jobType === "remote") {
    document.getElementById("location").style.display = "none";
  } else {
    document.getElementById("location").style.display = "flex";
  }

  document.querySelectorAll(".text-danger").forEach(el => {
    if (!el.classList.contains("hidden")) {
      el.classList.add("hidden");
    }
  });
}

export const populateForm = (index, application) => {
  const prevFocus = getState("prevFocus");
  if (prevFocus) {
    const prevEl = document.getElementById(prevFocus);
    if (prevEl) prevEl.classList.remove("add-focus");
  }

  const currentId = `app-${index}`;
  setState("prevFocus", currentId);

  const currentEl = document.getElementById(currentId);
  if (currentEl) currentEl.classList.add("add-focus");

  document.getElementById("applicationId").value = application.id;
  document.getElementById("applicantName").value = application.applicantName;
  document.getElementById("companyName").value = application.companyName;
  document.getElementById("jobRole").value = application.jobRole;
  document.getElementById("jobType").value = application.jobType;
  document.getElementById("applicationDate").value = application.applicationDate;
  document.getElementById("jobStatus").value = application.jobStatus;
  document.getElementById("notes").value = application.notes;

  if (application.jobType === "remote") {
    document.getElementById("location").style.display = "none";
  } else {
    document.getElementById("location").style.display = "flex";
    document.getElementById("locationInput").value = application.location;
  }

  document.getElementById("submit").classList.add("hidden");
  document.getElementById("update").classList.remove("hidden");

  const updateBtn = document.getElementById("update-btn");
  updateBtn.onclick = () => {
    updateApplication(application.id)
  };

  document.getElementById("cancel-btn").onclick = () => {
    window.location.reload()
  };
};

function updateApplication(appId) {
  const applications = getState("applications") || [];

  const updated = {
    id: appId,
    applicantName: document.getElementById("applicantName").value.trim(),
    companyName: document.getElementById("companyName").value.trim(),
    jobRole: document.getElementById("jobRole").value.trim(),
    jobType: document.getElementById("jobType").value,
    location:
      document.getElementById("jobType").value === "remote"
        ? "Remote"
        : document.getElementById("locationInput").value.trim(),
    applicationDate: document.getElementById("applicationDate").value,
    jobStatus: document.getElementById("jobStatus").value,
    notes: document.getElementById("notes").value.trim(),
  };

  const index = applications.findIndex(app => app.id === appId);
  if (index !== -1) {
    applications[index] = updated;
    saveToStorage("applications", applications)
    setState("applications", applications);
    // I neeed to do the alert here
    showAlert("Updated Successfully")
    resetForm()
  }
}
