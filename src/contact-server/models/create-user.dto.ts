import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    description: 'Username. Required.',
  })
  name?: string;
  @ApiProperty({ description: 'Clear text password.' })
  credential?: string;
  @ApiProperty({ description: 'Organization.name User belongs to.' })
  organizationName?: string;
}
