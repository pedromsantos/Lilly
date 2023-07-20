import { Days, JulianDay, Months } from '../Astronomy';

// const error = 'Invalid input for calendar date or universal time.';

describe('JulianDate', () => {
  const testCases: [number, Months, Days, number][] = [
    [2023, 7, 20, 2460145.5],
    [1990, 1, 1, 2447892.5],
    [2000, 2, 29, 2451603.5],
    [1900, 12, 31, 2415384.5],
    [1985, 2, 17, 2446113.5],
    [2010, 6, 21, 2455368.5],
    [1945, 8, 6, 2431673.5],
    [2005, 11, 15, 2453689.5],
    [1999, 4, 30, 2451298.5],
    [1980, 9, 10, 2444492.5],
  ];

  test.each(testCases)(
    'Convert date to Julian day',
    (year: number, month: Months, day: Days, expected: number) => {
      const julianDate = new JulianDay(year, month, day);
      expect(julianDate.julianDay()).toBeCloseTo(expected, 1);
    }
  );

  it('should throw an error if the day is greater than 29 for February in a leap year', () => {
    expect(() => new JulianDay(2024, 2, 30)).toThrow('Invalid day');
  });

  it('should throw an error if the day is greater than 28 for February in a non-leap year', () => {
    expect(() => new JulianDay(2023, 2, 29)).toThrow('Invalid day');
  });

  test('Invalid calendar date: negative year', () => {
    expect(() => new JulianDay(-2023, 12, 20)).toThrow('Invalid year');
  });

  test('Invalid calendar date: zero year', () => {
    expect(() => new JulianDay(0, 7, 20)).toThrow('Invalid year');
  });
});
