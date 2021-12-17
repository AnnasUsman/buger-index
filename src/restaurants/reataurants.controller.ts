import { Controller, Post } from '@nestjs/common';
import { MapsService } from 'src/maps/maps.service';
import { ReviewsService } from 'src/reviews/reviews.service';
import { CreateRestaurantInput } from './dto/input/create-restaurant.input';
import { CreateReviewInput } from './dto/input/create-review.input';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantService: RestaurantsService,
    private readonly reviewService: ReviewsService,
    private readonly mapService: MapsService
  ) {}

  @Post()
  async updateDatabase() {
    let counter = 0
    try {
      let restaurants = require('/Users/anasusman/Desktop/burger-index/TripAdvisor_madrid_26_nov_2021.json');
      
      restaurants.forEach(async restaurant => {
        if (counter == 500) {
          return true;
        } else {
          counter++;
        }
        let lat = restaurant.location.lat;
        let lng = restaurant.location.lng;
        let storeID = restaurant.platformStoreId;
        let storeName = restaurant.platformStoreName;
        let placeID: string;

        let restaurantData = await this.mapService.getPlaceIDOfRestaurant(lat, lng, storeName);
        if (restaurantData.data['results'].length > 0) {
          placeID = restaurantData.data['results'][0].place_id;
        } else {
          placeID = 'no place ID';
        }

        if (placeID === 'no place ID') {
          console.log('no place ID found for ' + storeName + ' at address ' + restaurant.platformStoreAddress);
        } else {
          let restaurantDTO = new CreateRestaurantInput(placeID, storeID, storeName)
          await this.restaurantService.add(restaurantDTO);

          restaurant.reviews.forEach(async review => {
            let reviewDTO = new CreateReviewInput(
              review.reviewId, 
              storeID, 
              review.review, 
              review.reviewerFirstName, 
              review.createdAt
            )
            await this.reviewService.add(reviewDTO);
          });
        }
      });
      return Promise.resolve({
        statusCode: 201,
        message: 'Database updated'
      })
    } catch (error) {
      return Promise.reject({
        statusCode: 500,
        message: 'Database not updated'
      })
    }
  }
}