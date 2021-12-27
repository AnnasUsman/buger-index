import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(
		private readonly esService: ElasticsearchService, 
		private readonly configService: ConfigService
	) { }
  public async createIndex() {
    const index = this.configService.get('ELASTICSEARCH_INDEX');
    const checkIndex = await this.esService.indices.exists({ index });
    if (checkIndex.statusCode === 404) {
      this.esService.indices.create(
        {
          index,
          body: {
						mappings: {
              properties: {
                placeID: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256,
                    },
                  },
                },
                storeID: {
                  type: 'text',
									fields: {
										keyword: {
											type: 'keyword',
											ignore_above: 256,
										},
									},
                },
                StoreName: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256,
                    },
                  },
                },
              },
            },
            settings: {
              analysis: {
                filter: {
                  autocomplete_filter: {
                    type: 'edge_ngram',
                    min_gram: 1,
                    max_gram: 20,
                  },
                },
                analyzer: {
                  autocomplete: {
                    type: 'custom',
                    tokenizer: 'standard',
                    filter: ['lowercase', 'autocomplete_filter'],
                  },
                },
              },
            },
					},
        },
        (err: any) => {
          if (err) {
            console.log(err);
          }
        },
      );
    }
  }

  async indexRestaurant(restaurant: any) {
    return await this.esService.index({
      index: this.configService.get('ELASTICSEARCH_INDEX')!,
      body: restaurant,
    });
  }

  async search(restaurantName: string) {
    const {body} = await this.esService.search<any>({
      index: this.configService.get('ELASTICSEARCH_INDEX'),
      body: {
        query : {
          bool: {
            should: [
              {
                function_score: {
                  query: {
                    query_string : {
                      query : '*' + restaurantName + '*',
                      fields : ['StoreName']
                    },
                  },
                  boost: 10
                }
              },
              {
                function_score: {
                  query: {
                    multi_match: {
                      query: restaurantName,
                      fields: ['StoreName'],
                      fuzziness: 1,
                      operator: 'and'
                    }
                  },
                  boost: 1
                }
              }
            ]
          }
        }
      }
    });
    const hits = body.hits.hits;
    return hits.map((item: any) => item._source);
  }
}