import * as migration_20250208_135046 from './20250208_135046';

export const migrations = [
  {
    up: migration_20250208_135046.up,
    down: migration_20250208_135046.down,
    name: '20250208_135046'
  }
];
