import { getState } from '../app.state.ts';
import ApplicationCard from './ApplicationCard.ts';

function ApplicationCards() {
  const list = document.createElement('ul');
  list.id = 'applicationTable';

  const viewType = getState("viewType") || "grid";
  list.className = viewType === "row" ? "flex" : "grid";

  getState("applications")?.forEach((app, index) => {
    list.appendChild(ApplicationCard(app, index));
  });

  return list;
}

export default ApplicationCards;
