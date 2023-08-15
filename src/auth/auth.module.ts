import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport/dist";
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  imports: [ 
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }] ),

    PassportModule,

    JwtModule.register({
      secret: process.env.JWT,
      signOptions: { expiresIn: "2h"}
    }),

   
  
  ]
})
export class AuthModule {}
