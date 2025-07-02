const JOB_ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'Fullstack Developer',
  'Data Scientist',
  'UI/UX Designer',
  'Software Engineer',
  'SDE',
  'Associate Software Engineer'
] as const

type JobRole = typeof JOB_ROLES[number];

export { JOB_ROLES };
export type { JobRole };

