import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { MessageEntity } from './entities/message.entity';
import { CreateMessageDto } from './entities/dto/create-message.dto';
import { UpdateMessageDto } from './entities/dto/update-message.dto';

@Injectable()
export class MessagesService {
  private lastId = 1;
  private messages: MessageEntity[] = [
    {
      id: 1,
      content: 'Hello, World!',
      to: 'Mary',
      from: 'Victor',
      readed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  findAll() {
    return this.messages;
  }

  findOne(id: number) {
    if (isNaN(id)) return null;
    const message = this.messages.find((m) => m.id === id);
    if (!message) throw new NotFoundException('Message not found');
    return message;
  }

  create(createMessageDto: CreateMessageDto) {
    if (!createMessageDto) return HttpStatus.BAD_REQUEST;
    this.lastId++;
    const newMessage = this.messages.push({
      id: this.lastId,
      ...createMessageDto,
      readed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return newMessage;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    if (isNaN(id)) return HttpStatus.BAD_REQUEST;
    if (!updateMessageDto) return HttpStatus.BAD_REQUEST;
    const messageIndex = this.messages.findIndex((m) => m.id === id);

    if (messageIndex === -1) throw new NotFoundException('Message not found');
    const updatedMessage = {
      ...this.messages[messageIndex],
      ...updateMessageDto,
    };

    this.messages[messageIndex] = updatedMessage;
    return updatedMessage;
  }
  remove(id: number) {
    if (isNaN(id)) return HttpStatus.BAD_REQUEST;
    const messageIndex = this.messages.findIndex((m) => m.id === id);
    const messageToDelete = this.messages[messageIndex];
    if (messageIndex === -1) throw new NotFoundException('Message not found');
    this.messages.splice(messageIndex, 1);
    return messageToDelete;
  }
}
