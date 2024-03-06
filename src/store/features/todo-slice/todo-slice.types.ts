export interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
}

type Todo = { id: string; text: string; completed: boolean };

export enum TodoFilter {
  All = "all",
  Completed = "completed",
  Current = "current",
}

export type NewTodoData = { id: string; text: string };

export type TodoId = string;