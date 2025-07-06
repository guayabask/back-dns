import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { MailService } from 'src/mail.service';
import { RecaptchaService } from 'src/recaptcha/recaptcha.service';
import { RecaptchaModule } from 'src/recaptcha/recaptcha.module';


@Module({
  imports: [TypeOrmModule.forFeature([Contact]), RecaptchaModule],
  controllers: [ContactController],
  providers: [ContactService, MailService],
})
export class ContactModule {}


