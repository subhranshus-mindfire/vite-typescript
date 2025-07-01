import { setState } from '../app.state';
import { populateForm } from '../utils/dom/handler';
import { showModal } from './Modal';


function ApplicationCard(application, index) {
  const li = document.createElement('li');
  li.className = 'application-card';
  li.setAttribute("id", `app-${index}`);

  li.innerHTML = `
    <div class="application-card-header flex">
      <div class="application-card-header-left">
        <div class="application-card-status">
          <span class="${application.jobStatus === 'hired' ? 'text-success' : application.jobStatus === 'rejected' ? 'text-danger' : ''}">
            ${application.jobStatus}
          </span>
        </div>
        <div class="application-card-applicantName"><b>${application.applicantName}</b></div>
        <div class="application-card-role">${application.jobRole}</div>
      </div>
      <div class="application-card-header-right">
        <div class="actions flex nowrap">
          <a class="edit" href="#form-heading" id="app-edit-${index}"><i class="fa-solid fa-pen"></i> Edit</a>
          <a class="delete" id="app-delete-${index}"><i class="fa-solid fa-trash"></i> Delete</a>
        </div>
      </div>
    </div>
    <div class="application-card-body">
      <div class="application-card-name">
        <span title="Company"><i class="fa-solid fa-building"></i> ${application.companyName}</span>
      </div>
      <div class="flex application-card-footer">
        <div class="application-card-location" title="Job Location">
          <span><i class="fa-solid fa-location-dot"></i> ${application.jobType === 'remote' ? 'Remote' : application.location}</span>
        </div>
        <div class="application-card-date">Applied On ${application.applicationDate}</div>
      </div>
    </div>
  `;

  li.querySelector(`#app-edit-${index}`).addEventListener("click", (e) => {
    e.preventDefault();
    populateForm(index, application);
  });

  li.querySelector(`#app-delete-${index}`).addEventListener("click", () => {
    setState("deleteIndex", index)
    showModal(" Are You Sure To Delete ? ")
  });

  return li;
}

export default ApplicationCard;
