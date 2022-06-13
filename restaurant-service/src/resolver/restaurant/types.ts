import {Field, InputType} from "type-graphql";

@InputType()
export class RestaurantGetAllOptions {
  @Field(() => Number)
  page: number;

  @Field(() => Number)
  take: number;

  @Field(() => Boolean)
  filterRestaurantsWithoutImages: boolean;
}
