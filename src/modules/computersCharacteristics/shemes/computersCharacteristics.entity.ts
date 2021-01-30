import {
  Column,
  Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { MainPageEntity } from '../../mainProducts/shemes/mainPage.entity';
import { UserEntity } from '../../users/shemes/user.entity';


@Entity('computersCharacteristics')
export class ComputersCharacteristicsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  ScreenDiagonal: string

  @Column('text')
  ProcessorModel : string

  @Column('text')
  AmountOfRAM : string

  @Column('text')
  GraphicsCardModel : string

  @Column('text')
  OperatingSystem: string

  @ManyToOne(type => MainPageEntity, product => product.characteristics)
  product: MainPageEntity
}