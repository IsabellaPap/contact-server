import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/contact-server/entity/organization.entity';
import { OrganizationDTO } from 'src/contact-server/models/organization.dto';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async createOrganization(
    organizationDto: OrganizationDTO,
  ): Promise<Organization> {
    const { name } = organizationDto;

    const organization = new Organization();
    if (!name) {
      throw new Error('Property `name` is required for Organization');
    }
    organization.name = name;

    return await this.organizationRepository.save(organization);
  }

  async getAllOrganizations(): Promise<Organization[]> {
    return this.organizationRepository.find();
  }
}
