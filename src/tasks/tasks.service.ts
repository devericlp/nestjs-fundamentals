import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './interfaces/task.interface';
import { PartialUpdateTaskDto } from './dto/partial-update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    private id: number = 1;

    findAll(): Task[] {
        return this.tasks;
    }

    findOne(id: number): Task {
        const task = this.tasks.find(task => task.id === id);
        if (!task) {
            throw new NotFoundException('Tarefa não encontrada');
        }
        return task;
    }

    create(dto: CreateTaskDto): Task {
        const now = new Date();

        const task: Task = {
            id: this.id++,
            title: dto.title,
            description: dto.description ?? undefined,
            completed: false,
            createdAt: now,
            updatedAt: now,
        }

        this.tasks.push(task);

        return task;
    }

    update(id: number, dto: PartialUpdateTaskDto, mode: 'partial' | 'full'): Task {
        const task = this.tasks.find((task) => task.id === id);
        if (!task) {
            throw new NotFoundException('Tarefa não encontrada');
        }

        if (dto.title !== undefined) {
            task.title = dto.title;
        }

        if (dto.completed !== undefined) {
            task.completed = dto.completed;
        }

        if (dto.description !== undefined) {
            task.description = dto.description;
        } else if (mode === 'full') {
            delete task.description;
        }

        task.updatedAt = new Date();

        return task;
    }

    remove(id: number): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

}
