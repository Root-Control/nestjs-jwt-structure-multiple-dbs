import { Global, Module, type Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { GeneratorService } from './services/generator.service';
import { ValidatorService } from './services/validator.service';

const providers: Provider[] = [ValidatorService, GeneratorService];

@Global()
@Module({
  providers,
  imports: [CqrsModule],
  exports: [...providers, CqrsModule],
})
export class SharedModule {}
