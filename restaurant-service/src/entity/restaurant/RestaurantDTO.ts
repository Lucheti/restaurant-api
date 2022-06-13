import {Field, ObjectType} from "type-graphql";
import {Restaurant} from "./Restaurant";
import {Pagination} from "../pagination/Pagination";

@ObjectType()
export class RestaurantDTO {
  @Field(() => [Restaurant])
  restaurants: Restaurant[];

  @Field(() => Pagination)
  pagination: Pagination;
}
