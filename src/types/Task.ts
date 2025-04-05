export interface Task {
  id: string;
  title: string;
  category?: string;
  classification: 'Leverage' | 'Neutral' | 'Overhead';
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Blocked' | 'Paused';
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  timeSpent?: number;
  comments?: string;
} 