import {exec} from 'child_process';
import minimist from 'minimist';
import chalk from 'chalk';
import {TscWatchClient} from 'tsc-watch/client.js';

console.log(`-------------------------\n     ${ chalk.whiteBright('YourDash CLI v0.0.1') }     \n-------------------------`);

// eslint-disable-next-line no-magic-numbers
const args = minimist(process.argv.slice(2));

console.log(`Starting with arguments: ${ JSON.stringify(args) }`);

if (!args.dev && args.compile) {
  const childProcess = exec('yarn run compile');

  childProcess.stdout.on('data', (data: string) => {
    if (data.toString() === '$ tsc\n') {
      return;
    }
    if (data.toString() === '\x1Bc') {
      return;
    }
    if (data.toString() === '') {
      return;
    }

    console.log(`[${ chalk.bold.blue('TSC') }]: ${ data.toString().replaceAll('\n', '').replaceAll('\x1Bc', '') }`);
  });

  childProcess.stderr.on('data', data => {
    if (data.toString() === '$ tsc\n') {
      return;
    }
    if (data.toString() === '\x1Bc') {
      return;
    }
    if (data.toString() === '') {
      return;
    }
    console.log(`[${ chalk.bold.blue('TSC ERROR') }]: ${ data.toString().replaceAll('\n', '').replaceAll(
      '\x1Bc',
      ''
    ) }`);
  });

  process.on('exit', code => {
    console.log(`${ chalk.yellow.bold('CORE') }: Server about to exit!`);

    if (childProcess && !childProcess.killed) {
      console.log(`${ chalk.yellow.bold('CORE') }: Killing child process [ ${ childProcess.pid } ] (${ chalk.bold.blue(
        'TSC') })`);
      childProcess.kill();
    }
  });
}

function startDevServer() {
  console.log(`[${ chalk.hex('#fc6f45').bold('DEV') }]: starting server \"node ./src/main.js --color=full ${ process.argv.slice(
    2).join(' ') }\"`);

  const childProcess = exec(`npx tsc-watch --project . --onSuccess \"node${ args.debug
    ? ' --inspect'
    : '' } ./src/main.js --color=full ${ process.argv.slice(2).join(' ') }\"`, {killSignal: 'SIGINT'});

  const watch = new TscWatchClient();

  watch.start([`--onSuccess \"node ./src/main.js --color=full ${ process.argv.slice(2).join(' ') }\"`]);
}

if (args.dev) {
  startDevServer();
} else {
  await import('./main.js');
}
