import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsEntity } from '../shemes/comments.entity';
import { MainPageEntity } from '../../mainProducts/shemes/mainPage.entity';
import { UserEntity } from '../../users/shemes/user.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity) private commentsRepository: Repository<CommentsEntity>,
    @InjectRepository(CommentsEntity) private mainPageRepository: Repository<MainPageEntity>,
    @InjectRepository(CommentsEntity) private userRepository: Repository<UserEntity>,
  ) {}

  async showByProduct(id: number){
    const product = await this.mainPageRepository.findOne({
      where:{id},
      relations:['comments', 'comments.author', 'comments.product']
    })
    return product.comments
  }

  async showByUser(id: number){
    const comments = await this.commentsRepository.find({
      where:{author:{id}},
      relations:['author']
    })
    return comments
  }

  async show(id: number){
    return await this.commentsRepository.findOne({
      where: { id },
      relations: ['author', 'product']
    })
  }

  async create(productId: number, userId: number, comment: CreateCommentDto){
    const product = await this.mainPageRepository.findOne({where:{id: productId}})
    const user = await this.userRepository.findOne({where:{id:userId}})
    const data = await this.commentsRepository.create({
      ...comment, product, author: user
    })
    await this.commentsRepository.save(data)
    return data
  }

  async destroy(id: number, userId: number){
    const comment = await this.commentsRepository.findOne({
      where:{id},
      relations:['author', 'product']
    })
    if (comment.author.id !== userId){
      throw new HttpException('You do not own this comment', HttpStatus.UNAUTHORIZED)
    }
    await this.commentsRepository.remove(comment)
    return comment
  }
}
