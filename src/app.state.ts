// import { saveToStorage } from "./app.storage";
// import { renderApp } from "./components/App";

// export const state = {
//   applications: [],
//   view: "",
//   isAlertVisible: false,

//   setApplications(apps) {
//     this.applications = apps;
//     saveToStorage("applications", apps)
//     renderApp();
//   },

//   setView(view) {
//     if (this.view !== view) {
//       this.view = view;
//       renderApp();
//     }
//   },

//   setAlert(value) {
//     if (this.isAlertVisible !== value) {
//       this.isAlertVisible = value;
//       renderApp();
//     }
//   },

// };

const state = {};
const listeners = {};

export function getState(key) {
  return state[key];
}

export function setState(key, value) {
  state[key] = value;
  console.log(state, listeners)

  if (listeners[key]) {
    listeners[key].forEach((func) => {
      func()
    }
    );
  }
}

export function observe(key, func) {
  if (!listeners[key]) {
    listeners[key] = [func];
  }
  else if (listeners[key] == func)
    return
  else {
    listeners[key].push(func);
  }
}
