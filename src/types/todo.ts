export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'basse' | 'moyenne' | 'haute';
  category: string;
  dueDate?: Date;
  createdAt: Date;
  tags?: string[];
  subtasks?: SubTask[];
  color?: string;
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export type TodoCategory = {
  id: string;
  name: string;
  color: string;
  icon?: string;
};

export type SortOption = 'date' | 'priority' | 'alphabetical' | 'dueDate';