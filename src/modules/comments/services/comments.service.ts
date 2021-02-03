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
    @InjectRepository(MainPageEntity) private mainPageRepository: Repository<MainPageEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ) {
  }

  private toResponseObject(comment: CommentsEntity) {
    const responseObject: any = comment;
    if (comment.author) {
      responseObject.author = comment.author.toResponseObject(false);
    }
    return responseObject;
  }

  async showByProduct(id: number) {
    const product = await this.commentsRepository.find({
      where: { product: { id } },
      relations: ['author'],
    });
    return product.map(comment => this.toResponseObject(comment));
  }

  async showByUser(id: number) {
    const comments = await this.commentsRepository.find({
      where: { author: { id } },
      relations: ['author'],
    });
    return comments.map(comment => this.toResponseObject(comment));
  }

  async show(id: number) {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['author', 'product'],
    });
    return this.toResponseObject(comment);
  }

  async create(productId: number, userId: number, data: CreateCommentDto) {
    const product = await this.mainPageRepository.findOne({ where: { id: productId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const comment = await this.commentsRepository.create({ ...data, product, author: user });
    await this.commentsRepository.save(comment);
    return this.toResponseObject(comment);
  }

  async destroy(id: number, userId: number) {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['author', 'product'],
    });
    if (comment.author.id !== userId) {
      throw new HttpException('You do not own this comment', HttpStatus.UNAUTHORIZED);
    }
    await this.commentsRepository.remove(comment);
    return this.toResponseObject(comment);
  }
}
