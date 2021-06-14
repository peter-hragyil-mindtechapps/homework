import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { MovieEntity } from '../entities/movie.entity';

@EntityRepository(MovieEntity)
export class MovieRepository extends Repository<MovieEntity> {
  private createSearchText(something: string) {
    return `%${something}%`;
  }

  searchMoviesByActor(actor: string) {
    return this.createQueryBuilder('movie')
    .leftJoinAndSelect('movie.actors', 'actors')
    .where(
      'actors.name like :name',
      {
        name: this.createSearchText(actor)
      }
    )
    .getMany();
  }

  searchMoviesByTitle(title: string) {
    return this.createQueryBuilder('movie')
    .leftJoinAndSelect('movie.actors', 'actors')
    .where(
      'movie.title like :title',
      {
        title: this.createSearchText(title)
      }
    )
    .getMany();
  }
}
