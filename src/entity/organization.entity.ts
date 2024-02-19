import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Contact } from './contact.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'name', nullable: false, length: 50 })
  name: string = '';

  @OneToMany(() => User, (user) => user.organization)
  users: User[];

  @OneToMany(() => User, (contact) => contact.organization)
  contacts: Contact[];
}
