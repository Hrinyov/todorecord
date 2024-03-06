import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoState, TodoFilter, NewTodoData, TodoId } from "./todo-slice.types";

const initialState: TodoState = {
  todos: [],
  filter: TodoFilter.All,
};

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<NewTodoData>) => {
      state.todos.push({ ...action.payload, completed: false });
    },
    toggleTodo: (state, action: PayloadAction<TodoId>) => {
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
