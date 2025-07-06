import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { UpdateContactDto } from './dto/update-contact.dto';
import { MailService } from 'src/mail.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly configService: ConfigService,
    private readonly mailService: MailService, // 👈 inyecta MailService
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = this.contactRepository.create(createContactDto);

    try {
      const apiKey = this.configService.get<string>('ABSTRACT_API_KEY');
      const response = await axios.get('https://emailvalidation.abstractapi.com/v1/', {
        params: {
          api_key: apiKey,
          email: contact.email,
        },
      });

      const data = response.data;
      contact.emailDomain = contact.email?.split('@')[1] || null;
      contact.isValidEmail = data.is_valid_format?.value ?? null;
      contact.isDisposable = data.is_disposable_email?.value ?? null;
      contact.deliverability = data.deliverability ?? null;
    } catch (error) {
      console.error('Error validando el email:', error.message);
    }

    // 👉 envía correo de notificación antes o después de guardar
    await this.mailService.sendNewContactNotification(contact);

    return this.contactRepository.save(contact);
  }

  findAll(): Promise<Contact[]> {
    return this.contactRepository.find();
  }

  findOne(id: number): Promise<Contact | null> {
    return this.contactRepository.findOneBy({ id });
  }

  async update(id: number, updateContactDto: UpdateContactDto): Promise<Contact | null> {
    await this.contactRepository.update(id, updateContactDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Contact | null> {
    const contact = await this.findOne(id);
    if (!contact) return null;
    await this.contactRepository.delete(id);
    return contact;
  }
}
