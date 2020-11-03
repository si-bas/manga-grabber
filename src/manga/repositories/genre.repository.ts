import { EntityRepository, Repository } from 'typeorm';
import { GenreDto } from '../dto/genre.dto';
import { GenreEntity } from '../entities/genre.entity';

@EntityRepository(GenreEntity)
export class GenreRepository extends Repository<GenreEntity> {
  /**
   * Update or insert
   */
  public async upsert(genreData: GenreDto): Promise<GenreEntity> {
    const { id } = genreData;

    let genre = await this.findOne({
      id,
    });
    if (!genre) genre = new GenreEntity();

    for (const key in genreData) {
      genre[key] = genreData[key];
    }
    this.save(genre);

    return genre;
  }
}
