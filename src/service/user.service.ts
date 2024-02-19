import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/entity/organization.entity';
import { User } from 'src/entity/user.entity';
import { UserDTO } from 'src/models/user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async createUser(userDto: UserDTO): Promise<User> {
    const { name, credential, organizationName } = userDto;

    const organization = await this.organizationRepository.findOne({
      where: { name: organizationName },
    });
    if (!organization) {
      throw new Error('Organization not found');
    }
    const user = new User();
    user.name = name;
    user.organization = organization;
    if (credential) {
      const hashedPassword = await bcrypt.hash(credential, 10);

      user.credential = hashedPassword;
    }

    return await this.userRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
