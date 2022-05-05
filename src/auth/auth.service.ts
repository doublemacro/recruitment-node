import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/users/entities/user.entity';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async validateUser(username: string, password: string): Promise<any>{
    const user = await this.usersService.findOne(username);
    // use bcrypt here to validate password
    var passwordResult = await compare(password, user.password);
    if (user && passwordResult === true) {
      // extract password data from user, return the rest.
      const {password, ...result} = user;
      return result;
    } else {
      return null;
    }
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
 }
