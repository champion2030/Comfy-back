import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/shemes/user.entity';

@Entity('products')
export class MainPageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  photo: string;

  @Column()
  bought: boolean;

  @Column()
  title: string;

  @Column()
  price: number;

  @ManyToOne(type => UserEntity, author => author.products)
  author:UserEntity

  @ManyToMany(type => UserEntity, {cascade: true})
  @JoinTable()
  upVotes: UserEntity[]

  @ManyToMany(type => UserEntity, {cascade:true})
  @JoinTable()
  downVotes: UserEntity[]
}