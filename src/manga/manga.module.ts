import { MangaController } from './manga.controller';
import { Module } from '@nestjs/common';
import { GenreService } from './services/genre.service';
import { BrowserModule } from 'src/browser/browser.module';

@Module({
  imports: [BrowserModule],
  controllers: [MangaController],
  providers: [GenreService],
})
export class MangaModule {}
