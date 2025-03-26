import { useEffect, useState, useCallback } from "react";
import { useGetTodosQuery } from "../../Redux/api/todoApi";
import { Todo } from "../../Redux/models/Todo";

export const useInfiniteScroll = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetTodosQuery(page);
  const [todos, setTodos] = useState<Todo[]>([]);

  // 🔹 Update local state setiap kali data berubah
  useEffect(() => {
    if (data?.todos) {
      setTodos((prevTodos) => [...prevTodos, ...data.todos]);
    }
  }, [data]);

  // 🔹 Optimized handleScroll dengan useCallback
  const handleScroll = useCallback(() => {
    if (isFetching) return;

    const scrollY = window.scrollY;
    const visibleHeight = window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;

    if (scrollY + visibleHeight >= totalHeight - 50) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { todos, isFetching };
};
