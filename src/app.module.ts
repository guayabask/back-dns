import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from './contact/contact.module';
import { Contact } from './contact/entities/contact.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // O la contraseña que tengas en WAMP
      database: 'nest_contacts', // crea esta DB en phpMyAdmin o desde consola
      entities: [Contact],
      synchronize: true, // ⚠️ solo para desarrollo
    }),
    ContactModule,
  ],
})
export class AppModule {}
