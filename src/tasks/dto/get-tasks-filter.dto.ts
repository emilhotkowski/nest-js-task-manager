import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatusValidationPipe } from "../pipes/task-status-validation.pipe";
import { TaskStatus } from "../task-status.enum";

export class GetTasksFilterDTO {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus

    @IsOptional()
    @IsNotEmpty()
    search: string

}