import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GenreEntity } from './genres.entity';

@Entity({
  name: 'mangas',
})
export class MangaEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'manga_id' })
  mangaId: number;

  @Column({ name: 'cover_url', nullable: true })
  coverUrl: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'alt_names', type: 'json', nullable: true })
  altNames: string[];

  @Column({ nullable: true })
  artist: string;

  @Column({ nullable: true })
  author: string;

  @Column({ name: 'is_hentai', default: false })
  isHentai: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany(type => GenreEntity, { cascade: true })
  @JoinTable({
    name: 'manga_genre',
    joinColumn: { name: 'manga_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'genre_id', referencedColumnName: 'id' },
  })
  genres: GenreEntity[];
}
