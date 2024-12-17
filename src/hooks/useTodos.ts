import { useState, useEffect } from 'react';
import { Todo, SubTask, SortOption } from '../types/todo';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo: Omit<Todo, 'id' | 'completed' | 'createdAt'>) => {
    setTodos((prev) => [
      {
        ...newTodo,
        id: crypto.randomUUID(),
        completed: false,
        createdAt: new Date(),
        subtasks: [],
        tags: [],
      },
      ...prev,
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (updatedTodo: Todo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const addSubTask = (todoId: string, title: string) => {
    const newSubTask: SubTask = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? { ...todo, subtasks: [...(todo.subtasks || []), newSubTask] }
          : todo
      )
    );
  };

  const toggleSubTask = (todoId: string, subtaskId: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks?.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              ),
            }
          : todo
      )
    );
  };

  const deleteSubTask = (todoId: string, subtaskId: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks?.filter(
                (subtask) => subtask.id !== subtaskId
              ),
            }
          : todo
      )
    );
  };

  const addTag = (todoId: string, tag: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? { ...todo, tags: [...new Set([...(todo.tags || []), tag])] }
          : todo
      )
    );
  };

  const removeTag = (todoId: string, tag: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? { ...todo, tags: todo.tags?.filter((t) => t !== tag) }
          : todo
      )
    );
  };

  const sortTodos = (todos: Todo[], sortBy: SortOption) => {
    return [...todos].sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { haute: 0, moyenne: 1, basse: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    addSubTask,
    toggleSubTask,
    deleteSubTask,
    addTag,
    removeTag,
    sortTodos,
  };
}