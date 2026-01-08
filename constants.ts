
import { FilterStatus } from './types';

export const STORAGE_KEY = 'MuneebSiddiqui_TodoApp';

export const CATEGORIES = [
  'Work',
  'Personal',
  'Health',
  'Finance',
  'Shopping',
  'Other'
];

export const FILTERS: { label: string; value: FilterStatus }[] = [
  { label: 'All Tasks', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];
