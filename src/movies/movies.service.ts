import { Injectable } from '@nestjs/common';
import { IMDBService } from '../apis/imdb.service';
import { WikipediaService } from '../apis/wikipedia.service';
import { InfoDto } from './dto/info.dto';
import { MovieRepository } from './repositories/movie.repository';

@Injectable()
export class MoviesService {
  
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly wikipediaService: WikipediaService,
    private readonly imdbService: IMDBService,
  ) {}

  private async cacheMoviesByTitle(title: string) {
    const res = await this.imdbService.search(title);
    const movies = res.d.filter(({id}) => this.imdbService.isMovieId(id));
    return Promise.all(
      movies.map(
        async ({l, id, s}) => 
        await this.movieRepository.save({
          title: l,
          imdbLink: this.imdbService.createLinkById(id),
          wikipediaLink: (await this.wikipediaService.search(l))[3][0],
          actors: [
            ...this.imdbService.getMainActorsBySProp(s)
            .map(name => ({name}))
          ]
        })
      )
    )
  }

  findMoviesByActor(actor: string) {
    return this.movieRepository.searchMoviesByActor(actor);
  }

  async findMoviesByTitle(title: string) {
    const movies = await this.movieRepository.searchMoviesByTitle(title);
    if(movies.length === 0) return await this.cacheMoviesByTitle(title);
    return movies;
  }

  async findLinksAndParagraphByMovieId(id: string): Promise<InfoDto | null> {
    const movie = await this.movieRepository.findOne(id);
    return movie ? {
      imdbLink: movie.imdbLink,
      wikipediaLink: movie.wikipediaLink,
      wikipediaParagraph: movie.wikipediaLink 
        ? await this.wikipediaService.getFirstParagraphByLink(movie.wikipediaLink) 
        : null
    } as InfoDto : null;
  }
}
