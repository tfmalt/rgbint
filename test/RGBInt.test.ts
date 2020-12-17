import RGBInt from '../src/RGBInt';

describe('object creation and initialisation', () => {
  const rgb = new RGBInt(0xffaa8844);
  it('should be instance of RGBInt', () => {
    expect(rgb).toBeInstanceOf(RGBInt);
  });

  it('RGB values should be correct', () => {
    expect(rgb.r).toEqual(0xaa);
    expect(rgb.g).toEqual(0x88);
    expect(rgb.b).toEqual(0x44);
    expect(rgb.a).toEqual(0xff);
  });

  it('RGB values should not be falsely correct', () => {
    expect(rgb.r).not.toEqual(0xff);
    expect(rgb.g).not.toEqual(0xff);
    expect(rgb.b).not.toEqual(0xff);
  });

  it('all bits set should work correctly', () => {
    const c = new RGBInt(0xffffffff);
    expect(c).toBeInstanceOf(RGBInt);
    expect(c.r).toEqual(255);
    expect(c.g).toEqual(255);
    expect(c.b).toEqual(255);
    expect(c.a).toEqual(255);
  });
});

describe('can create object from r, g, b values separately', () => {
  const rgb = new RGBInt(255, 128, 40);
  it('should be instance of RGBInt', () => {
    expect(rgb).toBeInstanceOf(RGBInt);
  });
  it('RGB values should be correct', () => {
    expect(rgb.r).toEqual(255);
    expect(rgb.g).toEqual(128);
    expect(rgb.b).toEqual(40);
    expect(rgb.a).toEqual(0);
  });
});

describe('set rgb values after instansiation', () => {
  const rgb = new RGBInt();
  it('should be instance of RGBInt', () => {
    expect(rgb).toBeInstanceOf(RGBInt);
  });

  rgb.r = 255;
  rgb.g = 128;
  rgb.b = 40;
  rgb.a = 160;

  it('RGB values should be correct', () => {
    expect(rgb.r).toEqual(255);
    expect(rgb.g).toEqual(128);
    expect(rgb.b).toEqual(40);
    expect(rgb.a).toEqual(160);
  });
});

describe('verify error conditions', () => {
  it('should throw when color is negative', () => {
    expect(() => new RGBInt(-100)).toThrowError();
  });

  it('should throw when color is a float', () => {
    expect(() => new RGBInt(128.3)).toThrowError();
  });

  it('should throw when color is a string', () => {
    // @ts-ignore
    expect(() => new RGBInt('128')).toThrowError();
  });

  it('should throw when color is larger than 32bit', () => {
    expect(() => new RGBInt(0xfffffffff)).toThrowError();
  });

  it('should throw when colors get illegal values', () => {
    expect(() => new RGBInt(300, 128, 40, 0)).toThrowError();
    expect(() => new RGBInt(0, 300, 128, 40)).toThrowError();
    expect(() => new RGBInt(0, 0, 300, 128)).toThrowError();
    expect(() => new RGBInt(0, 0, 0, 300)).toThrowError();
    expect(() => new RGBInt(-1, 128, 40, 0)).toThrowError();
    expect(() => new RGBInt(0, -1, 128, 40)).toThrowError();
    expect(() => new RGBInt(0, 0, -1, 128)).toThrowError();
    expect(() => new RGBInt(0, 0, 0, -1)).toThrowError();
    expect(() => new RGBInt(128.3, 0, 0, -1)).toThrowError();
  });
});

describe('verify functions work', () => {
  const rgb = new RGBInt(0x7cfc00);
  it('value is correct', () => {
    expect(rgb.value).toEqual(0x7cfc00);
    expect(rgb.r).toEqual(0x7c);
  });
  it('toInteger() is correct', () => {
    expect(rgb.toInteger()).toEqual(0x7cfc00);
  });
  it('toString() is correct', () => {
    expect(rgb.toString()).toEqual('7cfc00');
    expect(rgb.toString(2)).toEqual('11111001111110000000000');
  });
  it('toHex() is correct', () => {
    expect(rgb.toHex()).toEqual('#7cfc00');
  });
  it('toRGB() is correct', () => {
    expect(rgb.toRGB()).toEqual('rgb(124, 252, 0)');
  });
  it('toRGBA() is correct', () => {
    expect(rgb.toRGBA()).toEqual('rgba(124, 252, 0, 0)');
  });
});
