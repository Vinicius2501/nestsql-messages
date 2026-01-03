import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { UpdateMessageDto } from './entities/dto/update-message.dto';
import { CreateMessageDto } from './entities/dto/create-message.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { addHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
import { TimingConnectionInterceptor } from 'src/common/interceptors/timing-connection.interceptor';
import { ErrorhandlingInterceptor } from 'src/common/interceptors/erro-handling.interceptor';
import { SimpleCacheInterceptor } from 'src/common/interceptors/simple-cache.interceptor';
import { ChangeDataInterceptor } from 'src/common/interceptors/change-data.interceptor';
import { AuthTokenInterceptor } from 'src/common/interceptors/auth-token.interceptor';

@Controller('messages')
@UseInterceptors(
  AuthTokenInterceptor,
  addHeaderInterceptor,
  TimingConnectionInterceptor,
  ErrorhandlingInterceptor,
  ChangeDataInterceptor,
  SimpleCacheInterceptor,
)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.messagesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.messagesService.findOne(id);
  }

  @Post()
  createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Put(':id')
  putMessage(
    @Param('id') id: number,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Patch(':id')
  patchMessage(
    @Param('id') id: number,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  deleteMessage(@Param('id') id: number) {
    return this.messagesService.remove(id);
  }
}
