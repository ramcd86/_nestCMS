import * as fs from 'fs';
import * as util from 'util';

export const STATUS_OK = "STATUS_OK";
export const STATUS_FAILED = "STATUS_FAILED";

export const Log = (error: string) => {
  const logFile = fs.createWriteStream('./logs/failures.log');
  const stdout = process.stdout;
  logFile.write(new Date() + ' : ' + util.format(error) + '\n');
  stdout.write(new Date() + ' : ' + util.format(error) + '\n');
};
