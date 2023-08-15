import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common/pipes";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  app.useGlobalPipes( new ValidationPipe({

    whitelist: true,
    forbidNonWhitelisted: true,

  }))


  const config = new DocumentBuilder()
    .setTitle('RestFullApiMongo')
    .setDescription('API, Mongo, Passport, JWT')
    .setVersion('1.0')    
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);



  await app.listen(3000);
}
bootstrap();
