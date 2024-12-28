// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const configService = app.get(ConfigService);

//   app.useGlobalPipes(new ValidationPipe());
//   app.enableCors();

//   const config = new DocumentBuilder()
//     .setTitle('Flip it API')
//     .setDescription('API for Flip it')
//     .setVersion('2.0')
//     .addBearerAuth()
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('docs', app, document);
//   const port = process.env.PORT || 4000;
//   // const port = configService.get<number>('PORT', 3000);
//   await app.listen(port);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    app.enableCors({
      origin: configService.get<string>('CORS_ORIGIN', '*'),
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    const swaggerConfig = new DocumentBuilder()
      .setTitle('Flip it API')
      .setDescription('API for Flip it')
      .setVersion('2.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);

    const port = configService.get<number>('PORT', 4000);
    await app.listen(port);

    logger.log(`Application is running on: http://localhost:${port}`);
    logger.log(
      `Swagger documentation is available at: http://localhost:${port}/docs`,
    );

    // Graceful shutdown
    const signals = ['SIGTERM', 'SIGINT'];
    signals.forEach((signal) => {
      process.on(signal, async () => {
        logger.log(`Received ${signal}, starting graceful shutdown`);
        await app.close();
        logger.log('Application closed');
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error('Error during application bootstrap', error);
    process.exit(1);
  }
}

bootstrap();
