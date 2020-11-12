import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    async getAllTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
        return await this.taskRepository.getAllTasks(filterDTO)
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id)
        if(!found) {
            throw new NotFoundException(`Task with ID "${id}" was not found`)
        }

        return found
    }

    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        return this.taskRepository.createTask(createTaskDTO)
    }

    async deleteTaskById(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id)

        if(result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" was not found`)
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id)
        task.status = status

        return await task.save()
    }

}
