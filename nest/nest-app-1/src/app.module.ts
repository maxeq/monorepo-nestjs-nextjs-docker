import { JwtAuthGuard } from "@auth/guargs/jwt-auth.guard";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module.js";
import { PrismaModule } from "./prisma/prisma.module.js";
import { UserModule } from "./user/user.module.js";

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
