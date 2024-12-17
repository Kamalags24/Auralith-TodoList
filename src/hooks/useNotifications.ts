import { useEffect } from 'react';
import { initNotifications, sendNotification } from '../lib/notifications';
import type { Todo } from '../types/todo';

export function useNotifications(todos: Todo[]) {
  useEffect(() => {
    initNotifications();
  }, []);

  useEffect(() => {
    // Vérifier les tâches qui arrivent à échéance
    const checkDueDates = () => {
      const now = new Date();
      todos.forEach(todo => {
        if (todo.dueDate && !todo.completed) {
          const dueDate = new Date(todo.dueDate);
          const timeDiff = dueDate.getTime() - now.getTime();
          
          // Notifier 1 heure avant l'échéance
          if (timeDiff > 0 && timeDiff <= 3600000) {
            sendNotification(
              'Rappel de tâche',
              {
                body: `La tâche "${todo.title}" arrive à échéance dans une heure.`,
                tag: todo.id,
              }
            );
          }
        }
      });
    };

    const interval = setInterval(checkDueDates, 300000); // Vérifier toutes les 5 minutes
    return () => clearInterval(interval);
  }, [todos]);
}