import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../shemes/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserRO } from '../shemes/users.ro';

@Injectable()
export class UsersService{
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll() : Promise<UserRO[]>{
    const users = await this.userRepository.find()
    return users.map(user => user.toResponseObject(false))
  }

  async login(data : LoginUserDto) : Promise<UserRO>{
    const {userName, password} = data
    const user = await this.userRepository.findOne({where:{userName}})
    if(!user || !(await user.comparePassword(password))){
      throw new HttpException('Invalid userName/password', HttpStatus.BAD_REQUEST)
    }
    return user.toResponseObject()
  }

  public async register(createUserDto: CreateUserDto) : Promise<UserRO> {
    const { userName } = createUserDto;
    let user = await this.userRepository.findOne({ where: { userName } });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST,);
    }
    user = await this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user.toResponseObject()
  }

  /*public async findByEmail(userEmail: string) : Promise<User | null>{
    return await this.userRepository.findOne({email:userEmail})
  }

  public async findById(id: number): Promise<User | null>{
    return await this.userRepository.findOneOrFail(id)
  }

  public async create(createUserDto: CreateUserDto): Promise<User>{
    return await this.userRepository.save(createUserDto)
  }

  public async deleteOne(id: number): Promise<DeleteResult>{
    return await this.userRepository.delete(id)
  }

  public async updateOne(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.userRepository.findOneOrFail(id)
    if (!user.id){
      throw new NotFoundException("Don't have such user")
    }
    await this.userRepository.update(id, updateUserDto)
    return this.userRepository.findOne(id)
  }*/

}
