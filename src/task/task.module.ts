import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [TaskController],
  providers: [TaskService, AuthGuard],
})
export class TaskModule {}
