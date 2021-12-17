import { ArgsType, Field } from "@nestjs/graphql";


@ArgsType()
export class GetRestaurantArgs {
	@Field()
	StoreName: string;
}