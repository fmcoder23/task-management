import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [JwtModule],
  controllers: [UploadController],
  providers: [UploadService, AuthGuard],
})
export class UploadModule {}
