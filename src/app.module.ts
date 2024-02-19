import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { Organization } from './entity/organization.entity';
import { Contact } from './entity/contact.entity';
import { OrganizationService } from './service/organization.service';
import { OrganizationController } from './controller/organization.controller';
import { ContactService } from './service/contact.service';
import { ContactController } from './controller/contact.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'isabella',
      password: 'contactserver',
      database: 'contactserver',
      entities: [User, Organization, Contact],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Organization, Contact]),
  ],
  providers: [UserService, OrganizationService, ContactService],
  controllers: [UserController, OrganizationController, ContactController],
})
export class AppModule {}
