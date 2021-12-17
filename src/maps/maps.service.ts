import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MapsService {
  constructor(private httpService: HttpService) {}

  async getPlaceIDOfRestaurant(lat: string, lng: string, keyword: string): Promise<any> {
    let url = encodeURI('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ lat + ',' + lng + '&radius=100&type=restaurant&keyword=' + keyword + '&key=' + process.env.PlaceAPIKey);
    return await this.httpService.get(url).toPromise();
  }
}