import { Global, Module } from '@nestjs/common';
import { CaslAbilityService } from './casl-ability/casl-ability.service';

@Global()
@Module({
  providers: [CaslAbilityService],
  exports: [CaslAbilityService], // Exporting the service so it can be used in other modules
})
export class CaslModule {}
