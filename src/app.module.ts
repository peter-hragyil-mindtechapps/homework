import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScalar } from './common/scalars/date.scalar';
import { LinkScalar } from './common/scalars/link.scalar';
import { MovieModule } from './movies/movies.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
      debug: process.env.NODE_ENV === 'development',
    }),
    MovieModule,
  ],
  providers: [DateScalar, LinkScalar],
})
export class AppModule {}
