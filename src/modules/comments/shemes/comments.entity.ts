import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/shemes/user.entity';
import { MainPageEntity } from '../../mainProducts/shemes/mainPage.entity';

@Entity('comments')
export class CommentsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  created: Date

  @Column('text')
  comment: string

  @ManyToOne(type => UserEntity)
  @JoinTable()
  author: UserEntity

  @ManyToOne(type => MainPageEntity, product => product.comments)
  product: MainPageEntity
}