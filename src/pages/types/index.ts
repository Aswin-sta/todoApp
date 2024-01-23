export interface TaskPropType {
  id: number;
  title: string;
  status: "complete" | "incomplete";
}

export type TaskComponentPropType = {
  task: TaskPropType;
  changeStatus: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
