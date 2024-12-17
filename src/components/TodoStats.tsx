import React from 'react';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoStatsProps {
  todos: Todo[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  const completed = todos.filter(todo => todo.completed).length;
  const urgent = todos.filter(todo => !todo.completed && todo.priority === 'haute').length;
  const overdue = todos.filter(todo => {
    if (!todo.dueDate || todo.completed) return false;
    return new Date(todo.dueDate) < new Date();
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-center gap-3">
        <CheckCircle2 className="text-green-500" size={24} />
        <div>
          <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Tâches terminées</h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-300">{completed}</p>
        </div>
      </div>

      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg flex items-center gap-3">
        <AlertCircle className="text-red-500" size={24} />
        <div>
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Tâches urgentes</h3>
          <p className="text-2xl font-bold text-red-600 dark:text-red-300">{urgent}</p>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg flex items-center gap-3">
        <Clock className="text-yellow-500" size={24} />
        <div>
          <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">En retard</h3>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">{overdue}</p>
        </div>
      </div>
    </div>
  );
}