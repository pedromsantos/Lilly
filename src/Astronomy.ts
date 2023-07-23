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

  private readonly invalidDate = 'Invalid date';

  constructor(private year: number, private month: Months, private day: Days) {
    this.validateYear();
    this.validateMonth();
  }

  public julianDay(): number {
    return (
      this.day +
      this.daysFromMarch1ToStartOfSpecifiedMonth() +
      this.julianDaysInYear() +
      this.leapYearAdjustment() -
      this.leapYearCenturyAdjustment() +
      this.leapYearQuadriCenturyAdjustment() -
      this.numberOfDaysFromJanuary_1_4713_BCEToDecember_30_1899 -
      0.5
    );
  }

  private validateYear() {
    if (!Number.isInteger(this.year)) {
      throw new Error(this.invalidDate);
    }

    if (this.year <= 0) {
      throw new Error(this.invalidDate);
    }
  }

  private validateMonth() {
    if (this.month === 2) {
      if (this.isLeap() && this.day > 29) throw new Error(this.invalidDate);
      if (!this.isLeap() && this.day > 28) throw new Error(this.invalidDate);
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

  private isLeap() {
    return (this.year & 3) == 0 && (this.year % 25 != 0 || (this.year & 15) == 0);
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

  private leapYearQuadriCenturyAdjustment(): number {
    return Math.floor(this.yearAdjustmentForJulian14MonthYear() / 400);
  }

  private yearAdjustmentForJulian14MonthYear(): number {
    const monthAdjustmentForJulian14MonthYear = Math.floor(
      (this.julianMonths - this.month) / this.gregorianMonths
    );
    return this.year + this.julianYearOffset - monthAdjustmentForJulian14MonthYear;
  }
}
