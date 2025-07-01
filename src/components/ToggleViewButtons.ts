import { getState, observe, setState } from "../app.state";

const ToggleViewButtons = () => {
  if (!getState("viewType")) setState("viewType", "grid");

  const wrapper = document.createElement("div");
  wrapper.className = "toogle-btn";


  function render() {
    const viewType = getState("viewType");

    console.log("Toggle View render Called", viewType)
    wrapper.innerHTML = `
    <input type="button" value="Row" id="row-btn" class="${viewType === 'row' ? 'active-btn' : ''}">
    <input type="button" value="Grid" id="grid-btn" class="${viewType === 'grid' ? 'active-btn' : ''}">
  `;

    wrapper.querySelector("#row-btn").addEventListener("click", () => {
      setState("viewType", "row");
    });

    wrapper.querySelector("#grid-btn").addEventListener("click", () => {
      setState("viewType", "grid");
    });
  }

  render()
  observe("viewType", render)

  return wrapper;
};

export default ToggleViewButtons;
