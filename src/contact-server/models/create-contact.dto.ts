import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDTO {
  @ApiProperty({
    description: 'First name',
  })
  firstName?: string;
  @ApiProperty({
    description: 'Last name',
  })
  lastName?: string;
  @ApiProperty({
    description: 'Email. Required.',
  })
  email?: string;
}
