import { useState } from "react";

interface TodoInputProps {
  onCreate: (text: string) => void;
}

const TodoInput = ({ onCreate }: TodoInputProps) => {
  const [newTodo, setNewTodo] = useState("");

  const handleCreate = () => {
    if (!newTodo.trim()) return;
    onCreate(newTodo);
    setNewTodo(""); // Reset input setelah submit
  };

  return (
    <div className="flex gap-2 mb-4">
      <input type="text" className="border p-2 w-full rounded" placeholder="Add new todo..." value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button onClick={handleCreate} className="bg-blue-500 text-white p-2 rounded">
        Add
      </button>
    </div>
  );
};

export default TodoInput;
