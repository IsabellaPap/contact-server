import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Organization } from './organization.entity';
import { UserDTO } from 'src/models/user.dto';

@Entity('user')
export class User implements UserDTO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', unique: true, nullable: false, length: 20 })
  name: string;

  @Column({ name: 'passhash', nullable: true })
  credential?: string;

  @ManyToOne(() => Organization, (organization) => organization.users)
  organization: Organization;
}
