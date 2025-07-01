import { getState, observe } from "../app.state";
import Card from "./Card";

const Counters = () => {

  const counters = document.createElement("div");
  counters.classList.add("flex", "statuses", "justify-content-evenly");

  function render() {
    const applications = getState("applications") || [];

    counters.innerHTML = ``

    const statusCount = (status) =>
      applications.filter((app) => app.jobStatus === status).length;

    const cards = [
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

    cards.forEach(({ id, text, logo, value }) => {
      counters.append(Card(id, text, logo, value));
    });
  }


  render()

  observe("applications", render)

  return counters;
};

export default Counters;
