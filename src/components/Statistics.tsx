import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { format, subDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Todo } from '../types/todo';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface StatisticsProps {
  todos: Todo[];
}

export function Statistics({ todos }: StatisticsProps) {
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

  const priorityData = {
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

  const productivityData = {
    labels: last7Days,
    datasets: [{
      label: 'Tâches complétées',
      data: completedByDay,
      borderColor: '#007AFF',
      tension: 0.4,
    }],
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Productivité sur 7 jours</h3>
        <Line
          data={productivityData}
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

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Répartition par priorité</h3>
        <div className="w-64 mx-auto">
          <Doughnut
            data={priorityData}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h4 className="text-sm font-medium mb-2">Taux de complétion</h4>
          <p className="text-2xl font-bold">
            {Math.round((todos.filter(t => t.completed).length / todos.length) * 100)}%
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h4 className="text-sm font-medium mb-2">Temps moyen par tâche</h4>
          <p className="text-2xl font-bold">45min</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h4 className="text-sm font-medium mb-2">Tâches en retard</h4>
          <p className="text-2xl font-bold">
            {todos.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length}
          </p>
        </div>
      </div>
    </div>
  );
}