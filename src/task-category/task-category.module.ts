import { Module } from '@nestjs/common';
import { TaskCategoryService } from './task-category.service';
import { TaskCategoryController } from './task-category.controller';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';  

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [TaskCategoryController],
  providers: [TaskCategoryService, AuthGuard],
})
export class TaskCategoryModule { }
