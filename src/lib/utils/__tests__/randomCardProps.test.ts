import { getRandomCardProps } from '../randomCardProps';

describe('getRandomCardProps', () => {
  it('returns the same result for the same ID (number and string)', () => {
    const idNumber = 123;
    const idString = 'test-project-id';

    expect(getRandomCardProps(idNumber)).toEqual(getRandomCardProps(idNumber));
    expect(getRandomCardProps(idString)).toEqual(getRandomCardProps(idString));
  });

});
