
import { loadFromStorage } from './app.storage.ts';
import { setState } from './app.state.ts';
import { renderApp } from './components/App.ts';

document.addEventListener('DOMContentLoaded', () => {
  setState("applications", loadFromStorage("applications")) || []
  renderApp();
});