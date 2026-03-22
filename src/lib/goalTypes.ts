export interface GoalType {
  value: string;
  label: string;
  goalLabel: string;
  unitLabel: string;
}

export const GOAL_TYPES: GoalType[] = [
  { value: "job-hunting", label: "Job Hunting", goalLabel: "Number of jobs applied", unitLabel: "jobs applied" },
  { value: "client-outreach", label: "Client Outreach", goalLabel: "Number of clients reached", unitLabel: "clients reached" },
  { value: "blog-writing", label: "Blog Writing", goalLabel: "Number of blogs completed", unitLabel: "blogs completed" },
  { value: "content-creation", label: "Content Creation", goalLabel: "Number of posts created", unitLabel: "posts created" },
  { value: "study-sessions", label: "Study Sessions", goalLabel: "Number of study sessions completed", unitLabel: "study sessions" },
  { value: "practice-questions", label: "Practice Questions", goalLabel: "Number of questions solved", unitLabel: "questions solved" },
  { value: "workout-routine", label: "Workout Routine", goalLabel: "Number of workouts completed", unitLabel: "workouts completed" },
  { value: "reading", label: "Reading", goalLabel: "Number of pages or chapters completed", unitLabel: "pages/chapters read" },
  { value: "sales-outreach", label: "Sales Outreach", goalLabel: "Number of leads contacted", unitLabel: "leads contacted" },
  { value: "cold-emails", label: "Cold Emails", goalLabel: "Number of emails sent", unitLabel: "emails sent" },
  { value: "networking", label: "Networking", goalLabel: "Number of people reached out to", unitLabel: "people reached" },
  { value: "task-completion", label: "Task Completion", goalLabel: "Number of tasks completed", unitLabel: "tasks completed" },
  { value: "habit-tracking", label: "Habit Tracking", goalLabel: "Number of times completed", unitLabel: "times completed" },
  { value: "freelance-work", label: "Freelance Work", goalLabel: "Number of deliverables completed", unitLabel: "deliverables completed" },
  { value: "code-practice", label: "Code Practice", goalLabel: "Number of coding tasks completed", unitLabel: "coding tasks done" },
  { value: "interview-prep", label: "Interview Prep", goalLabel: "Number of interview prep tasks completed", unitLabel: "prep tasks done" },
];

export function getGoalType(value: string): GoalType | undefined {
  return GOAL_TYPES.find((t) => t.value === value);
}
