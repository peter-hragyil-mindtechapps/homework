import { NotAcceptableException } from '@nestjs/common';
import { Query, Args, Resolver } from '@nestjs/graphql';
import { InfoDto } from './dto/info.dto';
import { MovieEntity as Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Resolver(of => Movie)
export class MovieResolver {
  constructor(
    private readonly movieService: MoviesService,
  ) {}

  @Query(returns => [Movie], {nullable: true})
  search(
    @Args({name: 'title', type: () => String, nullable: true}) title?: string,
    @Args({name: 'actor', type: () => String, nullable: true}) actor?: string
  ): Promise<any> {
    if(!title && !actor) throw new NotAcceptableException(`No actor or title!`)
    if(title && actor) throw new NotAcceptableException(`Do not use actor and title at the same time!`)
    
    if(title)
    return this.movieService.findMoviesByTitle(title);
    
    if(actor)
    return this.movieService.findMoviesByActor(actor);
  }

  @Query(returns => InfoDto, {nullable: true})
  async info(
    @Args({name: 'movieId', type: () => String}) id: string
  ): Promise<InfoDto | null> {
    return this.movieService.findLinksAndParagraphByMovieId(id);
  }
}
