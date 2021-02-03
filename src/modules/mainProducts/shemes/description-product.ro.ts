export class DescriptionProductRo {
  id: number;
  title: string;
  description: {
    ScreenDiagonal: string,
    ProcessorModel: string,
    AmountOfRAM: string,
    GraphicsCardModel: string,
    OperatingSystem: string
  }
}