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
        url: config.get('DATABASE_URL'),
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
export class AppModule { }
