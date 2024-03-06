export interface TodoState {
  todos: { id: string; text: string; completed: boolean }[];
  filter: "all" | "completed" | "current";
}
