import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './posts/post.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/types/shared.module';
import { UsersModule } from './users/users.module';
// import { APP_FILTER } from '@nestjs/core';
// import { ExceptionLoggerFilter } from './utils/exceptionLogger.filter';

@Module({
  imports: [
    PostModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      useNewUrlParser: true,
    }),
    UsersModule,
    ServeStaticModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (config: ApiConfigService) => {
        return [
          {
            serveRoot: '/uploads',
            rootPath: config.get('UPLOAD_PATH'),
          },
        ];
      },
      inject: [ApiConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (config: ApiConfigService) => config.mysqlConfig,
      inject: [ApiConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_FILTER,
    //   useClass: ExceptionLoggerFilter,
    // },
  ],
})
export class AppModule {}
