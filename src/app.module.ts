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
        host: config.get<string>('MYSQLHOST') || 'mysql.railway.internal',
        port: parseInt(config.get<string>('MYSQLPORT') || '3306', 10),
        username: config.get<string>('MYSQLUSER') || 'root',
        password: config.get<string>('MYSQLPASSWORD') || 'suasenha',
        database: config.get<string>('MYSQLDATABASE') || 'nomedobanco',
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
