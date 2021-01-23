import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/shemes/user.entity';

@Entity()
export class MainPage {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  photo: string;

  @ApiProperty()
  @Column()
  bought: boolean;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  price: number;

  @ManyToMany(type => User, {cascade: true})
  @JoinTable()
  upVotes: User[]

  @ManyToMany(type => User, {cascade:true})
  @JoinTable()
  downVotes: User[]
}