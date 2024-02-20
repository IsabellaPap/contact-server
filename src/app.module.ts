import { AuthModule } from './auth/auth.module';
import { ContactServerModule } from './contact-server/contact-server.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, ContactServerModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
