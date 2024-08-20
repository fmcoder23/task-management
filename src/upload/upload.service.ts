import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  client: S3Client;
  constructor(private readonly config: ConfigService) {
    this.client = new S3Client({
      endpoint: config.get('R2_ENDPOINT'),
      region: 'auto',
      credentials: {
        accessKeyId: config.get('R2_ACCESS_KEY'),
        secretAccessKey: config.get('R2_SECRET_KEY'),
      }
    })
  }
  async create(file: {fileName: string, fileType: string, body: Buffer}) {
    const name = `${randomUUID()}${extname(file.fileName)}`
    
    await this.client.send(new PutObjectCommand({
      Bucket: this.config.get('R2_BUCKET'),
      Key: name,
      Body: file.body,
      ContentType: file.fileType,
    }))
    
    return {name};
  }
}
