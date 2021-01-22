import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto{
  @IsNotEmpty()
  readonly firstName: string
  @IsNotEmpty()
  readonly lastName: string
  @IsNotEmpty()
  readonly email: string
  @IsNotEmpty()
  readonly userName: string
  @IsNotEmpty()
  readonly password: string
}