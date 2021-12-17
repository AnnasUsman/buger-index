import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RestaurantModel {
  @Field()
  placeID: string;

	@Field()
  storeID: string;

	@Field()
  StoreName: string;

  constructor(placeID: string, storeID: string, StoreName: string) {
    this.placeID = placeID;
    this.storeID = storeID;
		this.StoreName = StoreName;
  }
}