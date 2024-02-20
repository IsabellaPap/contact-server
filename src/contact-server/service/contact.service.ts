import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/contact-server/entity/contact.entity';
import { Organization } from 'src/contact-server/entity/organization.entity';
import { User } from 'src/contact-server/entity/user.entity';
import { ContactDTO } from 'src/contact-server/models/contact.dto';
import { Repository } from 'typeorm';
import { MoreThanOrEqual } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createContact(contactDto: ContactDTO): Promise<Contact> {
    const { firstName, lastName, email } = contactDto;

    const user = await this.userRepository.findOne({
      where: { name: 'username' },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const contact = new Contact();
    if (!email) {
      throw new Error('Property email is required for User');
    }

    contact.email = email;

    if (firstName) {
      contact.firstName = firstName;
    }

    if (lastName) {
      contact.lastName = lastName;
    }

    const organization = user.organization;

    contact.organization = organization;

    return await this.contactRepository.save(contact);
  }

  async getAllContacts(): Promise<Contact[]> {
    return this.contactRepository.find();
  }

  async getContactById(id: string): Promise<Contact> {
    const contact = await this.contactRepository.findOne({
      where: { id: id },
    });
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  }

  async updateContact(id: string, contactDto: ContactDTO): Promise<Contact> {
    const contact = await this.contactRepository.findOne({
      where: { id: id },
    });
    if (!contact) {
      throw new Error('Contact not found');
    }

    if (contactDto.firstName) {
      contact.firstName = contactDto.firstName;
    }

    if (contactDto.lastName) {
      contact.lastName = contactDto.lastName;
    }

    if (contactDto.email) {
      contact.email = contactDto.email;
    }

    return this.contactRepository.save(contact);
  }

  async deleteContact(id: string): Promise<void> {
    const contact = await this.contactRepository.findOne({
      where: { id: id },
    });
    if (!contact) {
      throw new Error('Contact not found');
    }

    await this.contactRepository.remove(contact);
  }

  async getTotalNewContacts(lastAuthTimestamp: Date): Promise<number> {
    const newContacts = await this.contactRepository.count({
      where: {
        createdOn: MoreThanOrEqual(lastAuthTimestamp),
      },
    });

    return newContacts;
  }
}
