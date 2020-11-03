import { Controller, Get } from '@nestjs/common';
import { GenreService } from './services/genre.service';
import { MangaService } from './services/manga.service';

@Controller('manga')
export class MangaController {
  constructor(
    private readonly genreService: GenreService,
    private readonly mangaService: MangaService,
  ) {}

  @Get('genre/sync')
  async genreSync(): Promise<any> {
    return this.genreService.sync();
  }

  @Get('follows/sync')
  async followsSync(): Promise<any> {
    return this.mangaService.followsSync();
  }
}
