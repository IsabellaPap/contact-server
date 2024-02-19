import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Contact } from 'src/entity/contact.entity';
import { ContactService } from 'src/service/contact.service';

@ApiTags('Contact')
@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Create one Contact' })
  @ApiCreatedResponse({ type: Contact })
  createContact(@Body() contact: Contact): Promise<Contact> {
    return this.contactService.createContact(contact);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of all Contacts' })
  getAllContacts() {
    return this.contactService.getAllContacts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one contact by id' })
  getOneContactById(@Param(':id') id: string): Promise<Contact> {
    return this.contactService.getContactById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update one contact by id' })
  @ApiCreatedResponse({ type: Contact })
  updateContact(
    @Param(':id') id: string,
    @Body() contactDto: Contact,
  ): Promise<Contact> {
    return this.contactService.updateContact(id, contactDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one contact by id' })
  async deleteContact(@Param('id') id: string): Promise<void> {
    await this.contactService.deleteContact(id);
  }

  @Get('new-contacts/:since')
  async getNewContacts(@Param('since') since: Date): Promise<number> {
    return this.contactService.getTotalNewContacts(since);
  }
}
