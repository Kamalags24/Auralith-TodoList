import React from 'react';
import { initializeCharts } from './ChartConfig';
import { ProductivityChart } from './ProductivityChart';
import { PriorityChart } from './PriorityChart';
import { MetricsGrid } from './MetricsGrid';
import type { Todo } from '../../types/todo';

initializeCharts();

interface StatisticsProps {
  todos: Todo[];
}

export function Statistics({ todos }: StatisticsProps) {
  return (
    <div className="space-y-8">
      <ProductivityChart todos={todos} />
      <PriorityChart todos={todos} />
      <MetricsGrid todos={todos} />
    </div>
  );
}