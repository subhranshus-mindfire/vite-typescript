export function renderJobRoleSuggestions(input, jobRoles) {
  const list = document.getElementById('autocompleteRoles');
  list.innerHTML = '';

  if (!input) {
    list.classList.add('hidden');
    return;
  }

  const matches = jobRoles.filter(role =>
    role.toLowerCase().includes(input.toLowerCase())
  );

  if (!matches.length) {
    list.classList.add('hidden');
    return;
  }

  matches.forEach(role => {
    const li = document.createElement('li');
    li.textContent = role;
    li.addEventListener('click', () => {
      document.getElementById('jobRole').value = role;
      list.innerHTML = '';
      list.classList.add('hidden');
    });
    list.appendChild(li);
  });

  list.classList.remove('hidden');
}
