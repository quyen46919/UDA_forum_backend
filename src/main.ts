import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    graphqlUploadExpress({
      maxFileSize: parseInt('20000000'),
      maxFiles: parseInt('4'),
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8888);
}
bootstrap();
