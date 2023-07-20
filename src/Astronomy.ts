export type Months = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Days =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

export class JulianDay {
  private readonly julianYearOffset = 4800;
  private readonly julianMonths = 14;
  private readonly gregorianMonths = 12;
  private readonly daysInYear = 365;
  private readonly daysFromMarchToJuly = 153;
  private readonly numberOfDaysFromJanuary_1_4713_BCEToDecember_30_1899 = 32045;

  constructor(private year: number, private month: Months, private day: Days) {
    this.validateArguments();
  }

  public julianDay(): number {
    return (
      this.day +
      this.daysFromMarch1ToStartOfSpecifiedMonth() +
      this.julianDaysInYear() +
      this.leapYearAdjustment() -
      this.leapYearCenturyAdjustment() +
      this.leapYearQuadricentennialAdjustment() -
      this.numberOfDaysFromJanuary_1_4713_BCEToDecember_30_1899 -
      0.5
    );
  }

  private validateArguments(): void {
    if (!Number.isInteger(this.year)) {
      throw new Error('Invalid year');
    }

    const isLeap = () => (this.year & 3) == 0 && (this.year % 25 != 0 || (this.year & 15) == 0);

    if (this.month === 2) {
      if (isLeap() && this.day > 29) throw new Error('Invalid day');
      if (!isLeap() && this.day > 28) throw new Error('Invalid day');
    }

    if (this.year <= 0) {
      throw new Error('Invalid year');
    }
  }

  private daysFromMarch1ToStartOfSpecifiedMonth(): number {
    const monthAdjustmentForJulian14MonthYear = Math.floor(
      (this.julianMonths - this.month) / this.gregorianMonths
    );
    return Math.floor(
      (this.daysFromMarchToJuly *
        (this.month + this.gregorianMonths * monthAdjustmentForJulian14MonthYear - 3) +
        2) /
        5
    );
  }

  private julianDaysInYear(): number {
    return this.daysInYear * this.yearAdjustmentForJulian14MonthYear();
  }

  private leapYearAdjustment(): number {
    return Math.floor(this.yearAdjustmentForJulian14MonthYear() / 4);
  }

  private leapYearCenturyAdjustment(): number {
    return Math.floor(this.yearAdjustmentForJulian14MonthYear() / 100);
  }

  private leapYearQuadricentennialAdjustment(): number {
    return Math.floor(this.yearAdjustmentForJulian14MonthYear() / 400);
  }

  private yearAdjustmentForJulian14MonthYear(): number {
    const monthAdjustmentForJulian14MonthYear = Math.floor(
      (this.julianMonths - this.month) / this.gregorianMonths
    );
    return this.year + this.julianYearOffset - monthAdjustmentForJulian14MonthYear;
  }
}
