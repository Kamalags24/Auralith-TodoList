import React from 'react';
import { ListChecks, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export function Header({ isDark, onThemeToggle }: HeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-4xl mx-auto py-4 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ListChecks size={32} className="text-blue-500" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white truncate">
            Auralith TodoList
          </h1>
        </div>
        <button
          onClick={onThemeToggle}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors "
        >
          {isDark ? (
            <Sun className="text-yellow-500" size={24} />
          ) : (
            <Moon className="text-gray-600" size={24} />
          )}
        </button>
      </div>
    </div>
  );
}