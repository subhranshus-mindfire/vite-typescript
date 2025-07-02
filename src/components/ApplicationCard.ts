import { setState } from '../app.state.ts';
import { populateForm } from '../utils/dom/handler.ts';
import type { Application } from '../utils/types/types.ts';
import { showModal } from './Modal.ts';

function applicationCard(application: Application, index: number): HTMLLIElement {
  const li: HTMLLIElement = document.createElement('li');
  li.className = 'application-card';
  li.id = `app-${index}`;

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

  const editBtn = li.querySelector(`#app-edit-${index}`) as HTMLAnchorElement | null;
  const deleteBtn = li.querySelector(`#app-delete-${index}`) as HTMLAnchorElement | null;

  if (editBtn) {
    editBtn.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();
      populateForm(index, application);
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      setState("deleteIndex", index);
      showModal("Are you sure you want to delete?");
    });
  }

  return li;
}

export { applicationCard as ApplicationCard };
