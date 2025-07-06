import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { MailService } from 'src/mail.service';
import { RecaptchaService } from 'src/recaptcha/recaptcha.service'; 

@Controller('contacts')
export class ContactController {

  constructor(
  private readonly contactService: ContactService,
  private readonly mailService: MailService,
  private readonly recaptchaService: RecaptchaService, // <-- añade esto
) {}


  @Post()
  async create(@Body() dto: CreateContactDto & { captcha: string }): Promise<Contact> {
  // Verificar token captcha antes de continuar
  const isCaptchaValid = await this.recaptchaService.verifyToken(dto.captcha);
  if (!isCaptchaValid) {
    throw new BadRequestException('Captcha inválido');
  }

  const newContact = await this.contactService.create(dto);
  
  try {
    await this.mailService.sendNewContactNotification(newContact);
  } catch (error) {
    console.error('Error enviando email de notificación:', error);
  }
  
  return newContact;
}


  @Get()
  async findAll(): Promise<Contact[]> {
    return this.contactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Contact | null> {
    return this.contactService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateContactDto,
  ): Promise<Contact | null> {
    return this.contactService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Contact | null> {
    return this.contactService.remove(id);
  }
}
