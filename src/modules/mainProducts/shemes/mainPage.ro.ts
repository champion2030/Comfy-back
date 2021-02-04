export class MainPageRO {
  id: number;
  photo: string;
  bought: boolean;
  title: string;
  price: number;
  description: {
    ScreenDiagonal: string,
    ProcessorModel: string,
    AmountOfRAM: string,
    GraphicsCardModel: string,
    OperatingSystem: string
  };
  upVotes?: number;
  downVotes?: number;
}