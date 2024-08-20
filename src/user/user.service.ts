import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }
  async me(@Req() req) {
    const user = await this.prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return { message: "Success", data: user }
  }

  async update(@Req() req, { fullname, email, password, photo }: UpdateUserDto) {
    let hashedPassword;
    if (password) {
      hashedPassword = await hash(password, 12);
    }
    const user = await this.prisma.user.update({
      where: { id: req.user.id }, data: {
        fullname, email, password: hashedPassword, photo,
      }
    })
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return { message: "User updated successfully", data: user }
  }
}
