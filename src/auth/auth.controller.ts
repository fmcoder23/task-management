import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponseSchemas } from './responses/auth.responses';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: 'Register' })
  @ApiResponse(AuthResponseSchemas.userRegistered)
  @ApiResponse(AuthResponseSchemas.emailConflict)
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post("login")
  @ApiOperation({ summary: 'Log in'})
  @ApiResponse(AuthResponseSchemas.userLogin)
  @ApiResponse(AuthResponseSchemas.unauthorized)
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
