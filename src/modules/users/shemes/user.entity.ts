import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'
import { MainPageEntity } from '../../mainProducts/shemes/mainPage.entity';
import { UserRO } from './users.ro';

@Entity('user')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column({unique:true})
  email: string;

  @Column({type : 'text', unique : true})
  userName: string;

  @Column('text')
  password: string;

  @ManyToMany(type => MainPageEntity, {cascade: true})
  @JoinTable()
  bookmarks: MainPageEntity[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(showToken: boolean = true): UserRO {
    const { id, created, firstName, lastName, email, userName, token } = this;
    const responseObject : any = { id, created, firstName, lastName, email, userName };
    if (showToken){
      responseObject.token = token
    }
    if (this.bookmarks){
      responseObject.bookmark = this.bookmarks
    }
    return responseObject
  }

  private get token(){
    const {id, firstName, lastName, email, userName} = this
    return jwt.sign(
      {
        id,
        firstName,
        lastName,
        email,
        userName
      },
      process.env.SECRET,
      {expiresIn: '7d'},
    );
  }

}