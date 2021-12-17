import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapsService } from 'src/maps/maps.service';
import { Review } from 'src/reviews/review.entity';
import { ReviewsService } from 'src/reviews/reviews.service';
import { SearchModule } from 'src/search/search.module';
import { SearchService } from 'src/search/search.service';
import { RestaurantsController } from './reataurants.controller';
import { Restaurant } from './restaurant.entity';
import { RestaurantResolver } from './restaurants.resolver';
import { RestaurantsService } from './restaurants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Review]), HttpModule, SearchModule],
  providers: [RestaurantResolver, RestaurantsService, MapsService, ReviewsService, SearchService, ConfigService],
  controllers: [RestaurantsController],
})
export class RestaurantsModule {}