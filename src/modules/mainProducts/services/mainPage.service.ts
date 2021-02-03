import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainPageEntity } from '../shemes/mainPage.entity';
import { CreateMainPageDto } from '../dto/create-mainPage.dto';
import { UpdateMainPageDto } from '../dto/update-mainPage.dto';
import { mainPageRO } from '../shemes/mainPage.ro';
import { UserEntity } from '../../users/shemes/user.entity';
import { Votes } from '../../auth/votes.enum';
import { CommentsEntity } from '../../comments/shemes/comments.entity';
import { ViewPageRo } from '../shemes/view-page.ro';
import { AllProductRo } from '../shemes/all-product.ro';
import { DescriptionProductRo } from '../shemes/description-product.ro';

@Injectable()
export class MainPageService {
  constructor(
    @InjectRepository(MainPageEntity) private mainPageRepository: Repository<MainPageEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(CommentsEntity) private commentsRepository: Repository<CommentsEntity>,
  ) {
  }

  private toResponseObject(product: MainPageEntity): mainPageRO {
    const responseObject: any = { ...product };
    if (responseObject.upVotes) {
      responseObject.upVotes = product.upVotes.length;
    }
    if (responseObject.downVotes) {
      responseObject.downVotes = product.downVotes.length;
    }
    return responseObject;
  }

  private toResponseObjectAllInformation(product: MainPageEntity): AllProductRo {
    const responseObject: any = { ...product };
    if (responseObject.upVotes) {
      responseObject.upVotes = product.upVotes.length;
    }
    if (responseObject.downVotes) {
      responseObject.downVotes = product.downVotes.length;
    }
    return responseObject;
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
  }

  async findAll(page: number = 1): Promise<mainPageRO[]> {
    const products = await this.mainPageRepository.find({
      relations: ['upVotes', 'downVotes', 'comments'],
      take: 15,
      skip: 15 * (page - 1),
    });
    return products.map(product => this.toResponseObject(product));
  }

  async create(createMainPageDto: CreateMainPageDto): Promise<mainPageRO> {
    const product = await this.mainPageRepository.create({ ...createMainPageDto });
    await this.mainPageRepository.save(product);
    return this.toResponseObject(product);
  }

  public async findById(id: number): Promise<mainPageRO> {
    const product = await this.mainPageRepository.findOne({
      where: { id },
      relations: ['upVotes', 'downVotes', 'comments'],
    });
    if (!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.toResponseObject(product);
  }

  public async findForView(id: number): Promise<ViewPageRo> {
    const product = await this.mainPageRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return {
      id: product.id,
      photo: product.photo,
      title: product.title,
      bought: product.bought,
      price: product.price
    }
  }

  public async findForAllProduct(id: number): Promise<AllProductRo> {
    const product = await this.mainPageRepository.findOne({
      where: { id },
      relations: ['upVotes', 'downVotes'],
    });
    if (!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.toResponseObjectAllInformation(product);
  }

  public async findProductDescription(id: number): Promise<DescriptionProductRo> {
    const product = await this.mainPageRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return {
      id: product.id,
      title: product.title,
      description: product.description
    }
  }


  public async updateOne(id: number, updateMainPageDto: Partial<UpdateMainPageDto>): Promise<mainPageRO> {
    let product = await this.mainPageRepository.findOne({ where: { id } });
    if (!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.mainPageRepository.update({ id }, updateMainPageDto);
    product = await this.mainPageRepository.findOne({ where: { id }, relations: ['comments'] });
    return this.toResponseObject(product);
  }


  public async deleteOne(id: number) {
    let product = await this.mainPageRepository.findOne({ where: { id }, relations: ['comments'] });
    if (!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    const comments = await this.commentsRepository.find({ where: { product: { id } }, relations: ['author'] });
    await this.commentsRepository.remove(comments);
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
    let product = await this.mainPageRepository.findOne({
      where: { id },
      relations: ['upVotes', 'downVotes', 'comments'],
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    product = await this.vote(product, user, Votes.UP);
    return this.toResponseObject(product);
  }

  async downVote(id: number, userId: number) {
    let product = await this.mainPageRepository.findOne({
      where: { id },
      relations: ['upVotes', 'downVotes', 'comments'],
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    product = await this.vote(product, user, Votes.DOWN);
    return this.toResponseObject(product);
  }

}
