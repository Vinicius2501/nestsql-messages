import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { Person } from 'src/people/entities/person.entity';
import { MessageUtils } from './messages.utils';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, Person])],
  controllers: [MessagesController],
  providers: [MessagesService, MessageUtils],
  exports: [MessagesService],
})
export class MessagesModule {}
