import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class MangaUpdateDto {
  @IsOptional()
  @IsString()
  coverUrl: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  altNames: string[];

  @IsOptional()
  @IsString()
  artist: string;

  @IsOptional()
  @IsString()
  author: string;

  @IsOptional()
  @IsBoolean()
  isHentai: boolean;
}
