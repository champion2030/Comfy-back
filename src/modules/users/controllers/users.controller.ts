import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UsePipes } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../shemes/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { DeleteResult } from 'typeorm';
import { LoginUserDto } from '../dto/login-user.dto';
import { ValidationPipe } from '../../mainProducts/exceptions/validation.pipe';

@Controller()
export class UsersController{
  constructor(private userService: UsersService) { }

  @Get('api/users')
  findAll() {
    return this.userService.findAll()
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() userDto : LoginUserDto){
    return this.userService.login(userDto)
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() userDto : CreateUserDto){
    return this.userService.register(userDto)
  }


  /*@Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User>{
    const user = new User()
    user.firstName = createUserDto.firstName
    user.lastName = createUserDto.lastName
    user.email = createUserDto.email
    user.password = createUserDto.password
    return this.userService.create(user)
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) : Promise<User>{
    const user = await this.userService.findById(id)
    if (user === undefined){
      throw new NotFoundException('Dont have such user')
    }
    return user
  }

  @Get(':email')
  async findOneByEmail(@Param('email') email: string) : Promise<User>{
    const user = await this.userService.findByEmail(email)
    if (user === undefined){
      throw new NotFoundException('Dont have such user')
    }
    return user
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number) : Promise<DeleteResult> {
    const user = await this.userService.findById(id)
    if (user === undefined){
      throw new NotFoundException('Dont have such user')
    }
    return this.userService.deleteOne(id)
  }

  @Put(':id')
  async updateOne(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User>{
    const user = await this.userService.findById(id)
    if (user === undefined){
      throw new NotFoundException('Dont have such user')
    }
    user.firstName = updateUserDto.firstName
    user.lastName = updateUserDto.lastName
    user.email = updateUserDto.email
    user.password = updateUserDto.password
    return this.userService.updateOne(id, user)
  }*/
}