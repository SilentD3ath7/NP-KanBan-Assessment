export type TaskItem = {
  id: string;
  content: string;
};

export type ColumnData = {
  name: string;
  items: TaskItem[];
};

export type ColumnsState = {
  toDo: ColumnData;
  inProgress: ColumnData;
  inReview: ColumnData;
  done: ColumnData;
};

export type RightSideBarProps = {
  notStarted: number;
  inProgressAndReview: number;
  completedTasks: number;
  totalTasks: number;
};

export type ColumnKey = keyof ColumnsState;