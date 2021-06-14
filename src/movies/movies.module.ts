import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APIsModul } from '../apis/apis.module';
import { ActorsModule } from '../actors/actors.module';
import { MovieResolver } from './movie.resolver';
import { MoviesService } from './movies.service';
import { MovieRepository } from './repositories/movie.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieRepository]),
    ActorsModule,
    APIsModul,
  ],
  providers: [MovieResolver, MoviesService],
})
export class MovieModule {}
