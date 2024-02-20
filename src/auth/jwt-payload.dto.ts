import { OrganizationDTO } from 'src/contact-server/models/organization.dto';

export interface JwtPayload {
  username: string;
  token: string;
  lastAuthTimestamp: Date;
  organization: OrganizationDTO;
}
