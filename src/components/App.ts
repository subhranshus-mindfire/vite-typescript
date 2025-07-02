import { Alert } from './Alert.ts';
import { Counters } from './Counters.ts';
import { Header } from "./Header.ts";
import { Hero } from './Hero.ts';
import { Modal } from './Modal.ts'

export function renderApp() {
  const root: HTMLElement | null = document.getElementById('app');
  if (root === null) return

  root.innerHTML = '';
  const layout: HTMLElement | null = document.createElement('div');
  layout.className = 'app container';

  layout.appendChild(Header());
  layout.appendChild(Counters());
  layout.appendChild(Hero());
  layout.append(Alert());
  layout.append(Modal());
  root.appendChild(layout);
}
