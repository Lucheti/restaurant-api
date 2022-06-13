import {Field, ObjectType} from "type-graphql";
import {Country} from "../Country";

@ObjectType()
export class Restaurant {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [String])
  images: string[]

  @Field(() => Country)
  country: Country;

  @Field(() => Boolean)
  allowReview: boolean;
}
