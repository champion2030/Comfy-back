import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../shemes/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
/*
export class UsersService extends TypeOrmCrudService<User>{
  constructor(
    @InjectRepository(User) userRepository, private authService: AuthService) {
    super(userRepository)
  }
}*/

export class UsersService{
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async findAll(): Promise<User[]>{
    return this.userRepository.find()
  }

  public async findByEmail(userEmail: string) : Promise<User | null>{
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
  }

  public async register(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    let user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException(
        'User already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }
}
