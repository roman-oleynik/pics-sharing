import {generateId} from '../modules/generateId';

describe("genereteIdTests", () => {

  it('test of calling generateId without argument', () => {
    expect(generateId().length).toBe(24);
  });

  it('test of calling generateId with argument', () => {
    const id = "12345678";
    expect(generateId(id)).toBe(id);
  });

})