import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'

@Entity()
export class User {

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(showToken: boolean = true) {
    const { id, created, firstName, lastName, email, userName, token } = this;
    const responseObject : any = { id, created, firstName, lastName, email, userName };
    if (showToken){
      responseObject.token = token
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