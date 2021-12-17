import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewInput } from 'src/restaurants/dto/input/create-review.input';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  findReviews(id: string): Promise<Review[]> {
    return this.reviewsRepository.find({ where: { storeID: id} });
  }
  
  async add(createReviewData: CreateReviewInput): Promise<void> {
    let review = await this.reviewsRepository.findOne(createReviewData.reviewID)
    if (review === undefined) {
      try{
        await this.reviewsRepository.save(createReviewData);
      } catch (error) {
        console.log('Error adding review: ' + error);
      }
    }
  }
}