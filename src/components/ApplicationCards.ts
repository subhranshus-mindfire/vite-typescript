import { getState } from '../app.state.ts';
import { ApplicationCard } from './ApplicationCard.ts';
import type { Application } from '../utils/types/types.ts';

function applicationCards(): HTMLUListElement {
  const list: HTMLUListElement = document.createElement('ul');
  list.id = 'applicationTable';

  const viewType: string = getState("viewType") || "grid";
  list.className = viewType === "row" ? "flex" : "grid";

  const applications: Application[] = getState("applications") || [];

  applications.forEach((app: Application, index: number) => {
    const card = ApplicationCard(app, index);
    if (card) list.appendChild(card);
  });

  return list;
}

export { applicationCards as ApplicationCards };
