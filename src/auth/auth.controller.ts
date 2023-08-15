import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';



@ApiTags('Users')
@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}



  @Post('create')
  @ApiResponse({ status: 201, description: 'user was created', type: User})
  @ApiResponse({ status: 400, description: 'Bad Request'})

  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }


  @Get('login')
  @ApiResponse({ status: 200, description: 'login successful ', type: User})
  @ApiResponse({ status: 400, description: 'UnAuthorized',})
 
  loginUser( @Body() loginUserDto: LoginUserDto){
    return this.authService.loginUser(loginUserDto)
  }


// Ruta protegida
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiResponse({ status: 200, description: 'successful', type: User})
  @ApiResponse({ status: 400, description: 'UnAuthorized',})
  @ApiResponse({ status: 400, description: 'Bad request'})
 
 
  getProfile(@Request() req){

    if (!req.user.active) {
      throw new UnauthorizedException(`User with email ${req.user.email} not found`)
    }

    return req.user
  }


  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {  
    return this.authService.deleteUser(id, UpdateUserDto)
  }







  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
