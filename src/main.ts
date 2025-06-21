import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir peticiones desde el frontend
  app.enableCors({
    origin: 'http://localhost:5173', // cambia si tu frontend está en otro dominio o puerto
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
