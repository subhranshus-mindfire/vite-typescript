
import { loadFromStorage } from './app.storage.ts';
import { setState } from './app.state.ts';
import { renderApp } from './components/App.ts';

document.addEventListener('DOMContentLoaded', () => {
  const storedApplications = loadFromStorage("applications") || [];
  setState("applications", storedApplications);
  renderApp();
});