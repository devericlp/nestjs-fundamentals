import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './interfaces/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PartialUpdateTaskDto } from './dto/partial-update-task.dto';

@Controller('tasks')
export class TasksController {

    constructor(private readonly tasksService: TasksService) {}

    @Get()
    findAll(): Task[] {
        return this.tasksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Task {
        return this.tasksService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateTaskDto): Task {
        return this.tasksService.create(dto);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskDto): Task {
        return this.tasksService.update(id, dto, 'full');
    }

    @Patch(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    partialUpdate(@Param('id', ParseIntPipe) id: number, @Body() dto: PartialUpdateTaskDto): void {
        this.tasksService.update(id, dto, 'partial');
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number): void {
        return this.tasksService.remove(id);
    }

}
