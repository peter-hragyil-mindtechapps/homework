import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { LinkScalar as Link } from '../../common/scalars/link.scalar';
import { ActorEntity } from '../../actors/entities/actor.entity';

@Entity('Movie')
@ObjectType('Movie')
export class MovieEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column()
  title: string;

  @Field(type => Link, { nullable: true })
  @Column({nullable: true})
  wikipediaLink: string;

  @Field(type => Link)
  @Column()
  imdbLink: string;

  @Field(type => [ActorEntity], { nullable: true })
  @ManyToMany(type => ActorEntity, { cascade: true })
  @JoinTable({
    joinColumn: {name: 'id'}
  })
  actors: ActorEntity[]

  @Field()
  @CreateDateColumn({ type: 'datetime' })
  cachedAt: Date;

}
