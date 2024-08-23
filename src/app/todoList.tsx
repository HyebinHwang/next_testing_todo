import { Todo } from "@/types/todo";
import {
  CheckedIcon,
  NotCheckedIcon,
  PenIcon,
  TrashIcon,
} from "../../public/icons";
import { KeyboardEvent, useState } from "react";

interface TodoListProps {
  todo: Todo;
  onClickCheckUpdateBtn: (id: number) => void;
  onClickContentUpdateBtn: (id: number, content: string) => void;
  onClickDeleteBtn: (id: number) => void;
}

export default function TodoList({
  todo,
  onClickCheckUpdateBtn,
  onClickContentUpdateBtn,
  onClickDeleteBtn,
}: TodoListProps) {
  const [value, setValue] = useState("");
  const [updating, setUpdating] = useState(false);

  const onClickTodoContent = () => {
    onClickContentUpdateBtn(todo.id, value);
    setValue("");
    setUpdating(false);
  };

  const onKeyDownInput = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      onClickTodoContent();
    }
  };

  return (
    <li className="flex mb-2 border rounded-md px-2 py-1">
      <button
        className="border-none"
        onClick={() => onClickCheckUpdateBtn(todo.id)}
      >
        {todo.isChecked ? (
          <CheckedIcon className="w-5" />
        ) : (
          <NotCheckedIcon className="w-5" />
        )}
      </button>
      {updating ? (
        <>
          <input
            className="mx-1 px-2 rounded-md w-full"
            value={value}
            onChange={({ currentTarget }) => setValue(currentTarget.value)}
            placeholder="텍스트를 입력해주세요."
            onKeyDown={onKeyDownInput}
          />
          <button
            className="flex-shrink-0 px-2 rounded-md bg-black text-slate-50 border-none"
            onClick={onClickTodoContent}
          >
            확인
          </button>
        </>
      ) : (
        <>
          <p className={`w-full px-2 ${todo.isChecked && "line-through"}`}>
            {todo.content}
          </p>
          <button
            className="border-none px-1"
            onClick={() => setUpdating(true)}
          >
            <PenIcon className="w-4" />
          </button>
          <button
            className="border-none px-1"
            onClick={() => onClickDeleteBtn(todo.id)}
          >
            <TrashIcon className="w-4" />
          </button>
        </>
      )}
    </li>
  );
}
