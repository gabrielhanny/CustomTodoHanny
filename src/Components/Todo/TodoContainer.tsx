import { useEffect, useState } from "react";
import { useGetTodosQuery, useCreateTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } from "../../Redux/api/todoApi";
import TodoList from "./TodoList";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import Modal from "../Modal/Modal"; // ✅ Import Modal

const TodoContainer = () => {
  const { data: todos, isLoading, error } = useGetTodosQuery();
  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  // 🔹 Optimistic UI
  const [localTodos, setLocalTodos] = useState([]);

  // 🔹 State untuk Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    if (todos) {
      setLocalTodos(todos);
    }
  }, [todos]);

  // 🔹 Create Todo
  const handleCreate = async (text: string) => {
    if (!text.trim()) return;
    const newTodo = { id: Date.now().toString(), title: text, completed: false };
    setLocalTodos([...localTodos, newTodo]);
    await createTodo(newTodo).unwrap();
  };

  // 🔹 Toggle Complete
  const handleToggleComplete = async (id: string) => {
    setLocalTodos(localTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));

    await updateTodo({ id, completed: !localTodos.find((todo) => todo.id === id)?.completed }).unwrap();
  };

  // 🔹 Delete Todo
  const handleDelete = async (id: string) => {
    setLocalTodos(localTodos.filter((todo) => todo.id !== id));
    await deleteTodo(id).unwrap();
  };

  // 🔹 Open Modal untuk Edit
  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  // 🔹 Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  // 🔹 Update Todo (Fix Bug: Tidak Menyimpan Edit)
  const handleUpdateTodo = async (updatedTodo) => {
    setLocalTodos(localTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));

    await updateTodo(updatedTodo).unwrap(); // 🔹 Update Redux state
    closeModal(); // ✅ Tutup modal setelah update
  };

  return (
    <div className="max-w-lg mx-auto p-5">
      <TodoInput onCreate={handleCreate} />

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error fetching data: {error.toString()}</p>}

      <TodoList>
        {localTodos.length > 0 ? (
          localTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={() => handleToggleComplete(todo.id)}
              onDelete={() => handleDelete(todo.id)}
              onEdit={() => handleEdit(todo)} // ✅ Tambahkan tombol Edit
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No todos available.</p>
        )}
      </TodoList>

      {/* ✅ Modal untuk Edit Todo */}
      {selectedTodo && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          todo={selectedTodo}
          onUpdate={handleUpdateTodo} // ✅ Kirim fungsi update
        />
      )}
    </div>
  );
};

export default TodoContainer;
