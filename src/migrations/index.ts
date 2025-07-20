import * as migration_20250208_135046 from './20250208_135046';
import * as migration_20250330_223430 from './20250330_223430';
import * as migration_20250720_232026 from './20250720_232026';

export const migrations = [
  {
    up: migration_20250208_135046.up,
    down: migration_20250208_135046.down,
    name: '20250208_135046'
  },
  {
    up: migration_20250330_223430.up,
    down: migration_20250330_223430.down,
    name: '20250330_223430'
  },
  {
    up: migration_20250720_232026.up,
    down: migration_20250720_232026.down,
    name: '20250720_232026'
  }
];
