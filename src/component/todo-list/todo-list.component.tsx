import { FC } from "react";
import "./todo-list.css";
import { TODO_ITEM_MAX_LENGTH } from "../../utils/constants/constants";
import {
  Form,
  Button,
  Input,
  List,
  Radio,
  Typography,
  Checkbox,
  RadioChangeEvent,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  addTodo,
  toggleTodo,
  setFilter,
} from "../../store/features/todo-slice/todo-slice";
import { nanoid } from "@reduxjs/toolkit";
import { TodoFilter, FormValues } from "./todo-list.types";
import { selectFilteredTodos } from "../../store/features/todo-slice/selectors";

export const ToDoList: FC = () => {
  const [form] = Form.useForm();
  const todoList = useAppSelector((state) => state.todo.todos);
  const filter = useAppSelector((state) => state.todo.filter);
  const dispatch = useAppDispatch();

  const handleAddTodo = (values: FormValues) => {
    dispatch(addTodo({ id: nanoid(), text: values.newTodo.trim() }));
    form.resetFields();
  };

  const handleFilterChange = (event: RadioChangeEvent) => {
    const filterValue = event.target.value as TodoFilter;
    dispatch(setFilter(filterValue));
  };

  const handleBlur = () => {
    form.resetFields(["newTodo"]);
  };

  const filteredList = useAppSelector(selectFilteredTodos);

  const completedCount = todoList.filter((todo) => todo.completed).length;
  const currentCount = todoList.length - completedCount;

  return (
    <div className="todo-list-container">
      <Typography.Text className="todo-list-title">ToDo Hub</Typography.Text>

      <Form
        form={form}
        onFinish={handleAddTodo}
        layout="inline"
        className="add-todo-input-form"
      >
        <Form.Item
          name="newTodo"
          rules={[
            { required: true, message: "Please input your task!" },
            {
              max: TODO_ITEM_MAX_LENGTH,
              message: `Task cannot exceed ${TODO_ITEM_MAX_LENGTH} characters`,
            },
          ]}
        >
          <Input
            placeholder="Enter a new task"
            onPressEnter={() => form.submit()}
            onBlur={handleBlur}
            className="add-todo-input"
            count={{
              show: true,
              max: TODO_ITEM_MAX_LENGTH,
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="add-todo-button">
            Add
          </Button>
        </Form.Item>
      </Form>

      <Radio.Group
        onChange={handleFilterChange}
        value={filter}
        className="radio-group"
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
