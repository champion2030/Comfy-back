import { Body, Controller, Delete, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '../../mainProducts/exceptions/validation.pipe';
import { ComputersCharacteristicsService } from '../services/computersCharacteristics.service';
import { CreateComputersCharacteristicsDto } from '../dto/create-computersCharacteristics.dto';

@Controller('api/computersCharacteristics')
export class ComputersCharacteristicsController {
  constructor(private computerCharacteristicsService: ComputersCharacteristicsService) {}

  @Get('product/:id')
  showComputersCharacteristicsByProductsId(@Param('id') productId: number) {
    return this.computerCharacteristicsService.showByProduct(productId);
  }

  @Post('product/:id')
  @UsePipes(new ValidationPipe())
  createComputerCharacteristics(@Param('id') product: number, @Body() computerCharacteristics: CreateComputersCharacteristicsDto) {
    return this.computerCharacteristicsService.create(product, computerCharacteristics);
  }

  @Delete(':id')
  destroyComputerCharacteristics(@Param('id') productsId: number) {
    return this.computerCharacteristicsService.destroy(productsId);
  }
}