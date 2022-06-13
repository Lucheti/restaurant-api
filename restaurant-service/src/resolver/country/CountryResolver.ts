import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import {Country} from "../../entity/Country";
import {Context} from "../../context";

@Resolver(Country)
export class CountryResolver {

  @Query(() => [Country])
  async countries(@Ctx() ctx: Context) {
    return await ctx.prisma.country.findMany();
  }

  @Mutation(() => Country)
  async setAllowReview(@Ctx() ctx: Context, @Arg("code") code: string, @Arg("allowed") allowed: boolean) {
    return await ctx.prisma.country.update({
      where: {
        code
      },
      data: {
        allowedReviews: allowed
      }
    });
  }
}
