import {Arg, Ctx, Query, Resolver} from 'type-graphql'
import {Restaurant} from "../../entity/restaurant/Restaurant";
import {Context} from "../../context";
import ImageApi from "../../api/image/ImageApi";
import {RestaurantDTO} from "../../entity/restaurant/RestaurantDTO";
import {RestaurantGetAllOptions} from "./types";


@Resolver(Restaurant)
export class RestaurantResolver {

  @Query(() => RestaurantDTO)
  async restaurants(
    @Ctx() ctx: Context,
    @Arg("paginationInput") { page, take, filterRestaurantsWithoutImages }: RestaurantGetAllOptions
  ) {
    const where = filterRestaurantsWithoutImages ? { images: { isEmpty: false  } } : {}
    const restaurants = await ctx.prisma.restaurant.findMany({
      include: { country: true },
      skip: page * take,
      take,
      where
    })
    const resolvedRestaurants = restaurants.map((restaurant: any) => ({
      ...restaurant,
      images: this.resolveRestaurantImages(restaurant),
      allowReview: restaurant.country.allowedReviews
    }))
    const total = await ctx.prisma.restaurant.count({ where })
    const pageCount = Math.ceil(total / take)

    return {
      restaurants: resolvedRestaurants,
      pagination: {
        total,
        pageCount,
        currentPage: page,
        hasNext: page < pageCount - 1,
      }
    }
  }

  //this has to be done like this because theres no endpoint to get images given a restaurant id
  //in that case, the ImageApi would have a GetByRestaurantId endpoint and we would just map the ids to the urls

  async resolveRestaurantImages (restaurant: any) {
    //this api call is cached so theres no problem on calling multiple times
    const images = await ImageApi.getAll()
    return images
      .filter(image => restaurant.images.some((img: string) => img === image.imageUuid))
      .map(image => image.url)
  }
}
