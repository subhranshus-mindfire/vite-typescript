import Alert from './Alert.ts';
import Counters from './Counters.ts';
import Header from "./Header.ts";
import Hero from './Hero.ts';
import Modal from './Modal.ts'

export function renderApp() {
  const root = document.getElementById('app');
  if (root != undefined) root.innerHTML = '';

  const layout = document.createElement('div');
  layout.className = 'app container';

  layout.appendChild(Header());
  layout.appendChild(Counters());
  layout.appendChild(Hero());

  // if (getState("toast")) {
  layout.append(Alert());
  layout.append(Modal());

  // }

  if (root != undefined) root.appendChild(layout);
}
