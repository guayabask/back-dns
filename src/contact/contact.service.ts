import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  create(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = this.contactRepository.create(createContactDto);
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
