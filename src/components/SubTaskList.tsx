import React from 'react';
import { Check, Plus, X } from 'lucide-react';
import { SubTask } from '../types/todo';

interface SubTaskListProps {
  subtasks: SubTask[];
  onToggleSubTask: (subtaskId: string) => void;
  onAddSubTask: (title: string) => void;
  onDeleteSubTask: (subtaskId: string) => void;
}

export function SubTaskList({
  subtasks,
  onToggleSubTask,
  onAddSubTask,
  onDeleteSubTask,
}: SubTaskListProps) {
  const [newSubTask, setNewSubTask] = React.useState('');

  const handleAddSubTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubTask.trim()) {
      onAddSubTask(newSubTask.trim());
      setNewSubTask('');
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Sous-tâches</h4>
      
      <form onSubmit={handleAddSubTask} className="flex gap-2">
        <input
          type="text"
          value={newSubTask}
          onChange={(e) => setNewSubTask(e.target.value)}
          placeholder="Nouvelle sous-tâche..."
          className="flex-1 px-3 py-1 text-sm rounded border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="p-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
        >
          <Plus size={20} />
        </button>
      </form>

      <div className="space-y-1">
        {subtasks.map((subtask) => (
          <div
            key={subtask.id}
            className="flex items-center gap-2 group text-sm"
          >
            <button
              onClick={() => onToggleSubTask(subtask.id)}
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                subtask.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 dark:border-gray-500'
              }`}
            >
              {subtask.completed && <Check size={12} className="text-white" />}
            </button>
            <span className={subtask.completed ? 'line-through text-gray-500' : ''}>
              {subtask.title}
            </span>
            <button
              onClick={() => onDeleteSubTask(subtask.id)}
              className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}