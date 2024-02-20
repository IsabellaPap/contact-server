import { Organization } from '../entity/organization.entity';

export interface ContactDTO {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string; // validation ?
  createdOn: Date;
  userId?: string;
  organization?: Organization;
}
