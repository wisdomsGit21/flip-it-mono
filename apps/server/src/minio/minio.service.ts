import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private minioClient: Minio.Client;

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT,
      port: parseInt(process.env.MINIO_PORT),
      useSSL: true,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });
  }

  async uploadFile(
    bucketName: string,
    objectName: string,
    stream: any,
  ): Promise<string> {
    await this.minioClient.putObject(bucketName, objectName, stream);
    return this.minioClient.presignedGetObject(bucketName, objectName);
  }

  async getFileUrl(bucketName: string, objectName: string): Promise<string> {
    return this.minioClient.presignedGetObject(bucketName, objectName);
  }
}
