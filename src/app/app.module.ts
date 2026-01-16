import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from 'src/messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessageEntity } from 'src/messages/entities/message.entity';
import { PeopleModule } from 'src/people/people.module';
import { SimpleMiddleware } from 'src/common/middlewares/simple.middleware';
import { MyExceptionFilter } from 'src/common/filters/my-exception.filter';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';
import { Person } from 'src/people/entities/person.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('AZURE_TYPE') as 'mssql',
        host: configService.get<string>('AZURE_SQL_SERVER'),
        port: Number(configService.get<string>('AZURE_SQL_PORT') ?? '1433'),
        username: configService.get<string>('AZURE_USERNAME'),
        password: configService.get<string>('AZURE_PASSWORD'),
        database: configService.get<string>('AZURE_SQL_DATABASE'),
        options: {
          encrypt: Boolean(configService.get<string>('OPTIONS_ENCRYPT')),
          trustServerCertificate: Boolean(
            configService.get<string>('OPTIONS_TRUST_SERVER_CERTIFICATE'),
          ),
        },
        entities: [MessageEntity, Person],
        autoLoadEntities: Boolean(
          configService.get<string>('LOAD_ENTITIES') === 'true',
        ),
        synchronize: Boolean(
          configService.get<string>('SYNCHRONIZE') === 'true',
        ),
      }),
    }),
    MessagesModule,
    PeopleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_FILTER',
      useClass: MyExceptionFilter,
    },
    {
      provide: 'APP_GUARD',
      useClass: IsAdminGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware).forRoutes('*');
  }
}
