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
        host: config.get<string>('DB_HOST') || 'localhost',
        port: parseInt(config.get<string>('DB_PORT') || '3306', 10),
        username: config.get<string>('DB_USER') || 'root',
        password: config.get<string>('DB_PASSWORD') || '',
        database: config.get<string>('DB_NAME') || 'nest_contacts',
        entities: [Contact, MediaAdiction, User],
        synchronize: true,
      }),
    }),
    ContactModule,
    MediaAdictionModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
