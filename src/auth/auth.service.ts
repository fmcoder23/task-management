import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, compare } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService, private readonly prisma: PrismaService) { }
  async register({ fullname, email, password }: RegisterDto) {
    const findUser = await this.prisma.user.findUnique({ where: { email } });
    if (findUser) {
      throw new ConflictException("Email already exists");
    }
    const hashedPassword = await hash(password, 12);
    const user = await this.prisma.user.create({
      data: { fullname, email, password: hashedPassword },
    });
    const token = this.jwt.sign({ id: user.id });
    return { message: "User successfully registered", token, data: user }
  }

  async login({ email, password }: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException("Incorrect email or password");
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("Incorrect email or password");
    }
    const token = this.jwt.sign({ id: user.id });
    return { message: "User successfully logged in", token, data: user }
  }
}
