import React from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { FilterTabs } from './components/FilterTabs';

const App: React.FC = () => {
  const { 
    todos, 
    filter, 
    setFilter, 
    addTodo, 
    toggleTodo, 
    deleteTodo, 
    clearCompleted,
    isAnalyzing,
    stats
  } = useTodos();

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6"
      style={{
        background: "linear-gradient(90deg, rgba(20, 14, 14, 1) 0%, rgba(9, 9, 121, 1) 100%, rgba(0, 0, 0, 1) 0%)"
      }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="inline-flex items-center justify-center p-3  text-white rounded-2xl shadow-xl shadow-indigo-100 mb-4">
            
          </div>
          <h1 className="text-4xl font-extrabold text-slate-50 tracking-tight">Rhombix Technologie</h1>
          <p className="mt-2 text-slate-300 font-medium">Simplify your life with MuneebSiddiqui task management.</p>
        </header>

        {/* Main Content */}
        <main>
          <TodoForm onAdd={addTodo} isAnalyzing={isAnalyzing} />

          <FilterTabs currentFilter={filter} onFilterChange={setFilter} />

          <div className="mb-4 flex items-center justify-between px-2">
            <div className="text-sm font-medium text-slate-300">
              Showing {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
            </div>
            {stats.completed > 0 && (
              <button 
                onClick={clearCompleted}
                className="text-sm font-bold text-indigo-400 hover:text-indigo-200 transition-colors"
              >
                Clear completed
              </button>
            )}
          </div>

          <div className="space-y-1">
            {todos.length > 0 ? (
              todos.map(todo => (
                <TodoItem 
                  key={todo.id} 
                  todo={todo} 
                  onToggle={toggleTodo} 
                  onDelete={deleteTodo} 
                />
              ))
            ) : (
              <div className="py-12 text-center">
                <div className="inline-block p-4 bg-slate-900/50 rounded-full mb-4">
                  <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-3.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-.707.293h-2.121a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 009.586 13H4" />
                  </svg>
                </div>
                <p className="text-slate-400 font-medium">No tasks found. Time to relax!</p>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-slate-700 flex justify-between items-center px-4 text-slate-300">
          <div className="flex space-x-8">
            <div className="text-center">
              <div className="text-xl font-bold">{stats.active}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-slate-400">Active</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{stats.completed}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-slate-400">Completed</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
