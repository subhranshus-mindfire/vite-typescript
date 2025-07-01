import { JOB_ROLES } from "../constants";
import Div from "../utils/dom/Div";
import { renderJobRoleSuggestions } from "./JobRoleSuggestion";
import { setState, getState } from "../app.state";
import { saveToStorage } from "../app.storage";
import { showAlert } from "./Alert";
import { resetForm } from "../utils/dom/handler";

const Form = () => {
  function handleJobTypeChange(formWrapper) {
    console.log(formWrapper)
    const type = formWrapper.querySelector('#jobType').value;
    const locationField = formWrapper.querySelector('#location');

    locationField.style.display = type === 'remote' ? 'none' : 'flex';
  }

  function getFormData() {
    return {
      id: document.getElementById('applicationId').value,
      applicantName: document.getElementById('applicantName').value,
      companyName: document.getElementById('companyName').value,
      jobRole: document.getElementById('jobRole').value,
      jobType: document.getElementById('jobType').value,
      location: document.getElementById('locationInput').value,
      applicationDate: document.getElementById('applicationDate').value,
      jobStatus: document.getElementById('jobStatus').value,
      notes: document.getElementById('notes').value
    };
  }

  function validateForm(form) {
    let isValid = true;

    if (!form.applicantName) {
      document.querySelector('.applicantNameError').classList.remove('hidden');
      isValid = false;
    } else {
      document.querySelector('.applicantNameError').classList.add('hidden');
    }

    if (!form.companyName) {
      document.querySelector('.nameError').classList.remove('hidden');
      isValid = false;
    } else {
      document.querySelector('.nameError').classList.add('hidden');
    }

    if (!form.jobRole) {
      document.querySelector('.roleError').classList.remove('hidden');
      isValid = false;
    } else {
      document.querySelector('.roleError').classList.add('hidden');
    }

    if (!form.jobType) {
      document.querySelector('.jobtypeError').classList.remove('hidden');
      isValid = false;
    } else {
      document.querySelector('.jobtypeError').classList.add('hidden');
    }

    if (form.jobType !== 'remote' && !form.location) {
      document.querySelector('.locationError').classList.remove('hidden');
      isValid = false;
    } else {
      document.querySelector('.locationError').classList.add('hidden');
    }

    if (!form.applicationDate) {
      document.querySelector('.applicationdateError').classList.remove('hidden');
      isValid = false;
    } else {
      document.querySelector('.applicationdateError').classList.add('hidden');
    }

    if (!form.jobStatus) {
      document.querySelector('.statusError').classList.remove('hidden');
      isValid = false;
    } else {
      document.querySelector('.statusError').classList.add('hidden');
    }

    return isValid;
  }

  function addApplication() {
    const formData = getFormData()
    if (!validateForm(formData)) return;

    formData.id = Date.now();
    console.log("Hiii Before setState")
    saveToStorage("applications", [...((getState("applications")) || []), formData])
    setState("applications", [...((getState("applications")) || []), formData])
    showAlert("Added Successfully")
    resetForm()
    console.log("first")
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

  form.querySelector('#applicationDate').max = new Date().toISOString().split('T')[0];


  const formWrapper = Div("", { "class": "left" });
  formWrapper.appendChild(form);

  formWrapper.querySelector('#jobType').addEventListener('change', () => {
    handleJobTypeChange(formWrapper)
  });

  const jobRoleInput = form.querySelector('#jobRole');
  const autocompleteList = form.querySelector('#autocompleteRoles');

  jobRoleInput.addEventListener('input', () => {
    renderJobRoleSuggestions(jobRoleInput.value, JOB_ROLES);
  });

  document.addEventListener('click', (e) => {
    if (!autocompleteList.contains(e.target) && e.target !== jobRoleInput) {
      autocompleteList.classList.add('hidden');
    }
  });

  formWrapper.querySelector("#submit").addEventListener("click", (event) => {
    event.preventDefault()
    addApplication()
  })

  return formWrapper;
};

export default Form;
