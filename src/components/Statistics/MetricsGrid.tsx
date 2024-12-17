import React from 'react';
import type { Todo } from '../../types/todo';

interface MetricsGridProps {
  todos: Todo[];
}

export function MetricsGrid({ todos }: MetricsGridProps) {
  const completionRate = Math.round((todos.filter(t => t.completed).length / todos.length) * 100);
  const overdueTasks = todos.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h4 className="text-sm font-medium mb-2">Taux de complétion</h4>
        <p className="text-2xl font-bold">{completionRate}%</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h4 className="text-sm font-medium mb-2">Temps moyen par tâche</h4>
        <p className="text-2xl font-bold">45min</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h4 className="text-sm font-medium mb-2">Tâches en retard</h4>
        <p className="text-2xl font-bold">{overdueTasks}</p>
      </div>
    </div>
  );
}