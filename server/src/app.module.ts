import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [QuizModule, AnnouncementModule, AuthModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
