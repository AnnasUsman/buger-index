import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewModel } from 'src/reviews/models/review';
import { ReviewsService } from 'src/reviews/reviews.service';
import { SearchService } from 'src/search/search.service';
import { Repository } from 'typeorm';
import { GetRestaurantArgs } from './dto/args/get-restaurant.args';
import { GetReviewsArgs } from './dto/args/get-reviews.args';
import { CreateRestaurantInput } from './dto/input/create-restaurant.input';
import { RestaurantModel } from './models/restaurant';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,
    private readonly searchService: SearchService,
    private readonly reviewService: ReviewsService,
  ) {}

	async add(createRestaurantData: CreateRestaurantInput): Promise<void> {
    let restaurant = await this.restaurantsRepository.findOne(createRestaurantData.placeID)
    if (restaurant === undefined) {
      try{
        let restaurant = await this.restaurantsRepository.save(createRestaurantData);
        await this.searchService.indexRestaurant(restaurant);
      } catch (error) {
        console.log('Error adding restaurant: ' + error);
      }
    }
  }

  async getRestaurants(getRestaurantArgs: GetRestaurantArgs) {
    let restaurantModelList = [];
    let restaurants = await this.searchService.search(getRestaurantArgs.StoreName);
    restaurants.forEach(restaurant => {
      restaurantModelList.push(new RestaurantModel(restaurant.placeID, restaurant.storeID, restaurant.StoreName));
    });
    return restaurantModelList;
  }

  async getReviews(getReviewArgs: GetReviewsArgs) {
    let reviewModelList = [];
    let reviews = await this.reviewService.findReviews(getReviewArgs.storeID);
    reviews.forEach(review => {
      reviewModelList.push(new ReviewModel(review.reviewID, review.storeID, review.review, review.reviewerName, review.date));
    });
    reviewModelList.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
    return reviewModelList.slice(0, 20);
  }
}