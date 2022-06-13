import {Field, ObjectType} from "type-graphql";
import {Restaurant} from "./restaurant/Restaurant";


@ObjectType()
export class Country {
  @Field(() => String)
  id: string;

  @Field(() => String)
  code: string;

  @Field(() => [String])
  locales: string[];

  @Field(() => Boolean)
  allowedReviews: boolean;

  @Field(() => [Restaurant], { nullable: true })
  restaurants?: Restaurant[];
}
