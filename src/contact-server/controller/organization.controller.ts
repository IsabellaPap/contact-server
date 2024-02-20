import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Organization } from 'src/contact-server/entity/organization.entity';
import { OrganizationService } from 'src/contact-server/service/organization.service';

@ApiTags('Organization')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @ApiOperation({ summary: 'Create one Organization' })
  createOrganization(@Body() organization: Organization) {
    return this.organizationService.createOrganization(organization);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of all Organizations' })
  getAllOrganizations() {
    return this.organizationService.getAllOrganizations();
  }
}
