import {Abstelle} from '../../../../../src/app/core/services/ab-stelle.service';
import {UnitTestHelper} from '../../unit-test.helper';
const {generateRandomString} = UnitTestHelper;

export class AbStelleServiceHelper {
  public static createFilledAbStelle(id: string        = generateRandomString(),
                                     abprofile: string = generateRandomString()): Abstelle {
    return {
      id,
      abprofile,
    };
  }
}
