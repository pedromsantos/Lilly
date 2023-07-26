import { JulianDay } from '../Astronomy';

describe('JulianDate', () => {
  const testCases: [number, number, number, number, number, number][] = [
    [1995, 10, 8, 12, 0, 2450000 - 1],
    [1995, 10, 9, 4, 0, 2450000 - 8 / 24],
    [1995, 10, 9, 5, 0, 2450000 - 7 / 24],
    [1995, 10, 9, 6, 0, 2450000 - 6 / 24],
    [1995, 10, 9, 7, 0, 2450000 - 5 / 24],
    [1995, 10, 9, 8, 0, 2450000 - 4 / 24],
    [1995, 10, 9, 9, 0, 2450000 - 3 / 24],
    [1995, 10, 9, 10, 0, 2450000 - 2 / 24],
    [1995, 10, 9, 11, 0, 2450000 - 1 / 24],
    [1995, 10, 9, 12, 0, 2450000],
    [1995, 10, 9, 13, 0, 2450000 + 1 / 24],
    [1995, 10, 9, 14, 0, 2450000 + 2 / 24],
    [1995, 10, 9, 15, 0, 2450000 + 3 / 24],
    [1995, 10, 9, 16, 0, 2450000 + 4 / 24],
    [1995, 10, 9, 17, 0, 2450000 + 5 / 24],
    [1995, 10, 9, 18, 0, 2450000 + 6 / 24],
    [1995, 10, 9, 19, 0, 2450000 + 7 / 24],
    [1995, 10, 9, 20, 0, 2450000 + 8 / 24],
    [1995, 10, 9, 24, 0, 2450000 + 0.5],
    [1995, 10, 10, 12, 0, 2450000 + 1],
    [2023, 2, 23, 12, 0, 2460000 - 1],
    [2023, 2, 24, 12, 0, 2460000],
    [2023, 2, 25, 12, 0, 2460000 + 1],
  ];

  test.each(testCases)(
    'Convert date %p-%p-%pT%p:%p0 to Julian day %p',
    (year: number, month: number, day: number, hour: number, minute: number, expected: number) => {
      const isoDate = `${year.toString().padStart(4, '0')}-${month
        .toString()
        .padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hour
        .toString()
        .padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00Z`;
      const date = new Date(isoDate);

      const julianDate = new JulianDay(date);
      expect(julianDate.calculate()).toBeCloseTo(expected, 2);
    }
  );
});
