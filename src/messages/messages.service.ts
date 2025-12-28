import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MessageEntity } from './entities/message.entity';
import { CreateMessageDto } from './entities/dto/create-message.dto';
import { UpdateMessageDto } from './entities/dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from 'src/people/entities/person.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    const { take = 10, skip = 0 } = paginationDto;
    return await this.messageRepository.find({
      relations: ['to', 'from'],
      select: {
        to: {
          name: true,
          email: true,
        },
        from: { name: true, email: true },
      },
      take,
      skip,
    });
  }

  async findOne(id: number) {
    if (isNaN(id)) return null;
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['to', 'from'],
      select: {
        to: {
          name: true,
          email: true,
        },
        from: { name: true, email: true },
      },
    });
    if (!message) throw new NotFoundException('Message not found');
    return message;
  }

  async create(createMessageDto: CreateMessageDto) {
    if (!createMessageDto) throw new BadRequestException('Invalid payload');

    const toPerson = await this.personRepository.findOneBy({
      id: createMessageDto.idTo,
    });
    if (!toPerson) throw new NotFoundException('Recipient not found');

    const fromPerson = await this.personRepository.findOneBy({
      id: createMessageDto.idFrom,
    });
    if (!fromPerson) throw new NotFoundException('Sender not found');

    const newMessage = this.messageRepository.create({
      content: createMessageDto.content,
      to: toPerson,
      from: fromPerson,
      readed: false,
      isDelete: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.messageRepository.save(newMessage);
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const updatedMessage = await this.messageRepository.preload({
      id,
      ...updateMessageDto,
      updatedAt: new Date(),
    });

    if (!updatedMessage) throw new NotFoundException('Message not found');
    await this.messageRepository.save(updatedMessage);
    return updatedMessage;
  }
  async remove(id: number) {
    if (isNaN(id)) return HttpStatus.BAD_REQUEST;
    const messageToDelete = await this.messageRepository.findOneBy({ id });
    if (!messageToDelete) throw new NotFoundException('Message not found');
    await this.messageRepository.delete(id);
    return messageToDelete;
  }
}
