import { Controller, Get } from '@nestjs/common';
import { GenreService } from './services/genre.service';

@Controller('manga')
export class MangaController {
  constructor(private readonly genreService: GenreService) {}

  @Get('genre/sync')
  async genreSync(): Promise<any> {
    return this.genreService.sync();
  }
}
