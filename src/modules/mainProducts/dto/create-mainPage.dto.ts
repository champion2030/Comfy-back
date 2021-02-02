import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateMainPageDto {
  @IsString()
  photo: string;
  @IsBoolean()
  bought: boolean;
  @IsString()
  title: string;
  @IsNumber()
  price: number;
  @IsObject()
  description: {
    ScreenDiagonal: string,
    ProcessorModel: string,
    AmountOfRAM: string,
    GraphicsCardModel: string,
    OperatingSystem: string
  };
}