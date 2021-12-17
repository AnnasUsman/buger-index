import { RestaurantsService } from './restaurants.service';
import { RestaurantModel } from './models/restaurant';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { GetRestaurantArgs } from './dto/args/get-restaurant.args';
import { ReviewModel } from 'src/reviews/models/review';
import { GetReviewsArgs } from './dto/args/get-reviews.args';


@Resolver(() => RestaurantModel)
export class RestaurantResolver {
	constructor(private readonly restaurantService: RestaurantsService) {}

	@Query(() => [RestaurantModel], {nullable: true})
	async getRestaurants(@Args() getRestaurantArgs: GetRestaurantArgs) {
    return this.restaurantService.getRestaurants(getRestaurantArgs);
	}

	@Query(() => [ReviewModel], {nullable: true})
	async getReviews(@Args() getReviewArgs: GetReviewsArgs) {
		return await this.restaurantService.getReviews(getReviewArgs);
	}
}