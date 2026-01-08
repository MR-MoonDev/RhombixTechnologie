import React from 'react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const priorityColors = {
    low: 'bg-emerald-800/30 text-emerald-400',
    medium: 'bg-amber-800/30 text-amber-400',
    high: 'bg-rose-800/30 text-rose-400',
  };

  return (
    <div
      className={`group flex items-center p-4 mb-3 bg-slate-900/70 border border-slate-700 rounded-xl transition-all hover:shadow-md ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          todo.completed
            ? 'bg-indigo-500 border-indigo-500 text-white'
            : 'border-slate-600 hover:border-indigo-400'
        }`}
      >
        {todo.completed && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="ml-4 flex-1">
        <span
          className={`block text-slate-100 transition-all ${
            todo.completed ? 'line-through text-slate-500' : 'font-medium'
          }`}
        >
          {todo.text}
        </span>
        <div className="flex items-center mt-1 space-x-2">
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded">
            {todo.category}
          </span>
          <span
            className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${priorityColors[todo.priority]}`}
          >
            {todo.priority}
          </span>
        </div>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-rose-400 transition-all"
        title="Delete task"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};
