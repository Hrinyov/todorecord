import { FC, useState } from "react";
import { Button, Input, List, Radio, Typography, Checkbox } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  addTodo,
  toggleTodo,
  setFilter,
} from "../../store/features/todo-slice/todo-slice";
import { nanoid } from "@reduxjs/toolkit";
import { TodoFilter } from "../todo-list.types";
import { selectFilteredTodos } from "../../store/features/todo-slice/selectors";

export const ToDoList: FC = () => {
  const [input, setInput] = useState("");
  const todoList = useAppSelector((state) => state.todo.todos);
  const filter = useAppSelector((state) => state.todo.filter);
  const dispatch = useAppDispatch();

  const handleAddTodo = () => {
    if (input.trim().length > 0 && input.trim().length <= 15) {
      dispatch(addTodo({ id: nanoid(), text: input.trim() }));
      setInput("");
    }
  };

  const handleFilterChange = (filter: TodoFilter) => {
    dispatch(setFilter(filter));
  };

  const filteredList = useAppSelector(selectFilteredTodos);

  const completedCount = todoList.filter((todo) => todo.completed).length;
  const currentCount = todoList.length - completedCount;

  return (
    <div className="todo-list-container">
      <Typography.Text className="todo-list-title">ToDo Hub</Typography.Text>

      <Input.Group compact className="input-group">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleAddTodo}
          placeholder="Enter a new task"
          count={{
            show: true,
            max: 15,
          }}
          className="add-todo-input"
        />
        <Button
          type="primary"
          onClick={handleAddTodo}
          className="add-todo-button"
        >
          Add
        </Button>
      </Input.Group>

      <Radio.Group
        onChange={(e) => handleFilterChange(e.target.value as TodoFilter)}
        value={filter}
        className="radio-group"
      >
        <Radio.Button value="all">All</Radio.Button>
        <Radio.Button value="completed">Completed</Radio.Button>
        <Radio.Button value="current">Current</Radio.Button>
      </Radio.Group>

      <List
        bordered
        dataSource={filteredList}
        renderItem={(item) => (
          <List.Item
            onClick={() => dispatch(toggleTodo(item.id))}
            actions={[
              <Checkbox
                checked={item.completed}
                onClick={(e) => e.stopPropagation()}
              />,
            ]}
            className="list-item"
          >
            {item.text}
          </List.Item>
        )}
      />

      <div className="stats">
        <Typography.Text>
          Completed: {completedCount} / Current: {currentCount}
        </Typography.Text>
      </div>
    </div>
  );
};
