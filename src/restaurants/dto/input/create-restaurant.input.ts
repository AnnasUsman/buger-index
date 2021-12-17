import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateRestaurantInput {
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