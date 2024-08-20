import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Req } from '@nestjs/common';
import { TaskCategoryService } from './task-category.service';
import { CreateTaskCategoryDto } from './dto/create-task-category.dto';
import { UpdateTaskCategoryDto } from './dto/update-task-category.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { TaskCategoryResponseSchemas } from './responses/task-category.responses';

@ApiTags("Task Category")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('task-category')
export class TaskCategoryController {
  constructor(private readonly taskCategoryService: TaskCategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task category' })
  @ApiResponse(TaskCategoryResponseSchemas.categoryCreated)
  @ApiResponse(TaskCategoryResponseSchemas.categoryConflict)
  create(@Req() req, @Body() createTaskCategoryDto: CreateTaskCategoryDto) {
    return this.taskCategoryService.create(req, createTaskCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all task categories with an overview of task statuses' })
  @ApiResponse(TaskCategoryResponseSchemas.categoryRetrieved)
  @ApiResponse(TaskCategoryResponseSchemas.categoryNotFound)
  findAll(@Req() req) {
    return this.taskCategoryService.findAll(req);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single task category by ID with an overview of task statuses' })
  @ApiResponse(TaskCategoryResponseSchemas.categoryRetrieved)
  @ApiResponse(TaskCategoryResponseSchemas.categoryNotFound)
  findOne(@Req() req, @Param('id') id: string) {
    return this.taskCategoryService.findOne(req, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task category by ID' })
  @ApiResponse(TaskCategoryResponseSchemas.categoryCreated)
  @ApiResponse(TaskCategoryResponseSchemas.categoryNotFound)
  update(@Req() req, @Param('id') id: string, @Body() updateTaskCategoryDto: UpdateTaskCategoryDto) {
    return this.taskCategoryService.update(req, id, updateTaskCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task category by ID' })
  @ApiResponse(TaskCategoryResponseSchemas.categoryDeleted)
  @ApiResponse(TaskCategoryResponseSchemas.categoryNotFound)
  remove(@Req() req, @Param('id') id: string) {
    return this.taskCategoryService.remove(req, id);
  }
}
