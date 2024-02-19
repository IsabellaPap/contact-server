import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { OrganizationDTO } from 'src/models/organization.dto';
import { OrganizationService } from 'src/service/organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @ApiOperation({ summary: 'Create one Organization' })
  createUser(@Body() organizationDto: OrganizationDTO) {
    return this.organizationService.createOrganization(organizationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of all Organizations' })
  getAllUsers() {
    return this.organizationService.getAllOrganizations();
  }
}
