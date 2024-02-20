import { OrganizationDTO } from 'src/models/organization.dto';

export interface JwtPayload {
  username: string;
  token: string;
  lastAuthTimestamp: Date;
  organization: OrganizationDTO;
}
