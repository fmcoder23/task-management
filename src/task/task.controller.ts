import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Req, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { TaskResponseSchemas } from './responses/task.responses';
import { Priority, Status } from '@prisma/client';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags("Task")
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse(TaskResponseSchemas.taskCreated)
  create(@Req() req, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(req, createTaskDto);
  }

  @ApiOperation({ summary: 'Retrieve all tasks with optional filters' })
  @ApiQuery({ name: 'order', enum: ['asc', 'desc'], required: false, description: 'Sort order of tasks by priority' })
  @ApiQuery({ name: 'categoryId', required: false, description: 'Filter by category ID' })
  @ApiQuery({ name: 'priority', enum: Priority, required: false, description: 'Filter by task priority' })
  @ApiQuery({ name: 'status', enum: Status, required: false, description: 'Filter by task status' })
  @ApiQuery({ name: 'dueDate', required: false, description: 'Filter by due date (YYYY-MM-DD)' })
  @ApiResponse(TaskResponseSchemas.taskRetrieved)
  @Get()
  findAll(
    @Req() req,
    @Query('order') order: 'asc' | 'desc' = 'asc',
    @Query('categoryId') categoryId?: string,
    @Query('priority') priority?: Priority,
    @Query('status') status?: Status,
    @Query('dueDate') dueDate?: Date,
  ) {
    return this.taskService.findAll(req, order, categoryId, priority, status, dueDate);
  }

  @ApiOperation({ summary: 'Retrieve a single task by ID' })
  @ApiResponse(TaskResponseSchemas.taskRetrieved)
  @ApiResponse(TaskResponseSchemas.taskNotFound)
  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    return this.taskService.findOne(req, id);
  }

  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiResponse(TaskResponseSchemas.taskUpdated)
  @ApiResponse(TaskResponseSchemas.taskNotFound)
  @Put(':id')
  update(@Req() req, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(req, id, updateTaskDto);
  }

  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiResponse(TaskResponseSchemas.taskDeleted)
  @ApiResponse(TaskResponseSchemas.taskNotFound)
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.taskService.remove(req, id);
  }
}
