export class JulianDay {
  private year: number;
  private month: number;
  private day: number;
  private hours: number;

  constructor(date: Date) {
    this.hours = date.getUTCHours() + date.getUTCMinutes() / 60.0 + date.getUTCSeconds() / 3600.0;
    this.day = date.getUTCDate();
    this.month = date.getUTCMonth() + 1;
    this.year = date.getUTCFullYear();
  }

  public calculate() {
    return (
      367.0 * this.year -
      Math.floor((7.0 * (this.year + Math.floor((this.month + 9.0) / 12.0))) / 4.0) +
      Math.floor((275.0 * this.month) / 9.0) +
      this.day +
      1721013.5 +
      this.hours / 24.0
    );
  }
}
