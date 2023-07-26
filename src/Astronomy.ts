import { Degrees, Radians } from './AstroMath';

export class Astronomy {
  private year: number;
  private month: number;
  private day: number;
  private hours: number;
  private julianDay: number;
  private longitude: Degrees;
  private latitude: Degrees;
  private localSiderealTime: Degrees;
  private midHeaven: Degrees;
  private ascendant: Degrees;

  private readonly obliquityEcliptic = new Degrees(23.4367);

  constructor(date: Date, longitude = new Degrees(0), latitude = new Degrees(0)) {
    this.hours = date.getUTCHours() + date.getUTCMinutes() / 60.0 + date.getUTCSeconds() / 3600.0;
    this.day = date.getUTCDate();
    this.month = date.getUTCMonth() + 1;
    this.year = date.getUTCFullYear();
    this.longitude = longitude;
    this.latitude = latitude;
    this.julianDay = this.calculateJulianDay();
    this.localSiderealTime = this.calculateLocalSiderealTime();
    this.midHeaven = this.calculateMidHeaven();
    this.ascendant = this.calculateAscendant();
  }

  public get MidHeaven() {
    return this.midHeaven;
  }

  public get Ascendant() {
    return this.ascendant;
  }

  public calculateJulianDay() {
    return (
      367.0 * this.year -
      Math.floor((7.0 * (this.year + Math.floor((this.month + 9.0) / 12.0))) / 4.0) +
      Math.floor((275.0 * this.month) / 9.0) +
      this.day +
      1721013.5 +
      this.hours / 24.0
    );
  }

  public calculateLocalSiderealTime() {
    const julianDaysJan1st2000 = 2451545.0;
    const degreesRotationInSiderealDay = 360.98564736629;
    const numberOfDaysInCentury = 36525;
    const meanSiderealTimeAtTheJ2000Epoch = 280.46061837;

    const julianDaysSince2000 = this.julianDay - julianDaysJan1st2000;
    const tFactor = julianDaysSince2000 / numberOfDaysInCentury;

    const localSideralTime =
      meanSiderealTimeAtTheJ2000Epoch +
      degreesRotationInSiderealDay * julianDaysSince2000 +
      0.000387933 * Math.pow(tFactor, 2) -
      Math.pow(tFactor, 3) / 38710000 +
      this.longitude.value;

    return new Degrees(localSideralTime);
  }

  public calculateMidHeaven() {
    const tanLST = this.localSiderealTime.tan();
    const cosOE = this.obliquityEcliptic.cos();
    const midheaven = new Radians(Math.atan(tanLST / cosOE)).toDegrees();
    const degrees180 = new Degrees(180);

    if (midheaven < new Degrees(0)) {
      midheaven.add(new Degrees(360));
    }

    if (midheaven > this.localSiderealTime) {
      midheaven.sub(degrees180);
    }

    if (midheaven < new Degrees(0)) {
      midheaven.add(degrees180);
    }

    if (midheaven < degrees180 && this.localSiderealTime >= degrees180) {
      midheaven.add(degrees180);
    }

    return midheaven;
  }

  public calculateAscendant() {
    const tanLatitudeDegrees = this.latitude.tan();

    const sinLST = this.localSiderealTime.sin();
    const cosLST = this.localSiderealTime.cos();
    const sinObliquity = this.obliquityEcliptic.sin();
    const cosObliquity = this.obliquityEcliptic.cos();

    const numerator = cosLST * (sinObliquity * tanLatitudeDegrees) + cosObliquity * sinLST;
    const denominator = cosLST * (sinObliquity * tanLatitudeDegrees) - cosObliquity * sinLST;
    const tangentAsc = numerator / denominator;
    const angleAsc = Math.atan(tangentAsc);

    const ascendant = new Radians(angleAsc).toDegrees();
    const degrees180 = new Degrees(180);

    if (denominator < 0) {
      ascendant.add(degrees180);
    } else {
      ascendant.add(new Degrees(360));
    }

    if (ascendant >= degrees180) {
      ascendant.sub(degrees180);
    } else {
      ascendant.add(degrees180);
    }

    return ascendant;
  }
}
