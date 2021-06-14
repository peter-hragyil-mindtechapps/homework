import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode, GraphQLError } from 'graphql';

@Scalar('Link')
export class LinkScalar implements CustomScalar<string, string> {
  description = 'Link custom scalar type';

  constructor() {}

  parseValue(value: string): string {
    if (typeof value !== 'string') {
      throw new TypeError('Value is not string');
    }

    return value;
  }

  serialize(value: string): string {
    if (typeof value !== 'string') {
      throw new TypeError(`Value is not string: ${value}`);
    }

    return value;
  }

  parseLiteral(ast: ValueNode): string {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as link addresses but got a: ${ast.kind}`);
    }

    return ast.value;
  }
}
