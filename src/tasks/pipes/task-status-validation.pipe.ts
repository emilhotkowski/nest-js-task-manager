import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE]

    transform(value: any) {
        value = value.toUpperCase()

        if(this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status`)
        }
        return value
    }

    private isStatusValid(status: any) {
        return this.allowedStatuses.indexOf(status) == -1
    }
}