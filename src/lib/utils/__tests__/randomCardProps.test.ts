import { getRandomCardProps } from '../randomCardProps';

describe('getRandomCardProps', () => {
  it('returns the same result for the same ID (number and string)', () => {
    const idNumber = 123;
    const idString = 'test-project-id';

    expect(getRandomCardProps(idNumber)).toEqual(getRandomCardProps(idNumber));
    expect(getRandomCardProps(idString)).toEqual(getRandomCardProps(idString));
  });

  it('returns only valid rotation and interactive values', () => {
    const validRotations = ['none', 'slight', 'slightNegative', 'medium', 'mediumNegative'];
    const validInteractives = ['none', 'slight', 'medium'];

    for (let i = 0; i < 10; i++) {
      const { rotation, interactive } = getRandomCardProps(i);
      expect(validRotations).toContain(rotation);
      expect(validInteractives).toContain(interactive);
    }
  });
});
