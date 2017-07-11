import {Traeger} from '../../../../../src/app/core/services/traeger.service';
import {UnitTestHelper} from '../../unit-test.helper';
const {generateRandomString} = UnitTestHelper;

export class TraegerServiceHelper {
  public static createFilledTraeger(id: string          = generateRandomString(),
                                    institution: string = generateRandomString()): Traeger {
    return {
      id,
      institution,
    };
  }
}
