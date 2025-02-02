import * as migration_20250125_115633 from './20250125_115633';
import * as migration_20250202_104527 from './20250202_104527';
import * as migration_20250202_112345 from './20250202_112345';
import * as migration_20250202_115404 from './20250202_115404';

export const migrations = [
  {
    up: migration_20250125_115633.up,
    down: migration_20250125_115633.down,
    name: '20250125_115633'
  },
  {
    up: migration_20250202_104527.up,
    down: migration_20250202_104527.down,
    name: '20250202_104527'
  },
  {
    up: migration_20250202_112345.up,
    down: migration_20250202_112345.down,
    name: '20250202_112345'
  },
  {
    up: migration_20250202_115404.up,
    down: migration_20250202_115404.down,
    name: '20250202_115404'
  }
];
