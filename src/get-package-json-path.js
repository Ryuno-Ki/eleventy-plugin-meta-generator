import { join } from 'path';

export function getPackageJsonPath () {
  return Promise.resolve(join(process.cwd(), 'package.json'));
}
