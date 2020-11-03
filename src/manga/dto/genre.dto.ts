import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GenreDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  title: string;
}
