import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/types/shared.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { LoggerMiddleware } from './core/middlewares/logging.middleware';
import { PostModule } from './modules/posts/post.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
// import { APP_FILTER } from '@nestjs/core';
// import { ExceptionLoggerFilter } from './utils/exceptionLogger.filter';

@Module({
  imports: [
    AuthModule,
    PostModule,
    UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      useNewUrlParser: true,
    }),
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
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      buildSchemaOptions: {
        fieldMiddleware: [LoggerMiddleware],
      },
      include: [],
      formatError: (error: any) => {
        const graphQLFormattedError: any = {
          code: error?.extensions?.exception?.status,
          message: error?.extensions?.exception['message'] || error?.message,
        };
        return graphQLFormattedError;
      },
      context: ({ req }) => {
        return { request: req };
      },
      playground: true,
      installSubscriptionHandlers: true,
    }),
  ],
  providers: [
    JwtService,
    // {
    //   provide: APP_FILTER,
    //   useClass: ExceptionLoggerFilter,
    // },
  ],
})
export class AppModule {}
