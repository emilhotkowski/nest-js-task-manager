import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTasksFilterDTO } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getAllTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
        const { search, status } = filterDTO
        const query = this.createQueryBuilder('task')

        if(status) {
            query.andWhere('task.status = :status', { status })
        }
        if(search) {
            query.andWhere('(task.title LIKE :search or task.description LIKE :search)', { search: `%${search}%` })
        }

        const tasks = await query.getMany()
        return tasks
    }

    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        const task = new Task()
        const { title, description } = createTaskDTO

        task.title = title,
        task.description = description
        task.status = TaskStatus.OPEN

        return await this.save(task)
    }

}