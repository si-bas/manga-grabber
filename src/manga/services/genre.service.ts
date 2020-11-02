import { Injectable } from '@nestjs/common';

@Injectable()
export class GenreService {
  /**
   * Scrap and sync genre
   */
  public async sync(): Promise<any> {
    console.log('ok');
  }
}
