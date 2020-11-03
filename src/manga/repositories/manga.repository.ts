import { EntityRepository, Repository } from 'typeorm';
import { MangaUpdateDto } from '../dto/manga-update.dto';
import { MangaEntity } from '../entities/manga.entity';

@EntityRepository(MangaEntity)
export class MangaRepository extends Repository<MangaEntity> {
  /**
   * Update or insert
   */
  public async upsert(
    mangaData: {
      id: number;
      title: string;
    },
    updateData?: MangaUpdateDto,
  ): Promise<MangaEntity> {
    const { id } = mangaData;

    let manga = await this.findOne({
      where: {
        mangaId: id,
      },
    });
    if (!manga) manga = new MangaEntity();

    delete manga.id;
    for (const key in mangaData) {
      manga[key] = mangaData[key];
    }
    manga.mangaId = id;

    if (updateData) {
      for (const key in updateData) {
        manga[key] = updateData[key];
      }
    }
    await this.save(manga);

    return manga;
  }
}
