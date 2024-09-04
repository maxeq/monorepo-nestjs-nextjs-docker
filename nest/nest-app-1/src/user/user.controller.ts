import { JwtPayload } from "@auth/interfaces";
import { CurrentUser } from "@common/decorators";
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  UnauthorizedException,
  UseInterceptors,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { UserResponse } from "./responses";
import { UserService } from "./user.service";
import { compareSync } from "bcryptjs";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(":idOrEmail")
  async findOneUser(@Param("idOrEmail") idOrEmail: string) {
    const user = await this.userService.findOne(idOrEmail);
    return new UserResponse(user);
  }

  @Delete(":id")
  async deleteUser(
    @Param("id", ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.userService.delete(id, user);
  }

  @Get()
  me(@CurrentUser() user: JwtPayload) {
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put()
  async updateUser(@Body() body: Partial<User>) {
    const user = await this.userService.save(body);
    return new UserResponse(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put("change-password")
  async changePassword(
    @Body() body: { currentPassword: string; newPassword: string },
    @CurrentUser() currentUser: JwtPayload, // Извлечение текущего пользователя из JWT
  ) {
    // Извлекаем пользователя из базы данных по его ID из JWT
    const user = await this.userService.findOne(currentUser.id);

    // Проверяем, что текущий пароль совпадает с тем, что хранится в базе
    if (!compareSync(body.currentPassword, user.password)) {
      throw new UnauthorizedException("Current password is incorrect");
    }

    // Обновляем пароль пользователя в базе данных
    user.password = body.newPassword;

    // Сохраняем изменения в базе данных
    const updatedUser = await this.userService.save(user);

    // Возвращаем обновлённого пользователя
    return new UserResponse(updatedUser);
  }
}
