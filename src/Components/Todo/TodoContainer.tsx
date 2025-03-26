import { useEffect, useState } from "react";
import { useGetTodosQuery, useCreateTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } from "../../Redux/api/todoApi";
import TodoList from "./TodoList";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import Modal from "../Modal/Modal";
import { Todo } from "../../Redux/models/Todo";

const TodoContainer = () => {
  const { data: todos, isLoading, error } = useGetTodosQuery(undefined);
  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [localTodos, setLocalTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    if (todos) {
      setLocalTodos(todos);
    }
  }, [todos]);

  const handleCreate = async (text: string) => {
    if (!text.trim()) return;
    const newTodo: Todo = { id: Date.now().toString(), title: text, completed: false };

    // Tambahkan todo baru di atas (DESC)
    setLocalTodos([newTodo, ...localTodos]);

    await createTodo(newTodo).unwrap();
  };

  const handleToggleComplete = async (id: string) => {
    const updatedTodo = localTodos.find((todo) => todo.id === id);
    if (!updatedTodo) return;
    const updated = { ...updatedTodo, completed: !updatedTodo.completed };
    setLocalTodos(localTodos.map((todo) => (todo.id === id ? updated : todo)));
    await updateTodo({ id, data: { completed: updated.completed } }).unwrap();
  };

  const handleDelete = async (id: string) => {
    setLocalTodos(localTodos.filter((todo) => todo.id !== id));
    await deleteTodo(id).unwrap();
  };

  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    setLocalTodos(localTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
    await updateTodo({ id: updatedTodo.id, data: updatedTodo }).unwrap();
    closeModal();
  };

  return (
    <div className="max-w-lg mx-auto p-5">
      <TodoInput onCreate={handleCreate} />
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error fetching data: {error.toString()}</p>}
      <TodoList>
        {localTodos.length > 0 ? (
          localTodos.map((todo) => <TodoItem key={todo.id} todo={todo} onToggleComplete={() => handleToggleComplete(todo.id)} onDelete={() => handleDelete(todo.id)} onEdit={() => handleEdit(todo)} />)
        ) : (
          <p className="text-center text-gray-500">No todos available.</p>
        )}
      </TodoList>
      {selectedTodo && <Modal isOpen={isModalOpen} onClose={closeModal} todo={selectedTodo} onUpdate={handleUpdateTodo} />}
    </div>
  );
};

export default TodoContainer;
