import React, { useState } from 'react';
import { Header } from './components/Header';
import { TodoStats } from './components/TodoStats';
import { TodoFilters } from './components/TodoFilters';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { Sidebar } from './components/Sidebar';
import { QuoteCarousel } from './components/QuoteCarousel';
import { Container } from './components/Layout/Container';
import { Grid } from './components/Layout/Grid';
import { useTodos } from './hooks/useTodos';
import { useTheme } from './hooks/useTheme';
import { useBackground } from './hooks/useBackground';
import type { SortOption } from './types/todo';

function App() {
  const { isDark, toggleTheme } = useTheme();
  const background = useBackground();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    addSubTask,
    toggleSubTask,
    deleteSubTask,
    addTag,
    removeTag,
    sortTodos,
  } = useTodos();

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date');

  const filteredTodos = sortTodos(
    todos
      .filter((todo) => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
      })
      .filter((todo) => {
        if (categoryFilter === 'all') return true;
        return todo.category === categoryFilter;
      }),
    sortBy
  );

  const categories = Array.from(new Set(todos.map((todo) => todo.category)));

  return (
    <div 
      className="min-h-screen transition-all duration-1000"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <QuoteCarousel />
      
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Header isDark={isDark} onThemeToggle={toggleTheme} />
        
        <Container className="py-8">
          <TodoStats todos={todos} />
          
          <TodoForm onAdd={addTodo} />

          <div className="mt-8 space-y-4">
            <TodoFilters
              filter={filter}
              setFilter={setFilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              categories={categories}
            />

            <Grid cols={1} gap={4}>
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                  onAddSubTask={(title) => addSubTask(todo.id, title)}
                  onToggleSubTask={(subtaskId) => toggleSubTask(todo.id, subtaskId)}
                  onDeleteSubTask={(subtaskId) => deleteSubTask(todo.id, subtaskId)}
                  onAddTag={(tag) => addTag(todo.id, tag)}
                  onRemoveTag={(tag) => removeTag(todo.id, tag)}
                />
              ))}
              {filteredTodos.length === 0 && (
                <div className="text-center py-12 text-white">
                  Aucune tâche à afficher
                </div>
              )}
            </Grid>
          </div>
        </Container>
      </div>
    </div>
  );
}
export default App;