import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../shemes/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserRO } from '../shemes/users.ro';

@Injectable()
export class UsersService{
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(page: number = 1):Promise<UserRO[]> {
    const users = await this.userRepository.find({relations:['bookmarks'],
    take: 15,
    skip: 15 * (page-1)
    })
    return users.map(user => user.toResponseObject(false))
  }

  async login(data : LoginUserDto): Promise<UserRO> {
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

  public async findById(id: number) {
    const user = await this.userRepository.findOne({where:{id}})
    if (!user){
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    return user
  }

  public async findByEmail(email: string) {
    const user = await this.userRepository.findOne({where:{email}})
    if (!user){
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    return user
  }

  public async deleteOne(id: number) {
    const user = await this.userRepository.findOne({where:{id}})
    if (!user){
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    await this.userRepository.delete({id})
    return user
  }

  public async updateOne(id: number, updateUserDto: Partial<UpdateUserDto>){
    let user = await this.userRepository.findOne({where:{id}})
    if (!user.id){
      throw new HttpException("Not found", HttpStatus.NOT_FOUND)
    }
    await this.userRepository.update({id}, updateUserDto)
    user = await this.userRepository.findOne({where:{id}})
    return user
  }

}
