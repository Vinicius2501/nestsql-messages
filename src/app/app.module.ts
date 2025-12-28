import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from 'src/messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessageEntity } from 'src/messages/entities/message.entity';
import { PeopleModule } from 'src/people/people.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('AZURE_SQL_SERVER'),
        port: Number(configService.get<string>('AZURE_SQL_PORT') ?? '1433'),
        username: configService.get<string>('AZURE_USERNAME'),
        password: configService.get<string>('AZURE_PASSWORD'),
        database: configService.get<string>('AZURE_SQL_DATABASE'),
        options: {
          encrypt: true,
          trustServerCertificate: false,
        },
        entities: [MessageEntity],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    MessagesModule,
    PeopleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
