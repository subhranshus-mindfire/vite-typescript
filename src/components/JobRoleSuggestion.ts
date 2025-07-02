export function renderJobRoleSuggestions(input: string, jobRoles: string[]): void {
  const list = document.getElementById('autocompleteRoles') as HTMLUListElement | null;
  if (!list) return;

  list.innerHTML = '';

  if (!input.trim()) {
    list.classList.add('hidden');
    return;
  }

  const matches = jobRoles.filter(role =>
    role.toLowerCase().includes(input.toLowerCase())
  );

  if (matches.length === 0) {
    list.classList.add('hidden');
    return;
  }

  matches.forEach(role => {
    const li = document.createElement('li');
    li.textContent = role;
    li.addEventListener('click', () => {
      const jobRoleInput = document.getElementById('jobRole') as HTMLInputElement | null;
      if (jobRoleInput) {
        jobRoleInput.value = role;
      }
      list.innerHTML = '';
      list.classList.add('hidden');
    });
    list.appendChild(li);
  });

  list.classList.remove('hidden');
}
