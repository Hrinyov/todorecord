import { RootState } from "../../store";

export const selectFilteredTodos = (state: RootState) => {
  const { todos, filter } = state.todo;

  switch (filter) {
    case "completed":
      return todos.filter((todo) => todo.completed);
    case "current":
      return todos.filter((todo) => !todo.completed);
    case "all":
    default:
      return todos;
  }
};
