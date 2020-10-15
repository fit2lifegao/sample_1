import * as utils from './utils';
import moment from 'moment-timezone';

describe('dedupeArray', () => {
  it('should remove duplicates from array', () => {
    const originalValue = [1, 1, 2, 2, 3, 3, 4, 4];
    const expectedValue = [1, 2, 3, 4];

    expect(utils.dedupeArray(originalValue)).toEqual(expectedValue);
  });

  it('should handle single words', () => {
    const originalValue = 'yo';
    const expectedValue = 'yo';

    expect(utils.camelCaseToSnakeCase(originalValue)).toEqual(expectedValue);
  });
});

describe('camelCaseToSnakeCase', () => {
  it('should convert a camelCase string to snake_case', () => {
    const originalValue = 'talkToMeGoose';
    const expectedValue = 'talk_to_me_goose';

    expect(utils.camelCaseToSnakeCase(originalValue)).toEqual(expectedValue);
  });

  it('should handle single words', () => {
    const originalValue = 'yo';
    const expectedValue = 'yo';

    expect(utils.camelCaseToSnakeCase(originalValue)).toEqual(expectedValue);
  });
});

describe('isObject', () => {
  it('should return true for oject', () => {
    const originalValue = {};
    const expectedValue = true;

    expect(utils.isObject(originalValue)).toEqual(expectedValue);
  });

  it('should consider and array to not be an object', () => {
    const originalValue = [123, 456];
    const expectedValue = false;

    expect(utils.isObject(originalValue)).toEqual(expectedValue);
  });

  it('should handle null', () => {
    const originalValue = null;
    const expectedValue = false;

    expect(utils.isObject(originalValue)).toEqual(expectedValue);
  });
});

describe('keysToSnakeCase', () => {
  it('should convert camelCase object keys to snake_case keys', () => {
    const originalValue = {
      talkToMeGoose: "What's up mav",
      allowedDealerIds: [123, 456],
    };
    const expectedValue = {
      talk_to_me_goose: "What's up mav",
      allowed_dealer_ids: [123, 456],
    };

    expect(utils.keysToSnakeCase(originalValue)).toEqual(expectedValue);
  });

  it('should convert nested objects', () => {
    const originalValue = {
      createdDate: {
        fromDate: 123,
        toDate: 321,
      },
    };
    const expectedValue = {
      created_date: {
        from_date: 123,
        to_date: 321,
      },
    };

    expect(utils.keysToSnakeCase(originalValue)).toEqual(expectedValue);
  });
});
