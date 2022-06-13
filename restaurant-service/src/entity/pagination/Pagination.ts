import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class Pagination {
  @Field(() => Number)
  total: number;

  @Field(() => Number)
  pageCount: number;

  @Field(() => Number)
  currentPage: number

  @Field(() => Boolean)
  hasNext: boolean;
}
