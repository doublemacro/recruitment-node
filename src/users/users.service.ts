import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './entities/create-user.dto';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

    async create(userDTO: CreateUserDTO): Promise<CreateUserDTO & User> {
        return this.encryptPassword(userDTO.password).then((encryptedPass) => {
            userDTO.password = encryptedPass;
            return this.userRepo.save(userDTO);
        });
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.userRepo.findOne({where: {
            username: username
        }})
    }

    async findAllCertificates(username: string): Promise<any> {
        var user = await this.userRepo.findOne({where: {
            username: username
        }});
        var certificates = user.carbonCertificates;
        return certificates;
    }

    async encryptPassword(password) {
        var encrypted = await hash(password, 10);
        return encrypted;
    }

}
