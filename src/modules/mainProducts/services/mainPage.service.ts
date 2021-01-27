import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainPageEntity } from '../shemes/mainPage.entity';
import { CreateMainPageDto } from '../dto/create-mainPage.dto';
import { UpdateMainPageDto } from '../dto/update-mainPage.dto';
import { mainPageRO } from '../shemes/mainPage.ro';
import { UserEntity } from '../../users/shemes/user.entity';
import { Votes } from '../../auth/votes.enum';

@Injectable()
export class MainPageService {
  constructor(
    @InjectRepository(MainPageEntity) private mainPageRepository: Repository<MainPageEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ) {
  }

  private toResponseObject(product: MainPageEntity): mainPageRO {
    const responseObject: any = { ...product, author: product.author.toResponseObject(false) };
    if (responseObject.upVotes) {
      responseObject.upVotes = product.upVotes.length;
    }
    if (responseObject.downVotes) {
      responseObject.downVotes = product.downVotes.length;
    }
    return responseObject;
  }

  private ensureOwnership(product: MainPageEntity, userId: number) {
    if (product.author.id !== userId) {
      throw new HttpException('Incorrect user', HttpStatus.UNAUTHORIZED);
    }
  }

  private async vote(product: MainPageEntity, user: UserEntity, vote: Votes) {
    const opposite = vote === Votes.UP ? Votes.DOWN : Votes.UP;
    if (
      product[opposite].filter(voter => voter.id === user.id).length > 0 ||
      product[vote].filter(voter => voter.id === user.id).length > 0
    ) {
      product[opposite] = product[opposite].filter(voter => voter.id !== user.id);
      product[vote] = product[vote].filter(voter => voter.id !== user.id);
      await this.mainPageRepository.save(product);
    } else if (product[vote].filter(voter => voter.id === user.id).length < 1) {
      product[vote].push(user);
      await this.mainPageRepository.save(product);
    } else {
      throw new HttpException('Unable to cast vote', HttpStatus.BAD_REQUEST);
    }
    return product;
  }s

  async findAll(): Promise<mainPageRO[]> {
    const products = await this.mainPageRepository.find({ relations: ['author', 'upVotes', 'downVotes', 'comments'] });
    return products.map(product => this.toResponseObject(product));
  }

  async create(userId: number, createMainPageDto: CreateMainPageDto): Promise<mainPageRO> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const product = await this.mainPageRepository.create({ ...createMainPageDto, author: user });
    await this.mainPageRepository.save(product);
    return this.toResponseObject(product);
  }

  public async findById(id: number): Promise<mainPageRO> {
    const product = await this.mainPageRepository.findOne({ where: { id }, relations: ['author', 'upVotes', 'downVotes', 'comments'] });
    if (!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.toResponseObject(product);
  }

  public async updateOne(id: number, userId: number, updateMainPageDto: Partial<UpdateMainPageDto>): Promise<mainPageRO> {
    let product = await this.mainPageRepository.findOne({ where: { id }, relations: ['author'] });
    if (!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(product, userId);
    await this.mainPageRepository.update({ id }, updateMainPageDto);
    product = await this.mainPageRepository.findOne({ where: { id }, relations: ['author', 'comments'] });
    return this.toResponseObject(product);
  }


  public async deleteOne(id: number, userId: number) {
    const product = await this.mainPageRepository.findOne({ where: { id }, relations: ['author', 'comments'] });
    if (!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(product, userId);
    await this.mainPageRepository.delete({ id });
    return this.toResponseObject(product);
  }


  async bookmark(id: number, userId: number) {
    const product = await this.mainPageRepository.findOne({ where: { id } });
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['bookmarks'] });
    if (user.bookmarks.filter(bookmark => bookmark.id === product.id).length < 1) {
      user.bookmarks.push(product);
      await this.userRepository.save(user);
    } else {
      throw new HttpException('Product already bookmarked', HttpStatus.BAD_REQUEST);
    }
    return user.toResponseObject();
  }

  async unBookmark(id: number, userId: number) {
    const product = await this.mainPageRepository.findOne({ where: { id } });
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['bookmarks'] });
    if (user.bookmarks.filter(bookmark => bookmark.id === product.id).length > 0) {
      user.bookmarks = user.bookmarks.filter(
        bookmark => bookmark.id !== product.id,
      );
      await this.userRepository.save(user);
    } else {
      throw new HttpException('Product already bookmarked', HttpStatus.BAD_REQUEST);
    }
    return user.toResponseObject();
  }

  async upvote(id: number, userId: number) {
    let product = await this.mainPageRepository.findOne({ where: { id }, relations: ['author','upVotes', 'downVotes', 'comments'] });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    product = await this.vote(product, user, Votes.UP);
    return this.toResponseObject(product);
  }

  async downVote(id: number, userId: number) {
    let product = await this.mainPageRepository.findOne({ where: { id }, relations: ['author', 'upVotes', 'downVotes', 'comments'] });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    product = await this.vote(product, user, Votes.DOWN);
    return this.toResponseObject(product);
  }

}
