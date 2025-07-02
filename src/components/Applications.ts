import { ApplicationCard } from './ApplicationCard.ts';
import { ApplicationTable } from './ApplicationTable.ts';
import { getState, observe } from '../app.state.ts';
import type { Application } from '../utils/types/types.ts';

const applications = (): HTMLElement | void => {
  const container: HTMLElement = document.createElement('div');
  if (!(container)) return
  container.id = 'applicationTableWrapper';

  const render = (): void => {
    container.innerHTML = '';
    const viewType: string = getState('viewType');
    const applications = getState('applications') || [];

    if (viewType === 'row') {
      container.appendChild(ApplicationTable(applications));
    } else {
      const ul = document.createElement('ul');
      ul.id = 'applicationTable';
      ul.className = 'grid';
      applications.forEach((app: Application, index: number) => {
        ul.appendChild(ApplicationCard(app, index));
      });
      container.appendChild(ul);
    }
  };

  render();

  observe('viewType', render);
  observe('applications', render);

  return container;
};

export { applications as Applications };
