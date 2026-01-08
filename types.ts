
export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  priority: Priority;
  createdAt: number;
}

export type FilterStatus = 'all' | 'active' | 'completed';

export interface AISuggestion {
  category: string;
  priority: Priority;
  reason: string;
}
