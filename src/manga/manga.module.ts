import { MangaController } from './manga.controller';
import { Module } from '@nestjs/common';
import { GenreService } from './services/genre.service';

@Module({
  imports: [],
  controllers: [MangaController],
  providers: [GenreService],
})
export class MangaModule {}
