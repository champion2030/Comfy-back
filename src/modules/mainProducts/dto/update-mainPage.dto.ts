import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateMainPageDto {
  id: number
  @IsString()
  photo: string
  @IsBoolean()
  bought: boolean
  @IsString()
  title: string
  @IsNumber()
  price: number
}