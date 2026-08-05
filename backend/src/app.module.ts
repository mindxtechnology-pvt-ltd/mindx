import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MessagesModule } from './messages/messages.module';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blogs/blogs.module';
import { TeamModule } from './team/team.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [PrismaModule, MessagesModule, AuthModule, BlogsModule, TeamModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

