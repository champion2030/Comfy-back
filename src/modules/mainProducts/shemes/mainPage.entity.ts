import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/shemes/user.entity';
import { CommentsEntity } from '../../comments/shemes/comments.entity';
import { ComputersCharacteristicsEntity } from '../../computersCharacteristics/shemes/computersCharacteristics.entity';

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

  @ManyToMany(type => UserEntity, {cascade: true})
  @JoinTable()
  upVotes: UserEntity[]

  @ManyToMany(type => UserEntity, {cascade:true})
  @JoinTable()
  downVotes: UserEntity[]

  @OneToMany(type => CommentsEntity, comment => comment.product, {cascade: true})
  comments: CommentsEntity[]

  @OneToMany(type => ComputersCharacteristicsEntity, characteristics => characteristics.product, {cascade: true})
  characteristics: ComputersCharacteristicsEntity[]
}