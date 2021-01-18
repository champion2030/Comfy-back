import { ApiProperty } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UpdateUserDto{
  @ApiModelProperty()
  readonly id: number;
  @ApiProperty()
  readonly firstName: string
  @ApiProperty()
  readonly lastName: string
  @ApiProperty()
  readonly email: string
  @ApiProperty()
  readonly password: string
  @ApiProperty()
  readonly isActive?: boolean
}