export class AllProductRo {
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
  viewPhotos: {
    photo1: string,
    photo2: string,
    photo3: string,
    photo4: string,
    photo5: string,
    photo6: string
  };
  upVotes?: number;
  downVotes?: number;
}