import fs from 'node:fs';
import { homedir } from 'node:os';
import { spawn } from 'child_process';
import { qsvPath } from './utils';

export const getRootDir = () => {
  const FOLDER_NAME = 'csv-files';
  return `${homedir()}/${FOLDER_NAME}`;
};

export const getCsvFiles = (name: string, path: string) => {
  // const shellSyntaxCommand = 'ls -l';
  // const csvCommand = `count ${getRootDir()}/accounts.csv`;
  // console.log({ csvCommand });
  // const script = spawn('sh', ['-c', shellSyntaxCommand]);

  const rootDir = getRootDir();

  if (!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir);
  }

  const newFileName = `${new Date().getDate()}${name}`;
  const qsv = spawn(qsvPath, [
    'cat',
    'rows',
    path,
    '-o',
    `${getRootDir()}/${newFileName}`,
  ]);
  // const qsv = spawn(qsvPath, [
  //   'cat',
  //   'rows',
  //   `${getRootDir()}/accounts.csv`,
  //   // '-o',
  //   // `${getRootDir()}/accounts-result.csv`,
  // ]);
  // const qsv = spawn(qsvPath, ['count', `${getRootDir()}/accounts.csv`]);

  console.log(`PID: ${qsv.pid}`);

  qsv.stdout?.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  qsv.stderr?.on('data', (err) => {
    console.log(`stderr: ${err}`);
  });

  qsv?.on('exit', (code) => {
    console.log(`Exit Code: ${code}`);
  });
};
