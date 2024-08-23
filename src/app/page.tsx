"use client";

import { FormEvent, useState } from "react";
import TodoList from "./todoList";
import { Todo } from "@/types/todo";

const __DEFAULT_TODO__ = [
  {
    id: 1,
    content: "김치먹기",
    isChecked: true,
  },
  {
    id: 2,
    content: "밥먹기",
    isChecked: false,
  },
];

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(__DEFAULT_TODO__);
  const [value, setValue] = useState("");

  const onSubmitTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTodos((prev) => [
      ...prev,
      { id: Date.now(), content: value, isChecked: false },
    ]);

    setValue("");
  };

  const onClickContentUpdateBtn = (id: number, content: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, content } : todo))
    );
  };

  const onClickCheckUpdateBtn = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
  };

  const onClickTodoDeleteBtn = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <section className="w-[500px] mt-10 m-auto">
      <h1 className="text-xl text-center bold py-6">TODO</h1>
      <form className="flex w-full" onSubmit={onSubmitTodo}>
        <input
          type="text"
          className="rounded-l-md px-2 py-1 border-r-0 w-full text-gray-900 border-gray-300 text-sm"
          placeholder="할 일을 입력하세요."
          value={value}
          onChange={({ currentTarget }) => setValue(currentTarget.value)}
        />
        <button
          type="submit"
          className="bg-blue-400 text-white border-l-0 flex-shrink-0 px-2 rounded-r-md"
        >
          확인
        </button>
      </form>

      <ul className="my-2">
        {todos.map((todo) => (
          <TodoList
            todo={todo}
            key={todo.id}
            onClickContentUpdateBtn={onClickContentUpdateBtn}
            onClickCheckUpdateBtn={onClickCheckUpdateBtn}
            onClickDeleteBtn={onClickTodoDeleteBtn}
          />
        ))}
      </ul>
    </section>
  );
}
