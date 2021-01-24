import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateMainPageDto {
  @IsString()
  photo: string
  @IsBoolean()
  bought: boolean
  @IsString()
  title: string
  @IsNumber()
  price: number
}