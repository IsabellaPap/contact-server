import { OrganizationDTO } from './organization.dto';

export interface ContactDto {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string; // validation ?
  orgnization: OrganizationDTO;
  createdAt: Date;
}
