import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateMainPageDto {
  @IsString()
  photo: string
  @IsBoolean()
  bought: boolean
  @IsString()
  title: string
  @IsNumber()
  price: number
}