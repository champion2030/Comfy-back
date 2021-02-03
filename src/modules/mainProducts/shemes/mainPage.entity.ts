import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/shemes/user.entity';
import { CommentsEntity } from '../../comments/shemes/comments.entity';

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

  @Column('simple-json')
  description: {
    ScreenDiagonal: string,
    ProcessorModel: string,
    AmountOfRAM: string,
    GraphicsCardModel: string,
    OperatingSystem: string
  };

  @Column('simple-json')
  viewPhotos: {
    photo1: string,
    photo2: string,
    photo3: string,
    photo4: string,
    photo5: string,
    photo6: string
  };

  @ManyToMany(type => UserEntity, { cascade: true })
  @JoinTable()
  upVotes: UserEntity[];

  @ManyToMany(type => UserEntity, { cascade: true })
  @JoinTable()
  downVotes: UserEntity[];

  @OneToMany(type => CommentsEntity, comment => comment.product, { cascade: true })
  comments: CommentsEntity[];
}