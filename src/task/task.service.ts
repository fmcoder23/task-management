import { BadRequestException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Priority, Status } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) { }
  async create(@Req() req, createTaskDto: CreateTaskDto) {
    const { title, description, photo, dueDate, priority, categoryId } = createTaskDto;
    const userId = req.user.id;

    let finalCategoryId = categoryId;

    if (!categoryId) {
      const generalCategory = await this.prisma.taskCategory.findFirst({
        where: { userId, name: "General" },
      });

      if (!generalCategory) {
        const newGeneralCategory = await this.prisma.taskCategory.create({
          data: { userId, name: "General" },
        });
        finalCategoryId = newGeneralCategory.id;
      } else {
        finalCategoryId = generalCategory.id;
      }
    }

    const newTask = await this.prisma.task.create({
      data: {
        userId,
        title,
        description,
        photo,
        dueDate,
        priority,
        categoryId: finalCategoryId,
      },
    });

    return { message: "Task created successfully", data: newTask };
  }

  async findAll(
    @Req() req,
    order: 'asc' | 'desc',
    categoryId?: string,
    priority?: Priority,
    status?: Status,
    dueDate?: Date,
  ) {
    const userId = req.user.id;

    const filters: any = { userId };
    if (categoryId) filters.categoryId = categoryId;
    if (priority) filters.priority = priority;
    if (status) filters.status = status;
    if (dueDate) filters.dueDate = {
      lt: new Date(dueDate),
    };

    const tasks = await this.prisma.task.findMany({
      where: filters,
      include: { category: true },
      orderBy: {
        priority: order,
      },
    });

    const now = new Date();
    for (const task of tasks) {
      if (task.dueDate && task.dueDate < now && task.status !== Status.EXPIRED) {
        await this.prisma.task.update({
          where: { id: task.id },
          data: { status: Status.EXPIRED },
        });
        task.status = Status.EXPIRED;
      }
    }

    return { message: "Tasks retrieved successfully", data: tasks };
  }

  async findOne(@Req() req, id: string) {
    const userId = req.user.id;
    const task = await this.prisma.task.findFirst({ where: { userId, id } });

    if (!task) {
      throw new NotFoundException("Task not found");
    }

    const now = new Date();
    if (task.dueDate && task.dueDate < now && task.status !== Status.EXPIRED) {
      await this.prisma.task.update({
        where: { id: task.id },
        data: { status: Status.EXPIRED },
      });
      task.status = Status.EXPIRED;
    }

    return { message: "Task retrieved successfully", data: task };
  }

  async update(@Req() req, id: string, updateTaskDto: UpdateTaskDto) {
    const userId = req.user.id;
    const task = await this.prisma.task.update({
      where: { userId, id }, data: updateTaskDto
    });
    if (!task) {
      throw new NotFoundException("Task not found");
    }
    return { message: "Task updated successfully", data: task };
  }

  async remove(@Req() req, id: string) {
    const userId = req.user.id;
    const task = await this.prisma.task.delete({ where: { userId, id } });
    if (!task) {
      throw new NotFoundException("Task not found");
    }
    return { message: "Task deleted successfully" };
  }
}
