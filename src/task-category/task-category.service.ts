import { ConflictException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateTaskCategoryDto } from './dto/create-task-category.dto';
import { UpdateTaskCategoryDto } from './dto/update-task-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskCategoryService {
  constructor(private readonly prisma: PrismaService) { }
  async create(@Req() req, { name }: CreateTaskCategoryDto) {
    const userId = req.user.id;
    const category = await this.prisma.taskCategory.findFirst({ where: { userId, name } })
    if (category) {
      throw new ConflictException("You already have a category with this name");
    }
    const newCategory = await this.prisma.taskCategory.create({
      data: {
        userId,
        name,
      }
    })
    return { message: "Task category created successfully", data: newCategory }
  }

  async findAll(@Req() req) {
    const userId = req.user.id;
    const categories = await this.prisma.taskCategory.findMany({
      where: { userId },
      include: {
        tasks: true,
      },
    });

    const categoriesWithStatusOverview = categories.map(category => {
      const statusOverview = {
        TODO: category.tasks.filter(task => task.status === 'TODO').length,
        IN_PROGRESS: category.tasks.filter(task => task.status === 'IN_PROGRESS').length,
        COMPLETED: category.tasks.filter(task => task.status === 'COMPLETED').length,
        EXPIRED: category.tasks.filter(task => task.status === 'EXPIRED').length,
      };

      return {
        ...category,
        statusOverview,
      };
    });

    return { message: "Task categories retrieved successfully", data: categoriesWithStatusOverview };
  }

  async findOne(@Req() req, id: string) {
    const userId = req.user.id;
    const category = await this.prisma.taskCategory.findFirst({
      where: { userId, id },
      include: {
        tasks: true,
      },
    });

    if (!category) {
      throw new NotFoundException("Task category not found");
    }

    const statusOverview = {
      TODO: category.tasks.filter(task => task.status === 'TODO').length,
      IN_PROGRESS: category.tasks.filter(task => task.status === 'IN_PROGRESS').length,
      COMPLETED: category.tasks.filter(task => task.status === 'COMPLETED').length,
      EXPIRED: category.tasks.filter(task => task.status === 'EXPIRED').length,
    };

    return { message: "Task category retrieved successfully", data: { ...category, statusOverview } };
  }

  async update(@Req() req, id: string, updateTaskCategoryDto: UpdateTaskCategoryDto) {
    const userId = req.user.id;
    const category = await this.prisma.taskCategory.update({
      where: { userId, id }, data: updateTaskCategoryDto
    })
    if (!category) {
      throw new NotFoundException("Task category not found");
    }
    return { message: "Task category updated successfully", data: category }
  }

  async remove(@Req() req, id: string) {
    const userId = req.user.id;
    const category = await this.prisma.taskCategory.delete({ where: { userId, id } })
    if (!category) {
      throw new NotFoundException("Task category not found");
    }
    return { message: "Task category deleted successfully" }
  }
}
