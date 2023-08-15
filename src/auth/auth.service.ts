import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose"
import * as bcrypt from "bcrypt";
import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common/exceptions";
import { LoginUser } from './dto/user.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name )
      private readonly userModel: Model<User>,
      private readonly jwt: JwtService
  
  ){}


  async create(createUserDto: CreateUserDto) {

    createUserDto.name = createUserDto.name.toLowerCase();
    createUserDto.email = createUserDto.email.toLowerCase();
    createUserDto.surname = createUserDto.surname.toLowerCase();
    
    // Desestructurando el Body (createUserDto)
    const {password,  ...userData} = createUserDto

      try {       

        // Preparando el Uduario a guardar y encriptando contraseña
        const user = await this.userModel.create( {password : bcrypt.hashSync(password, 10), ...userData} )

        // Guardando en DDBB usuario
        await user.save()
       
        return  userData

      } catch (error) {

        throw new BadRequestException(error.message)

      }

  }


  async loginUser ( loginUserDto: LoginUserDto ){

    const {password, email} = loginUserDto

    try {
      const user = await this.userModel.findOne({email})
      
      if (user === null || user.active === false) {
        throw new UnauthorizedException(` ${email} | credenciales no validas`) 
     }
      
    // comparando la password encriptada con la ingresada  
      const checkpassword = bcrypt.compareSync(password, user.password)
      
      if (!checkpassword) {
        throw new UnauthorizedException(` PASSWORD | credenciales no validas`)        
      }

      // Controlando los datos del usuario que me interesan devolver
      const  payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        number: user.number,
        
      }      
      // si todo sale bien : creando JWT
      const jwt = await this.jwt.signAsync(payload, {secret: process.env.JWT} )

      return { payload, jwt }
      
    } catch (error) {
          
      throw new UnauthorizedException(error.message)
      
    }


    
  }


  async update(id: string, updateUserDto: UpdateUserDto) {

    try {
      const newUser = await this.userModel.findOneAndUpdate({_id : id }, updateUserDto, )

      if (newUser === null || !newUser) {
        throw new NotFoundException(`No se consigio el id: ${id}`)        
      }         
      
      const newUserData = {
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
        number: newUser.number
      }
      
      return newUserData;
      
    } catch (error) {
      if (error.kind === "ObjectId" ) {
        throw new BadRequestException(' No es un  Mongo Id')
      }

      return error
     
    }

  }

 
  async deleteUser(id: string, updateUserDto: UpdateUserDto){

    try {
      const deleteUser = await this.userModel.findOneAndUpdate({_id : id }, {active: false}, )

          const response = {success: true,
                            msg: `User with id ${id} deleted successfully`}  
      return response;
      
    } catch (error) {
      throw new UnauthorizedException(error.message)
     
     
    }

  



  }






  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }


  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
