import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsPositive()
  @IsNotEmpty()
  idTo: number;

  @IsPositive()
  @IsNotEmpty()
  idFrom: number;
}
