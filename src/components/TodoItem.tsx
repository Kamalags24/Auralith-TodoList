import React from 'react';
import { Check, Clock, Edit2, Trash2 } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const priorityColors = {
    basse: 'bg-blue-100 text-blue-800',
    moyenne: 'bg-yellow-100 text-yellow-800',
    haute: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`group flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 ${
      todo.completed ? 'opacity-75 bg-gray-50' : ''
    }`}>
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-green-500'
        }`}
      >
        {todo.completed && <Check size={14} className="text-white" />}
      </button>

      <div className="flex-1">
        <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.title}
        </h3>
        {todo.description && (
          <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
        )}
        <div className="flex gap-2 mt-2">
          <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[todo.priority]}`}>
            {todo.priority}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
            {todo.category}
          </span>
          {todo.dueDate && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 flex items-center gap-1">
              <Clock size={12} />
              {new Date(todo.dueDate).toLocaleDateString('fr-FR')}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(todo)}
          className="p-2 text-gray-500 hover:text-blue-500 rounded-full hover:bg-blue-50 transition-colors"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}