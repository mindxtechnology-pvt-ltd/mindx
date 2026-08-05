import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MessagesModule } from './messages/messages.module';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blogs/blogs.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [PrismaModule, MessagesModule, AuthModule, BlogsModule, TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

