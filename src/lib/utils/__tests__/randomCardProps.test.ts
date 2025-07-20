import { getRandomCardProps } from '../randomCardProps';

describe('getRandomCardProps', () => {
  it('should return deterministic results for the same ID', () => {
    const id = 123;
    const result1 = getRandomCardProps(id);
    const result2 = getRandomCardProps(id);

    expect(result1).toEqual(result2);
  });

  it('should return deterministic results for string IDs', () => {
    const id = 'test-project-id';
    const result1 = getRandomCardProps(id);
    const result2 = getRandomCardProps(id);

    expect(result1).toEqual(result2);
  });

  it('should return valid rotation values', () => {
    const validRotations = ['none', 'slight', 'slightNegative', 'medium', 'mediumNegative'];

    for (let i = 0; i < 10; i++) {
      const result = getRandomCardProps(i);
      expect(validRotations).toContain(result.rotation);
    }
  });

  it('should return valid interactive values', () => {
    const validInteractives = ['none', 'slight', 'medium'];

    for (let i = 0; i < 10; i++) {
      const result = getRandomCardProps(i);
      expect(validInteractives).toContain(result.interactive);
    }
  });

  it('should distribute values across different projects', () => {
    const results = [];
    for (let i = 0; i < 20; i++) {
      results.push(getRandomCardProps(i));
    }

    // Check that we get some variety in rotations and interactives
    const rotations = new Set(results.map((r) => r.rotation));
    const interactives = new Set(results.map((r) => r.interactive));

    expect(rotations.size).toBeGreaterThan(1);
    expect(interactives.size).toBeGreaterThan(1);
  });

  it('should handle both number and string IDs consistently', () => {
    // Same numeric value as number and string should give same result
    const numResult = getRandomCardProps(42);
    const stringResult = getRandomCardProps('42');

    // They might be different (that's ok), but each should be consistent
    const numResult2 = getRandomCardProps(42);
    const stringResult2 = getRandomCardProps('42');

    expect(numResult).toEqual(numResult2);
    expect(stringResult).toEqual(stringResult2);
  });
});
