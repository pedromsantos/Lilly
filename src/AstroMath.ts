export class Degrees {
  constructor(private degrees: number) {
    this.degrees = AstroMath.modulo(degrees, 360);
  }

  get value() {
    return this.degrees;
  }

  add(other: Degrees) {
    this.degrees = AstroMath.modulo(this.degrees + other.value, 360);
  }

  sub(other: Degrees) {
    this.degrees = AstroMath.modulo(this.degrees - other.value, 360);
  }

  toRadians() {
    return new Radians(this.degrees * (Math.PI / 180));
  }

  tooDegreesMinutesSeconds() {
    let degrees = Math.floor(this.degrees);
    const minfloat = (this.degrees - degrees) * 60;
    let minutes = Math.floor(minfloat);
    const secfloat = (minfloat - minutes) * 60;
    let seconds = Math.round(secfloat);

    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }

    if (minutes === 60) {
      degrees++;
      minutes = 0;
    }

    return {
      degrees,
      minutes,
      seconds,
    };
  }

  sin() {
    return Math.sin(new Degrees(this.degrees).toRadians().value);
  }

  cos() {
    return Math.cos(new Degrees(this.degrees).toRadians().value);
  }

  tan() {
    return Math.tan(new Degrees(this.degrees).toRadians().value);
  }
}

export class Radians {
  constructor(private readonly radians: number) {}

  toDegrees() {
    return new Degrees(this.radians * (180 / Math.PI));
  }

  get value() {
    return this.radians;
  }
}

export class AstroMath {
  isDegreeWithinCircleArc(arcLow: number, arcHigh: number, degree: number, edges = '[)') {
    const operators: { [key: string]: (a: number, b: number) => boolean } = {
      '[': (a, b) => a >= b,
      '(': (a, b) => a > b,
      ']': (a, b) => a <= b,
      ')': (a, b) => a < b,
    };

    const lowComparison = operators[edges[0] || '['];
    const highComparison = operators[edges[1] || '('];

    if (arcLow > arcHigh) {
      arcHigh += 360;

      if (degree < arcLow) {
        degree += 360;
      }
    }

    if (lowComparison && highComparison) {
      return lowComparison(degree, arcLow) && highComparison(degree, arcHigh);
    }

    return false;
  }

  getModuloDifference(point1: number, point2: number) {
    const high = Math.max(point1, point2);
    const low = Math.min(point1, point2);

    return Math.min(high - low, 360 + low - high);
  }

  static modulo(number: number, mod: number) {
    return ((number % mod) + mod) % mod;
  }
}
