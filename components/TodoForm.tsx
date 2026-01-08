import React, { useState } from 'react';

interface TodoFormProps {
  onAdd: (text: string) => void;
  isAnalyzing: boolean;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd, isAnalyzing }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isAnalyzing) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          disabled={isAnalyzing}
          className="w-full px-6 py-4 bg-slate-900/70 border-2 border-slate-700 rounded-2xl shadow-sm outline-none transition-all focus:border-indigo-400 focus:ring-4 focus:ring-indigo-900/20 disabled:bg-slate-800 disabled:text-slate-400 text-lg placeholder:text-slate-400 text-white"
        />
        <button
          type="submit"
          disabled={!text.trim() || isAnalyzing}
          className="absolute right-3 top-2.5 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium shadow-md transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center gap-2 justify-center"
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Analyzing...</span>
            </>
          ) : (
            'Add Task'
          )}
        </button>
      </div>
      
    </form>
  );
};
