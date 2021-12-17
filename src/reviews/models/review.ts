import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ReviewModel {
  @Field()
  reviewID: string;

  @Field()
  storeID: string;

  @Field()
  review: string;

  @Field()
  reviewerName: string;

  @Field()
  date: string;

  constructor(reviewID: string, storeID: string, review: string, reviewerName: string, date: string) {
    this.reviewID = reviewID;
    this.storeID = storeID;
		this.review = review;
    this.reviewerName = reviewerName;
    this.date = date;
  }
}