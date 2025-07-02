import { JOB_ROLES } from "../constants.ts";
import { Div } from "../utils/dom/Div.ts";
import { renderJobRoleSuggestions } from "./JobRoleSuggestion.ts";
import { setState, getState } from "../app.state.ts";
import { saveToStorage } from "../app.storage.ts";
import { showAlert } from "./Alert";
import { resetForm } from "../utils/dom/handler.ts";
import type { Application, JobType, JobStatus } from "../utils/types/types";

// Form data without ID (since we assign it on submit)
type ApplicationFormData = Omit<Application, "id">;

const form = (): HTMLDivElement => {
  function handleJobTypeChange(formWrapper: HTMLElement): void {
    const type = (formWrapper.querySelector('#jobType') as HTMLSelectElement).value as JobType;
    const locationField = formWrapper.querySelector('#location') as HTMLDivElement;

    locationField.style.display = type === 'remote' ? 'none' : 'flex';
  }

  function getFormData(): ApplicationFormData {
    return {
      applicantName: (document.getElementById('applicantName') as HTMLInputElement).value,
      companyName: (document.getElementById('companyName') as HTMLInputElement).value,
      jobRole: (document.getElementById('jobRole') as HTMLInputElement).value,
      jobType: (document.getElementById('jobType') as HTMLSelectElement).value as JobType,
      location: (document.getElementById('locationInput') as HTMLInputElement).value,
      applicationDate: (document.getElementById('applicationDate') as HTMLInputElement).value,
      jobStatus: (document.getElementById('jobStatus') as HTMLSelectElement).value as JobStatus,
      notes: (document.getElementById('notes') as HTMLInputElement).value,
    };
  }

  function validateForm(form: ApplicationFormData): boolean {
    let isValid = true;

    const toggleError = (selector: string, condition: boolean) => {
      const el = document.querySelector(selector);
      if (el) el.classList.toggle('hidden', condition);
      if (!condition) isValid = false;
    };

    toggleError('.applicantNameError', !!form.applicantName);
    toggleError('.nameError', !!form.companyName);
    toggleError('.roleError', !!form.jobRole);
    toggleError('.jobtypeError', !!form.jobType);
    toggleError('.locationError', form.jobType === 'remote' || !!form.location);
    toggleError('.applicationdateError', !!form.applicationDate);
    toggleError('.statusError', !!form.jobStatus);

    return isValid;
  }

  function addApplication(): void {
    const formData = getFormData();
    if (!validateForm(formData)) return;

    const newApplication: Application = {
      id: Date.now().toString(),
      ...formData,
    };

    const current = (getState("applications") as Application[]) || [];
    const updated = [...current, newApplication];

    saveToStorage("applications", updated);
    setState("applications", updated);
    showAlert("Added Successfully");
    resetForm();
  }

  const form = document.createElement("div");
  form.className = "form bg-light";

  form.innerHTML = `
    <h2 class="text-center"><u>Job Application Form</u></h2>
    <div class="flex justify-center">
      <form id="applicationForm">
        <input type="hidden" name="applicationId" id="applicationId">
        <div class="input">
          <label for="applicantName">Applicant Name<span class="text-danger">*</span></label>
          <input type="text" name="applicantName" id="applicantName">
          <span class="applicantNameError text-danger hidden">-Applicant name required</span>
        </div>
        <div class="input">
          <label for="companyName">Company Name<span class="text-danger">*</span></label>
          <input type="text" name="companyName" id="companyName">
          <span class="nameError text-danger hidden">-Company name required</span>
        </div>
        <div class="input">
          <label for="jobRole">Job Role<span class="text-danger">*</span></label>
          <input type="text" name="jobRole" id="jobRole">
          <ul id="autocompleteRoles" class="autocomplete-roles hidden"></ul>
          <span class="roleError text-danger hidden">-Job role required</span>
        </div>
        <div class="input">
          <label for="jobType">Job Type<span class="text-danger">*</span></label>
          <select name="jobType" id="jobType">
            <option value="onsite">On-Site</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
          <span class="jobtypeError text-danger hidden">-Job type required</span>
        </div>
        <div class="input" id="location">
          <label for="locationInput">Location<span class="text-danger">*</span></label>
          <input type="text" name="location" id="locationInput">
          <span class="locationError text-danger hidden">-Location required</span>
        </div>
        <div class="input">
          <label for="applicationDate">Application Date<span class="text-danger">*</span></label>
          <input type="date" name="applicationDate" id="applicationDate">
          <span class="applicationdateError text-danger hidden">-Application date required</span>
        </div>
        <div class="input">
          <label for="jobStatus">Application Status<span class="text-danger">*</span></label>
          <select name="jobStatus" id="jobStatus">
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>
          <span class="statusError text-danger hidden">-Application status required</span>
        </div>
        <div class="input">
          <label for="notes">Notes:</label>
          <input type="text" name="notes" id="notes">
        </div>
        <div class="buttons flex justify-center">
          <div class="submit" id="submit">
            <input type="submit" value="Submit" id="submit-btn">
          </div>
          <div class="update hidden" id="update">
            <input type="button" value="Update" id="update-btn">
            <input type="button" value="Cancel" id="cancel-btn">
          </div>
        </div>
      </form>
    </div>
  `;

  (form.querySelector('#applicationDate') as HTMLInputElement).max = new Date().toISOString().split('T')[0];

  const formWrapper = Div("", { class: "left" }) as HTMLDivElement;
  formWrapper.appendChild(form);

  (formWrapper.querySelector('#jobType') as HTMLSelectElement).addEventListener('change', () => {
    handleJobTypeChange(formWrapper);
  });

  const jobRoleInput = form.querySelector('#jobRole') as HTMLInputElement;
  const autocompleteList = form.querySelector('#autocompleteRoles') as HTMLUListElement;

  jobRoleInput.addEventListener('input', () => {
    renderJobRoleSuggestions(jobRoleInput.value, JOB_ROLES);
  });

  document.addEventListener('click', (e: MouseEvent) => {
    if (!autocompleteList.contains(e.target as Node) && e.target !== jobRoleInput) {
      autocompleteList.classList.add('hidden');
    }
  });

  (formWrapper.querySelector("#submit") as HTMLDivElement).addEventListener("click", (event: Event) => {
    event.preventDefault();
    addApplication();
  });

  return formWrapper;
};

export { form as Form };
