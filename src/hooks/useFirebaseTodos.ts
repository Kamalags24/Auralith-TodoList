import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  onSnapshot,
  serverTimestamp,
  where
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import type { Todo, SubTask, SortOption } from '../types/todo';

export function useFirebaseTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'todos'),
      where('userId', '==', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const newTodos = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt?.toDate(),
          dueDate: doc.data().dueDate?.toDate()
        })) as Todo[];
        setTodos(newTodos);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addTodo = async (newTodo: Omit<Todo, 'id' | 'completed' | 'createdAt'>) => {
    try {
      if (!auth.currentUser) throw new Error('User not authenticated');
      
      await addDoc(collection(db, 'todos'), {
        ...newTodo,
        completed: false,
        createdAt: serverTimestamp(),
        userId: auth.currentUser.uid,
        subtasks: [],
        tags: []
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const todoRef = doc(db, 'todos', id);
      const todo = todos.find(t => t.id === id);
      if (todo) {
        await updateDoc(todoRef, {
          completed: !todo.completed
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  const editTodo = async (updatedTodo: Todo) => {
    try {
      const todoRef = doc(db, 'todos', updatedTodo.id);
      await updateDoc(todoRef, updatedTodo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  const addSubTask = async (todoId: string, title: string) => {
    try {
      const todoRef = doc(db, 'todos', todoId);
      const todo = todos.find(t => t.id === todoId);
      if (todo) {
        const newSubTask: SubTask = {
          id: crypto.randomUUID(),
          title,
          completed: false
        };
        await updateDoc(todoRef, {
          subtasks: [...(todo.subtasks || []), newSubTask]
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
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
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    addSubTask,
    sortTodos
  };
}