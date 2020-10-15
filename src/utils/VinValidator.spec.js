import { VinValidator } from './VinValidator';

describe('VinValidator', () => {
  it('should validate VIN', () => {
    const invalidVin = '1G1YY32G645114142';
    const expectedValue = true;
    const validator = new VinValidator(invalidVin);

    expect(validator.isValid).toEqual(expectedValue);
  });

  it('should handle invalid character I', () => {
    const invalidVin = '1I1YY32G645114142';
    const expectedValue = false;
    const validator = new VinValidator(invalidVin);

    expect(validator.isValid).toEqual(expectedValue);
  });

  it('should handle invalid character O', () => {
    const invalidVin = '1O1YY32G645114142';
    const expectedValue = false;
    const validator = new VinValidator(invalidVin);

    expect(validator.isValid).toEqual(expectedValue);
  });

  it('should handle invalid character Q', () => {
    const invalidVin = '1Q1YY32G645114142';
    const expectedValue = false;
    const validator = new VinValidator(invalidVin);

    expect(validator.isValid).toEqual(expectedValue);
  });

  it('should handle invalid 10th character I', () => {
    const invalidVin = '1G1YY32G6U5114142';
    const expectedValue = false;
    const validator = new VinValidator(invalidVin);

    expect(validator.isValid).toEqual(expectedValue);
  });

  it('should handle invalid character O', () => {
    const invalidVin = '1G1YY32G6Z5114142';
    const expectedValue = false;
    const validator = new VinValidator(invalidVin);

    expect(validator.isValid).toEqual(expectedValue);
  });

  it('should handle invalid character Q', () => {
    const invalidVin = '1G1YY32G605114142';
    const expectedValue = false;
    const validator = new VinValidator(invalidVin);

    expect(validator.isValid).toEqual(expectedValue);
  });

  it('should handle invalid invalid checksum', () => {
    const invalidVin = '1G1YY32G645114143';
    const expectedValue = false;
    const validator = new VinValidator(invalidVin);

    expect(validator.isValid).toEqual(expectedValue);
  });
});
