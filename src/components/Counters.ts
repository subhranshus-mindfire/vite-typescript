import { getState, observe } from "../app.state.ts";
import Card from "./Card";

interface CardItem {
  id: string;
  text: string;
  logo: string;
  value: number;
}

const Counters = (): HTMLDivElement => {
  const counters: HTMLDivElement = document.createElement("div");
  counters.classList.add("flex", "statuses", "justify-content-evenly");

  function render(): void {
    const applications = getState("applications") || [];

    counters.innerHTML = ``;

    const statusCount = (status: string): number =>
      applications.filter((app: { jobStatus: string }) => app.jobStatus === status).length;

    const cards: CardItem[] = [
      {
        id: "totalApplications",
        text: "Applications",
        logo: `<i class="fa-solid fa-envelope"></i>`,
        value: applications.length,
      },
      {
        id: "hiredCount",
        text: "Hired",
        logo: `<i class="fa-solid fa-circle-check" style="color: #37ff00;"></i>`,
        value: statusCount("hired"),
      },
      {
        id: "appliedCount",
        text: "Applied",
        logo: `<i class="fa-solid fa-arrow-right-to-bracket"></i>`,
        value: statusCount("applied"),
      },
      {
        id: "interviewingCount",
        text: "Interviewing",
        logo: `<i class="fa-solid fa-chalkboard-user"></i>`,
        value: statusCount("interviewing"),
      },
      {
        id: "rejectedCount",
        text: "Rejected",
        logo: `<i class="fa-solid fa-circle-xmark" style="color: #ff0000;"></i>`,
        value: statusCount("rejected"),
      },
    ];

    cards.forEach(({ id, text, logo, value }: CardItem) => {
      const card = Card(id, text, logo, value);
      if (card) counters.appendChild(card);
    });
  }

  render();

  observe("applications", render);

  return counters;
};

export default Counters;
