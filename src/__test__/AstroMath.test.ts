import { Degrees, Radians } from '../AstroMath';

describe('Degrees', () => {
  it('should convert 0 degrees to 0 radians', () => {
    const degrees = new Degrees(0);
    expect(degrees.toRadians().value).toBe(0);
  });

  it('should convert 90 degrees to π/2 radians', () => {
    const degrees = new Degrees(90);
    expect(degrees.toRadians().value).toBe(Math.PI / 2);
  });

  it('should convert 180 degrees to π radians', () => {
    const degrees = new Degrees(180);
    expect(degrees.toRadians().value).toBe(Math.PI);
  });

  it('should convert 360 degrees to 2π radians', () => {
    const degrees = new Degrees(360);
    expect(degrees.toRadians().value).toBe(0);
  });

  it('should convert decimal degrees to the correct radians', () => {
    const degrees = new Degrees(30.5);
    expect(degrees.toRadians().value).toBeCloseTo(0.532326);
  });
});

describe('Radians', () => {
  it('should convert 0 radians to 0 degrees', () => {
    const radians = new Radians(0);
    expect(radians.toDegrees().value).toBe(0);
  });

  it('should convert π/2 radians to 90 degrees', () => {
    const radians = new Radians(Math.PI / 2);
    expect(radians.toDegrees().value).toBe(90);
  });

  it('should convert π radians to 180 degrees', () => {
    const radians = new Radians(Math.PI);
    expect(radians.toDegrees().value).toBe(180);
  });

  it('should convert 2π radians to 360 degrees', () => {
    const radians = new Radians(2 * Math.PI);
    expect(radians.toDegrees().value).toBe(0);
  });

  it('should convert negative radians to negative degrees', () => {
    const radians = new Radians(-Math.PI / 4);
    expect(radians.toDegrees().value).toBe(315);
  });

  it('should convert decimal radians to the correct degrees', () => {
    const radians = new Radians(0.532326);
    expect(radians.toDegrees().value).toBeCloseTo(30.5);
  });
});
