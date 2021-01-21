import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../shemes/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { DeleteResult } from 'typeorm';

@Controller('users')
export class UsersController{
  constructor(private userService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User>{
    const user = new User()
    user.id = createUserDto.id
    user.firstName = createUserDto.firstName
    user.lastName = createUserDto.lastName
    user.email = createUserDto.email
    user.password = createUserDto.password
    user.isActive = createUserDto.isActive
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

  @Get()
  findAll(): Promise<User[]>{
    return this.userService.findAll()
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
    user.id = updateUserDto.id
    user.firstName = updateUserDto.firstName
    user.lastName = updateUserDto.lastName
    user.email = updateUserDto.email
    user.password = updateUserDto.password
    user.isActive = updateUserDto.isActive
    return this.userService.updateOne(id, user)
  }
}