import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateUserDto {
  @ApiModelProperty()
  readonly id: number;
  @ApiModelProperty()
  readonly firstName: string
  @ApiModelProperty()
  readonly lastName: string
  @ApiModelProperty()
  readonly email: string
  @ApiModelProperty()
  readonly password: string
  @ApiModelProperty()
  readonly isActive?: boolean
}