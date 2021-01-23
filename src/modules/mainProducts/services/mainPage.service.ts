import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainPage } from '../shemes/mainPage.entity';
import { CreateMainPageDto } from '../dto/create-mainPage.dto';
import { UpdateMainPageDto } from '../dto/update-mainPage.dto';
import { mainPageRO } from '../shemes/mainPage.ro';
import { User } from '../../users/shemes/user.entity';
import { Votes } from '../../auth/votes.enum';

@Injectable()
export class MainPageService {
  constructor(
    @InjectRepository(MainPage) private mainPageRepository: Repository<MainPage>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
  }

  public async findAll() {
    const products = await this.mainPageRepository.find({
      relations: ['upVotes', 'downVotes'],
    });
    return products.map(product => this.toResponseObject(product));
  }

  public async create(createMainPageDto: CreateMainPageDto) {
    return await this.mainPageRepository.save(createMainPageDto);
  }

  public async findById(id: number) {
    const product = await this.mainPageRepository.findOne({ where: { id }, relations:['upVotes, downVotes'] });
    if (!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  public async updateOne(id: number, updateMainPageDto: Partial<UpdateMainPageDto>) {
    let product = await this.mainPageRepository.findOne({ where: { id } });
    if (!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.mainPageRepository.update({ id }, updateMainPageDto);
    product = await this.mainPageRepository.findOne({ where: { id } });
    return product;
  }

  public async deleteOne(id: number) {
    const product = await this.mainPageRepository.findOne({ where: { id } });
    if (!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.mainPageRepository.delete({ id });
    return product;
  }

  private toResponseObject(product: MainPage): mainPageRO {
    const responseObject: any = { ...product };
    if (responseObject.upVotes) {
      responseObject.upVotes = product.upVotes.length;
    }
    if (responseObject.downVotes) {
      responseObject.downVotes = product.downVotes.length;
    }
    return responseObject;
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
    if (user.bookmarks.filter(bookmark => bookmark.id === product.id).length < 1) {
      user.bookmarks = user.bookmarks.filter(
        bookmark => bookmark.id !== product.id,
      );
      await this.userRepository.save(user);
    } else {
      throw new HttpException('Product already bookmarked', HttpStatus.BAD_REQUEST);
    }
    return user.toResponseObject();
  }

  private async vote(product: MainPage, user: User, vote: Votes) {
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
  }

  async upvote(id: number, userId: number) {
    let product = await this.mainPageRepository.findOne({ where: { id }, relations: ['upVotes', 'downVotes'] });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    product = await this.vote(product, user, Votes.UP);
    return product;
  }

  async downVote(id: number, userId: number) {
    let product = await this.mainPageRepository.findOne({ where: { id }, relations: ['upVotes', 'downVotes'] });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    product = await this.vote(product, user, Votes.DOWN);
    return product;
  }

}
