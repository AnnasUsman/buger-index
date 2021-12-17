import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MapsModule } from './maps/maps.module';
import { RestaurantsModule } from './restaurants/reataurants.module';
import { Restaurant } from './restaurants/restaurant.entity';
import { Review } from './reviews/review.entity';
import { GraphQLModule } from '@nestjs/graphql';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '!ltpf00T',
      database: 'burger',
      entities: [Restaurant, Review],
      synchronize: true,
    }),
    RestaurantsModule,
    MapsModule,
    SearchModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number(),
        NODE_ENV: Joi.string().required(),
        ELASTICSEARCH_NODE: Joi.string().required(),
        ELASTICSEARCH_INDEX: Joi.string().required(),
        ELASTICSEARCH_HOST: Joi.string().required()
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
