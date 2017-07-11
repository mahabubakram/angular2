import {Abfrage} from '../../../../../src/app/core/services/abfrage.service';
import {UnitTestHelper} from '../../unit-test.helper';
const {generateRandomString, generateRandomNumber} = UnitTestHelper;

export class AbfrageServiceHelper {
  public static createFilledAbfrage(display: string = generateRandomString(),
                                    id: string = generateRandomString(),
                                    value: number = generateRandomNumber()): Abfrage {
    return {
      id,
      value,
      display
    };
  }
}
