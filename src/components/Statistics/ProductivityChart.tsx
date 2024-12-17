import React from 'react';
import { Line } from 'react-chartjs-2';
import { format, subDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Todo } from '../../types/todo';

interface ProductivityChartProps {
  todos: Todo[];
}

export function ProductivityChart({ todos }: ProductivityChartProps) {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    return format(date, 'dd MMM', { locale: fr });
  }).reverse();

  const completedByDay = last7Days.map(day => {
    return todos.filter(todo => {
      const todoDate = format(new Date(todo.createdAt), 'dd MMM', { locale: fr });
      return todoDate === day && todo.completed;
    }).length;
  });

  const data = {
    labels: last7Days,
    datasets: [{
      label: 'Tâches complétées',
      data: completedByDay,
      borderColor: '#007AFF',
      tension: 0.4,
    }],
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Productivité sur 7 jours</h3>
      <Line
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom' as const,
            },
          },
        }}
      />
    </div>
  );
}