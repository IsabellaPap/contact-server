import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Organization } from './organization.entity';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'firstname', length: 30 })
  firstName: string;

  @Column({ name: 'lastname', length: 30 })
  lastName: string;

  @Column({ name: 'email', unique: true, nullable: false })
  email: string;

  @ManyToOne(() => Organization, (organization) => organization.contacts)
  organization: Organization;

  @CreateDateColumn()
  createdAt: Date;
}
