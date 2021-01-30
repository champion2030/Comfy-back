import { IsString } from 'class-validator';

export class CreateComputersCharacteristicsDto {
  @IsString()
  ScreenDiagonal: string
  @IsString()
  ProcessorModel : string
  @IsString()
  AmountOfRAM : string
  @IsString()
  GraphicsCardModel : string
  @IsString()
  OperatingSystem: string
}