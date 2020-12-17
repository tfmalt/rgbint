/**
 * Demonstration object that stores a RGBA value in a 32 bit unsigned integer.
 *   - demonstrats bit shifting and boolean operations to fetch the correct
 *     byte for each color
 *   - demonstrates converting number to string and web/hex/css syntax
 *
 * @copyright (c) 2020 Thomas Malt <thomas@malt.no>
 * @author Thomas Malt <thomas@malt.no>
 * @license MIT
 */
export default class RGBInt {
  #value: number;

  constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 0) {
    this.#value = 0;

    if (arguments.length === 1) {
      this.value = r;
    }

    if (arguments.length > 1) {
      this.setValue(r, g, b, a);
    }
  }

  get value(): number {
    return this.#value;
  }

  set value(v: number) {
    if (!Number.isInteger(v)) {
      throw new TypeError(
        'Argument to constructor must be an unsigned integer. got: ' + v,
      );
    }
    if (v < 0 || v > 0xffffffff) {
      throw new RangeError('Input must be a 32bit unsigned integer');
    }

    this.#value = v;
  }

  get r(): number {
    return (this.#value & 0xff0000) >> 16;
  }

  get g(): number {
    return (this.#value & 0x00ff00) >> 8;
  }

  get b(): number {
    return this.value & 0xff;
  }

  get a(): number {
    return (this.value & 0xff000000) >>> 24;
  }

  set r(_r: number) {
    this.setValue(_r, this.g, this.b, this.a);
  }

  set g(_g: number) {
    this.setValue(this.r, _g, this.b, this.a);
  }

  set b(_b: number) {
    this.setValue(this.r, this.g, _b, this.a);
  }

  set a(_a: number) {
    this.setValue(this.r, this.g, this.b, _a);
  }

  public toInteger() {
    return this.#value;
  }

  public toString(r: number = 16) {
    return this.value.toString(r);
  }

  public toHex() {
    return `#${this.value.toString(16)}`;
  }

  public toRGB() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
  public toRGBA() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  private setValue(
    r: number = 0,
    g: number = 0,
    b: number = 0,
    a: number = 0,
  ): void {
    if (
      !Number.isInteger(r) ||
      !Number.isInteger(g) ||
      !Number.isInteger(b) ||
      !Number.isInteger(a)
    ) {
      throw new TypeError(
        'Arguments to constructor must be an unsigned integer',
      );
    }

    if (
      r < 0 ||
      r > 255 ||
      g < 0 ||
      g > 255 ||
      b < 0 ||
      b > 255 ||
      a < 0 ||
      a > 255
    ) {
      throw new RangeError('Arguments must be color values between 0 and 255');
    }

    this.#value = ((a << 24) + (r << 16) + (g << 8) + b) >>> 0;
  }
}
