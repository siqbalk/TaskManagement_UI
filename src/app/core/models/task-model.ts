import { TaskStatus } from "src/app/shared/enums/task-enum";

export interface TaskModel {
    taskEntityId: number;
    taskName: string;
    when: string;
    status: TaskStatus;
}