import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

   constructor(){
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),        
        secretOrKey: process.env.JWT,
        ignoreExpiration: false
    })
   }

   async validate( payload: any){

    return { 
            name: payload.name, 
            email: payload.email, 
            number: payload.number, 
            id: payload.id}
            
   }

}