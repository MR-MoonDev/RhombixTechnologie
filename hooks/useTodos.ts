
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Todo, FilterStatus, Priority } from '../types';
import { storage } from '../utils/storage';
import { STORAGE_KEY } from '../constants';
import { geminiService } from '../services/geminiService';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => storage.get(STORAGE_KEY, []));
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Persistence
  useEffect(() => {
    storage.set(STORAGE_KEY, todos);
  }, [todos]);

  const addTodo = useCallback(async (text: string) => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    const suggestion = await geminiService.analyzeTask(text);
    setIsAnalyzing(false);

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      category: suggestion?.category || 'Other',
      priority: (suggestion?.priority as Priority) || 'medium',
      createdAt: Date.now(),
    };

    setTodos(prev => [newTodo, ...prev]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active': return todos.filter(t => !t.completed);
      case 'completed': return todos.filter(t => t.completed);
      default: return todos;
    }
  }, [todos, filter]);

  const stats = useMemo(() => ({
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  }), [todos]);

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    isAnalyzing,
    stats
  };
};
