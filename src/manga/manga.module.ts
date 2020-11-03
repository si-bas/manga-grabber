import { MangaService } from './services/manga.service';
import { MangaController } from './manga.controller';
import { HttpModule, Module } from '@nestjs/common';
import { GenreService } from './services/genre.service';
import { BrowserModule } from 'src/browser/browser.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreRepository } from './repositories/genre.repository';
import { MangaRepository } from './repositories/manga.repository';

@Module({
  imports: [
    BrowserModule,
    TypeOrmModule.forFeature([GenreRepository, MangaRepository]),
    HttpModule,
  ],
  controllers: [MangaController],
  providers: [MangaService, GenreService],
  exports: [GenreService, MangaService],
})
export class MangaModule {}
