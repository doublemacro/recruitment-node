import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CreateUserDTO } from './users/entities/create-user.dto';
import { UsersService } from './users/users.service';
import { CarbonService } from './carbon/carbon.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService, private userService: UsersService, private carbonService: CarbonService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  async register(@Body() content: CreateUserDTO) {
    return this.userService.create(content);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/switch')
  async switchOwner(@Request() req, @Body() body: {carbonId: number, username: string}) {
    var carbon = await this.carbonService.findOne(body.carbonId);
    var nextUser = await this.userService.findOne(body.username)
    return this.carbonService.transfer(req.user, carbon, nextUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/availabe_certificates')
  async getAvailableCerts(@Request() req) {
    return this.carbonService.findAllAvailable();
  }
}
