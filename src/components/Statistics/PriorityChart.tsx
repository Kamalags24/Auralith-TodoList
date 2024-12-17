import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import type { Todo } from '../../types/todo';

interface PriorityChartProps {
  todos: Todo[];
}

export function PriorityChart({ todos }: PriorityChartProps) {
  const data = {
    labels: ['Haute', 'Moyenne', 'Basse'],
    datasets: [{
      data: [
        todos.filter(t => t.priority === 'haute').length,
        todos.filter(t => t.priority === 'moyenne').length,
        todos.filter(t => t.priority === 'basse').length,
      ],
      backgroundColor: ['#FF3B30', '#FFCC00', '#34C759'],
    }],
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Répartition par priorité</h3>
      <div className="w-64 mx-auto">
        <Doughnut
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
    </div>
  );
}