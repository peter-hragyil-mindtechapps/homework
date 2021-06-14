import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { ActorEntity } from '../entities/actor.entity';

@EntityRepository(ActorEntity)
export class ActorRepository extends Repository<ActorEntity> {}
