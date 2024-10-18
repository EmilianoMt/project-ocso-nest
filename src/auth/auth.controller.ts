import { Controller, Post, Body, Patch, Param, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import {TOKEN_NAME} from '../auth/constants/jwt.constants'
import { Response } from 'express';
import { Cookies } from './decorators/cookies.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  singup(@Body() createUserDto: CreateUserDto,) {
    return this.authService.resgisterUser(createUserDto)
    
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res({passthrough: true}) response: Response, @Cookies() cookies: any) {
    const token = await this.authService.loginUser(loginUserDto) 
    response.cookie(TOKEN_NAME, token, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7
    })
  }

  @Patch("/:email")
  updateUser(@Param('email') userEmail: string, @Body() updateUserDto: UpdateUserDto){
    return this.authService.updateUser(userEmail, updateUserDto)
  }
}
