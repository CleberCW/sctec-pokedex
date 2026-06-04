import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'process';

import { menuController } from './controllers/controllr.js';

async function main() {
  let running = true;
  const interfaceConsole = createInterface(stdin, stdout);

  while (running) {
    running = await menuController(interfaceConsole);
  }

  interfaceConsole.close();
}

await main();
