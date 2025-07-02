const Header = (): HTMLHeadingElement => {
  const header = document.createElement("h1");
  header.classList.add("text-center", "fs-larger");
  header.textContent = "Job Application Tracker";
  return header;
};

export default Header;
