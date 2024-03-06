import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoState } from "./todo-slice.types";

export type TodoFilter = "all" | "completed" | "current";

const initialState: TodoState = {
  todos: [],
  filter: "all",
};

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      state.todos.push({ ...action.payload, completed: false });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    setFilter: (state, action: PayloadAction<TodoFilter>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, setFilter } = TodoSlice.actions;

export default TodoSlice.reducer;
