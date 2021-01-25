import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../decorator/user.decorator';
import { LoginUserDto } from '../dto/login-user.dto';
import { ValidationPipe } from '../../mainProducts/exceptions/validation.pipe';
import { AuthGuard } from '../../auth/auth.guard';

@Controller()
export class UsersController{
  constructor(private userService: UsersService) { }

  @Get('api/users')
  @UseGuards(new AuthGuard())
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


  @Get('getUserByID/:id')
  findOneById(@Param('id') id: number) {
    return  this.userService.findById(id)
  }

  @Get('getUserByEmail/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email)
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.userService.deleteOne(id)
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateOne(@Param('id') id: number, @Body() updateUserDto: Partial<UpdateUserDto>) {
    return this.userService.updateOne(id, updateUserDto)
  }
}