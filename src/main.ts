import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as requestIp from 'request-ip';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(requestIp.mw());

  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Message App Backend')
      .setDescription(
        'Bu uygulama mesajlaşma uygulamasının backendini barındırır.',
      )
      .setVersion('3.0')
      .addTag('Message App Backend')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger/docs', app, document);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Veri tipi degisimi yapabilmemiz icin aktif edildi.
      disableErrorMessages: false, // Hata mesajlarinda anlamli metin donmesini saglar/
      whitelist: true, // Whitelist acmazsak asagidaki iki kurali kullanamayiz.
      forbidNonWhitelisted: true, //  Alttaki kurali yazmama izin veriyor
      forbidUnknownValues: true, // POST,GET,PATCH,DELETE bilinmeyten deger gelmesini engelller.
    }),
  );

  await app.listen(config.port).then(() => {
    console.log('NODE_ENV: ', process.env.NODE_ENV);
    console.log('Start Port: ', config.port);
  });
}
bootstrap();
