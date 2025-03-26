import { Todo } from "../../Redux/models/Todo";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: () => void;
  onDelete: () => void;
  onEdit: () => void; // ✅ Tambahkan prop untuk edit
}

const TodoItem = ({ todo, onToggleComplete, onDelete, onEdit }: TodoItemProps) => {
  return (
    <div className="flex justify-between items-center p-3 border-b bg-white shadow-sm rounded-md">
      <div className="flex items-center gap-2">
        <input type="checkbox" checked={todo.completed} onChange={onToggleComplete} className="w-5 h-5 accent-green-500 cursor-pointer" />
        <span
          className={`text-lg cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
          onClick={onEdit} // ✅ Tambahkan event handler untuk edit
        >
          <div className="p-4 bg-white rounded-md shadow-md min-h-[60px]"> {todo.title}</div>
        </span>
      </div>
      <button onClick={onDelete} className="text-red-500 hover:text-red-700">
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
