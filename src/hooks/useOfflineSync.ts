import { useEffect } from 'react';
import { saveTodoOffline, getAllOfflineTodos, clearOfflineDb } from '../lib/offlineDb';
import type { Todo } from '../types/todo';

export function useOfflineSync(todos: Todo[], syncTodos: (todos: Todo[]) => Promise<void>) {
  useEffect(() => {
    // Sauvegarder les todos en local quand ils changent
    todos.forEach(todo => {
      saveTodoOffline(todo);
    });
  }, [todos]);

  useEffect(() => {
    // Synchroniser les todos hors ligne quand la connexion est rétablie
    const handleOnline = async () => {
      const offlineTodos = await getAllOfflineTodos();
      if (offlineTodos.length > 0) {
        await syncTodos(offlineTodos);
        await clearOfflineDb();
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [syncTodos]);

  return {
    isOnline: navigator.onLine,
  };
}