
const Header = () => {
  const header = document.createElement("h1")
  header.classList.add("text-center")
  header.classList.add("fs-larger")
  header.innerHTML = "Job Application Tracker"
  return (
    header
  )
}

export default Header