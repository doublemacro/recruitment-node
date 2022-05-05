import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Carbon } from './entities/carbon.entity';
import { CARBONSTATUS } from './entities/carbon_status.enum';

@Injectable()
export class CarbonService {

  constructor(@InjectRepository(Carbon) private carbonRepo: Repository<Carbon>) {}

  findAll(): Promise<Carbon[]> {
    return this.carbonRepo.find();
  }

  findAllAvailable() {
    return this.carbonRepo.find({
      where: {
        status: CARBONSTATUS.AVAILABLE
      }
    });
  }

  findOne(id: number): Promise<Carbon> {
    return this.carbonRepo.findOne(id);
  }

  transfer(currentUser: User, certificate: Carbon, nextUser: User) {
    certificate.status = CARBONSTATUS.TRANSFERRED;
    certificate.user = nextUser;
    this.carbonRepo.save(certificate);
    return true;
  }

}
