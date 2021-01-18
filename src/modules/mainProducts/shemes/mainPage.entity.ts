import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
}