import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRoot('mongodb://localhost:27017/mongodb_Nest'),

    AuthModule,    
   
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
