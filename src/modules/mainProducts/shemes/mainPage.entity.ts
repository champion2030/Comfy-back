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

  /*@ManyToOne(type => User, author => author.products)
  author:User

  @ManyToMany(type => User, {cascade: true})
  @JoinTable()
  upVotes: User[]

  @ManyToMany(type => User, {cascade:true})
  @JoinTable()
  downVotes: User[]*/
}