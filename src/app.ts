import { Module, Version } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { TaskCategoryModule } from './task-category/task-category.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    TaskCategoryModule,
    TaskModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
