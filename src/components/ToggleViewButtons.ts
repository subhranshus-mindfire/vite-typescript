import { getState, observe, setState } from "../app.state.ts";

const ToggleViewButtons = (): HTMLDivElement => {
  if (!getState("viewType")) setState("viewType", "grid");

  const wrapper: HTMLDivElement = document.createElement("div");
  wrapper.className = "toogle-btn";

  function render(): void {
    const viewType = getState("viewType");

    console.log("Toggle View render Called", viewType);

    wrapper.innerHTML = `
      <input type="button" value="Row" id="row-btn" class="${viewType === 'row' ? 'active-btn' : ''}">
      <input type="button" value="Grid" id="grid-btn" class="${viewType === 'grid' ? 'active-btn' : ''}">
    `;

    const rowBtn = wrapper.querySelector("#row-btn") as HTMLInputElement | null;
    const gridBtn = wrapper.querySelector("#grid-btn") as HTMLInputElement | null;

    rowBtn?.addEventListener("click", () => setState("viewType", "row"));
    gridBtn?.addEventListener("click", () => setState("viewType", "grid"));
  }

  render();
  observe("viewType", render);

  return wrapper;
};

export default ToggleViewButtons;
