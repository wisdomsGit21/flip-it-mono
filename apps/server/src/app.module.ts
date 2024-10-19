import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MinioModule } from './minio/minio.module';

import { PdfsModule } from './pdfs/pdfs.module';
import { VideosModule } from './videos/videos.module';
import { FlipbooksModule } from './flipbooks/flipbooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: config.get('NODE_ENV') !== 'production',
        ssl: {
          rejectUnauthorized: true,
          ca: config.get<string>('DB_CA'),
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    MinioModule,
    PdfsModule,
    VideosModule,
    FlipbooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
