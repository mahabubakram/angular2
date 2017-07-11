import { browser, element, by, protractor } from 'protractor';
import {expect} from 'chai';

describe('Test for Statistic Page', function () {

  beforeEach(function () {
    browser.get('/statistic');
  });

  describe('should load the header dropdown component', () => {

    it('should load the traeger dropdown', shouldLoadTheTraegerDropdown);

    function shouldLoadTheTraegerDropdown() {
      let  traegerDropdown =  element.all(by.css('option[id="carrier-option"]'));
      expect(traegerDropdown.count()).to.eventually.gte(1);
    }

  });


});
