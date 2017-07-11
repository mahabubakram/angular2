import {Statistic} from '../../../../src/app/statistic/statistic-data-resolver.service';

export class StatisticComponentHelper {
  public static createEmptyStatistic(): Statistic {
    return {
      abStellen: [],
      abfragen: [],
      ergaenzende: [],
      outputFormats: [],
      searchScopes: [],
      traeger: [],
      reports: []
    };
  }
}
