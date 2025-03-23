import { ReactNode } from "react";

interface TodoListProps {
  children: ReactNode;
}

const TodoList = ({ children }: TodoListProps) => {
  return <div className="bg-white shadow-lg rounded-lg p-5 space-y-3">{children}</div>;
};

export default TodoList;
