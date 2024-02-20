import { Organization } from 'src/contact-server/entity/organization.entity';

export interface JwtPayload {
  username: string;
  token: string;
  lastAuthTimestamp: Date;
  organization: Organization;
}
