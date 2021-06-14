import { Field, ObjectType } from 'type-graphql';

@ObjectType('Info')
export class InfoDto {
  @Field(type => String, {nullable: true})
  wikipediaParagraph: string;

  @Field(type => String, {nullable: true})
  wikipediaLink: string;

  @Field(type => String)
  imdbLink: string;
}
