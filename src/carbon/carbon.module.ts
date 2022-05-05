import { Module } from '@nestjs/common';
import { CarbonService } from './carbon.service';
import { CarbonController } from './carbon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carbon } from './entities/carbon.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carbon, User])],
  controllers: [CarbonController],
  providers: [CarbonService]
})
export class CarbonModule {}
