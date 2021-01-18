import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UpdateMainPageDto {
  @ApiModelProperty()
  readonly id: number
  @ApiModelProperty()
  readonly photo: string
  @ApiModelProperty()
  readonly bought: boolean
  @ApiModelProperty()
  readonly title: string
  @ApiModelProperty()
  readonly price: number
}