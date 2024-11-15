import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Res,
  BadGatewayException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags } from "@nestjs/swagger";
import { LoginUserDto } from "./dto/login-user.dto";
import { TOKEN_NAME } from "../auth/constants/jwt.constants";
import { Response } from "express";
import { Cookies } from "./decorators/cookies.decorator";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register/employee/[id]")
  registerEmployee(@Body() createUserDto: CreateUserDto, @Param("id") id: string) {
    if (
      createUserDto.userRoles.includes("Admin") ||
      createUserDto.userRoles.includes("Manager")
    )
      throw new BadGatewayException("Rol invalido");
    return this.authService.resgisterEmployee(id, createUserDto);
  }

  @Post("/register/manger")
  registerManager(@Body() createUserDto: CreateUserDto, @Param("id") id: string) {
    if (
      createUserDto.userRoles.includes("Admin") ||
      createUserDto.userRoles.includes("Manager")
    )
      throw new BadGatewayException("Rol invalido");
    return this.authService.resgisterManager(id, createUserDto);
  }

  @Post("login")
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
    @Cookies() cookies: any
  ) {
    const token = await this.authService.loginUser(loginUserDto);
    response.cookie(TOKEN_NAME, token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  }

  @Patch("/:email")
  updateUser(
    @Param("email") userEmail: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.authService.updateUser(userEmail, updateUserDto);
  }
}
