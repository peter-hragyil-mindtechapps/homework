import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorRepository } from './repositories/actor.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActorRepository]),
  ],
  providers: [],
})
export class ActorsModule {}
