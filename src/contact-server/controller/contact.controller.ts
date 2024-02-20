import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Contact } from 'src/contact-server/entity/contact.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { ContactService } from 'src/contact-server/service/contact.service';
import { CreateContactDTO } from '../models/create-contact.dto';

@ApiTags('Contact')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Create one Contact' })
  @ApiCreatedResponse({ type: Contact })
  createContact(
    @Body() contact: CreateContactDTO,
    @Request() req: any,
  ): Promise<Contact> {
    return this.contactService.createContact(req.user.name, contact);
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
  async deleteContact(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<void> {
    const userOrganizationId = req.user.organization.id;
    const contact = await this.contactService.getContactById(id);

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    // Check if the user belongs to the same organization as the contact
    if (contact.organization.id !== userOrganizationId) {
      throw new UnauthorizedException(
        'Unauthorized: User does not belong to the same organization as the contact',
      );
    }

    await this.contactService.deleteContact(id);
  }

  @Get('new-contacts')
  async getNewContacts(@Request() req: any): Promise<number> {
    const since = req.user.lastLogin; //this will remain a mystery for now
    console.log(since);
    return this.contactService.getTotalNewContacts(since);
  }
}
