import * as migration_20250125_115633 from './20250125_115633';

export const migrations = [
  {
    up: migration_20250125_115633.up,
    down: migration_20250125_115633.down,
    name: '20250125_115633'
  }
];
