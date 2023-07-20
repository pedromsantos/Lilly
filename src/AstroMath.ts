export class Degrees {
  constructor(private readonly degrees: number) {}

  toRadians() {
    return this.degrees * (Math.PI / 180);
  }
}

export class Radians {
  constructor(private readonly radians: number) {}

  toDegrees() {
    return this.radians * (180 / Math.PI);
  }
}

export class AstroMath {
  sinFromDegrees(degrees: number) {
    return Math.sin(new Degrees(degrees).toRadians());
  }

  cosFromDegrees(degrees: number) {
    return Math.cos(new Degrees(degrees).toRadians());
  }

  tanFromDegrees(degrees: number) {
    return Math.tan(new Degrees(degrees).toRadians());
  }

  decimalDegreesToDegreesMinutesSeconds(decimalDegrees: number) {
    let degrees = Math.floor(decimalDegrees);
    const minfloat = (decimalDegrees - degrees) * 60;
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

  modulo(number: number, mod: number) {
    ((number % mod) + mod) % mod;
  }
}
