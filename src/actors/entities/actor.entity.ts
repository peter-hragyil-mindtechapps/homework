import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, Unique } from 'typeorm';

@Entity('Actor')
@ObjectType('Actor')
export class ActorEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @CreateDateColumn({ type: 'datetime' })
  cachedAt: Date;
}
