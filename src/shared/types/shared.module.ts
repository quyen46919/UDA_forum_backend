import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from '../services/api-config.service';
import { JwtConstants } from '../services/jwt-constants';

const providers = [ApiConfigService, JwtConstants];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class SharedModule {}
