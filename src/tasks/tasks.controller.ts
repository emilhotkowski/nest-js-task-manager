import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks()
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id)
    }

    @Post()
    createTask(
        @Body() createTaskDTO: CreateTaskDTO
    ) {
        return this.tasksService.createTask(createTaskDTO);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string) {
        this.tasksService.deleteTaskById(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ) : Task {
        return this.tasksService.updateTaskStatus(id, status)
    }

}
