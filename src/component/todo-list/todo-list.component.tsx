import { FC, useState } from "react";
import Classes from "./todo-list.module.css";
import {
  TODO_ITEM_MAX_LENGTH,
  DEFAULT_VALUE,
} from "../../utils/constants/constants";
import { Button, Input, List, Radio, Typography, Checkbox } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  addTodo,
  toggleTodo,
  setFilter,
} from "../../store/features/todo-slice/todo-slice";
import { nanoid } from "@reduxjs/toolkit";
import { TodoFilter } from "./todo-list.types";
import { selectFilteredTodos } from "../../store/features/todo-slice/selectors";

export const ToDoList: FC = () => {
  const [input, setInput] = useState(DEFAULT_VALUE);
  const todoList = useAppSelector((state) => state.todo.todos);
  const filter = useAppSelector((state) => state.todo.filter);
  const dispatch = useAppDispatch();

  const handleAddTodo = () => {
    if (
      input.trim().length > 0 &&
      input.trim().length <= TODO_ITEM_MAX_LENGTH
    ) {
      dispatch(addTodo({ id: nanoid(), text: input.trim() }));
      setInput(DEFAULT_VALUE);
    }
  };

  const handleFilterChange = (filter: TodoFilter) => {
    dispatch(setFilter(filter));
  };

  const filteredList = useAppSelector(selectFilteredTodos);

  const completedCount = todoList.filter((todo) => todo.completed).length;
  const currentCount = todoList.length - completedCount;

  return (
    <div className={Classes["todo-list-container"]}>
      <Typography.Text className={Classes["todo-list-title"]}>
        ToDo Hub
      </Typography.Text>

      <Input.Group compact className={Classes["input-group"]}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleAddTodo}
          placeholder="Enter a new task"
          count={{
            show: true,
            max: TODO_ITEM_MAX_LENGTH,
          }}
          className={Classes["add-todo-input"]}
        />
        <Button
          type="primary"
          onClick={handleAddTodo}
          className={Classes["add-todo-button"]}
        >
          Add
        </Button>
      </Input.Group>

      <Radio.Group
        onChange={(e) => handleFilterChange(e.target.value as TodoFilter)}
        value={filter}
        className={Classes["radio-group"]}
      >
        <Radio.Button value={TodoFilter.All}>All</Radio.Button>
        <Radio.Button value={TodoFilter.Completed}>Completed</Radio.Button>
        <Radio.Button value={TodoFilter.Current}>Current</Radio.Button>
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
            className={Classes["list-item"]}
          >
            {item.text}
          </List.Item>
        )}
      />

      <div className={Classes.stats}>
        <Typography.Text>
          Completed: {completedCount} / Current: {currentCount}
        </Typography.Text>
      </div>
    </div>
  );
};
