import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDTO } from './dto/signUp.dto';
import { User } from './models/user.model';
import { SignInDTO } from './dto/signIn.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUp: SignUpDTO): Promise<User> {
    return this.usersService.signUp(signUp);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signIn: SignInDTO,
  ): Promise<{ name: string; jwtToken: string; email: string }> {
    return this.usersService.signIn(signIn);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
