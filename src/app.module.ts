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
import { UserModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { UserTokenModule } from './modules/user-tokens/user-token.module';
import { TagModule } from './modules/tags/tag.module';
import { QuestionModule } from './modules/questions/question.module';
import { QuestionTagModule } from './modules/question-tags/question-tag.module';
import { UserQuestionActionModule } from './modules/user-question-actions/user-question-action.module';
import { AnswerModule } from './modules/answers/answer.module';
import { UserAnswerActionModule } from './modules/user-answer-actions/user-answer-action.module';
import { ImageModule } from './modules/images/images.module';
import { GroupModule } from './modules/groups/group.module';
import { GroupMemberModule } from './modules/group-member/group-member.module';
import { GroupAttendanceModule } from './modules/group-attendances/group-attendance.module';
// import { APP_FILTER } from '@nestjs/core';
// import { ExceptionLoggerFilter } from './utils/exceptionLogger.filter';

@Module({
  imports: [
    AuthModule,
    PostModule,
    UserModule,
    UserTokenModule,
    TagModule,
    QuestionModule,
    QuestionTagModule,
    UserQuestionActionModule,
    AnswerModule,
    UserAnswerActionModule,
    ImageModule,
    GroupModule,
    GroupMemberModule,
    GroupAttendanceModule,
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
          code: error?.extensions?.response?.statusCode,
          message: error?.extensions?.response?.message || error.message,
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
