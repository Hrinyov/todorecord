import { RootState } from "../../store";
import { TodoFilter } from "./todo-slice.types";

export const selectFilteredTodos = (state: RootState) => {
  const { todos, filter } = state.todo;

  switch (filter) {
    case TodoFilter.Completed:
      return todos.filter((todo) => todo.completed);
    case TodoFilter.Current:
      return todos.filter((todo) => !todo.completed);
    case TodoFilter.All:
    default:
      return todos;
  }
};
