const POSITIONAL_WEIGHTS = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

const LETTER_KEY = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  P: 7,
  R: 9,
  S: 2,
  T: 3,
  U: 4,
  V: 5,
  W: 6,
  X: 7,
  Y: 8,
  Z: 9,
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
};

export class VinValidator {
  constructor(vin) {
    this.vin = vin.toUpperCase();
    this.error = undefined;
    this.isValid = this.validate();
  }

  validate() {
    // Validate length
    if (this.vin.length !== 17) {
      this.error = 'Invalid VIN, must be 17 characters long.';
      return false;
    }

    // Check existence of illegal characters
    if (
      this.vin.includes('I') ||
      this.vin.includes('O') ||
      this.vin.includes('Q')
    ) {
      this.error = 'Invalid VIN, cannot contain "I", "O", or "Q".';
      return false;
    }

    // Check for Illegal 10th position
    if (this.vin[9] === 'U' || this.vin[9] === 'Z' || this.vin[9] === '0') {
      this.error =
        'Invalid VIN, cannot contain "U", "Z", or "0" in position 10.';
      return false;
    }

    // Calculate checksum
    let checksum = 0;
    for (let i = 0; i < 17; i += 1) {
      const currentValue = LETTER_KEY[this.vin[i]];
      const positionalWeight = POSITIONAL_WEIGHTS[i];
      checksum += currentValue * positionalWeight;
    }

    // Calculate check digit
    let calcCheckDigit = checksum % 11;
    if (calcCheckDigit === 10) {
      calcCheckDigit = 'X';
    }

    // Compare check digit to calculation
    const checkDigit = this.vin[8];
    if (checkDigit !== String(calcCheckDigit)) {
      this.error = 'Invalid VIN, checksum failed.';
      return false;
    }

    return true;
  }
}
