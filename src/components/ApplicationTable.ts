import { setState } from '../app.state.ts';
import { populateForm } from '../utils/dom/handler.ts';
import { showModal } from './Modal.ts';
import type { Application } from '../utils/types/types.ts';

function applicationTable(applications: Application[]): HTMLTableElement {
  const table: HTMLTableElement = document.createElement('table');
  table.classList.add('application-table');
  table.setAttribute('align', 'center');

  const thead: HTMLTableSectionElement = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th id='applicantName-header'>Applicant <i class="fa-solid fa-sort"></i></th>
      <th id='companyName-header' class="nowrap">Company <i class="fa-solid fa-sort"></i></th>
      <th id='jobRole-header'>Role <i class="fa-solid fa-sort"></i></th>
      <th id='jobType-header' class="nowrap">Job Type <i class="fa-solid fa-sort"></i></th>
      <th id='jobStatus-header'>Status <i class="fa-solid fa-sort"></i></th>
      <th>Actions</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody: HTMLTableSectionElement = document.createElement('tbody');

  applications.forEach((app: Application, index: number) => {
    const row: HTMLTableRowElement = document.createElement('tr');
    row.setAttribute("id", `app-${index}`);

    row.innerHTML = `
      <td>${app.applicantName}</td>
      <td>${app.companyName}</td>
      <td>${app.jobRole}</td>
      <td>${app.jobType}</td>
      <td>${app.jobStatus}</td>
      <td>
        <div class="actions flex">
          <a class="edit" href="#form-heading" id="app-edit-${index}"><i class="fa-solid fa-pen"></i> Edit</a>
          <a class="delete" id="app-delete-${index}"><i class="fa-solid fa-trash"></i> Delete</a>
        </div>
      </td>
    `;

    const editBtn = row.querySelector(`#app-edit-${index}`) as HTMLAnchorElement | null;
    const deleteBtn = row.querySelector(`#app-delete-${index}`) as HTMLAnchorElement | null;

    if (editBtn) {
      editBtn.addEventListener("click", (e: MouseEvent) => {
        e.preventDefault();
        populateForm(index, app);
      });
    }

    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        setState("deleteIndex", index);
        showModal("Are you sure you want to delete this application?");
      });
    }

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  return table;
}

export { applicationTable as ApplicationTable };
