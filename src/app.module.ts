import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from './contact/contact.module';
import { MediaAdictionModule } from './media_adiction/mediaAdiction.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Contact } from './contact/entities/contact.entity';
import { MediaAdiction } from './media_adiction/entities/mediaAdiction.entity';
import { User } from './users/entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: 3306,
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [Contact, MediaAdiction, User],
        synchronize: true, // ⚠️ Solo en desarrollo
      }),
    }),
    ContactModule,
    MediaAdictionModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
