import { ArgsType, Field } from "@nestjs/graphql";


@ArgsType()
export class GetReviewsArgs {
	@Field()
	storeID: string;
}