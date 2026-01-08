import React from 'react';
import { FilterStatus } from '../types';
import { FILTERS } from '../constants';

interface FilterTabsProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="flex items-center space-x-1 bg-slate-900/70 p-1 rounded-xl mb-6 border border-slate-700">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`flex-1 py-2 px-4 text-sm font-semibold rounded-lg transition-all ${
            currentFilter === f.value
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};
