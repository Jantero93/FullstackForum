/* eslint-disable no-console */
import colors from 'colors';

const NODE_ENV_IS_TEST = process.env.NODE_ENV === 'test';

export const info = (...params: unknown[]): void => {
  !NODE_ENV_IS_TEST && console.log(...params);
};

export const error = (...params: unknown[]): void => {
  !NODE_ENV_IS_TEST && console.log(`${colors.red('Error:')}`, ...params);
};

export const printStack = (layer: string, funcName: string): void => {
  if (!NODE_ENV_IS_TEST) {
    console.log(`Layer: ${colors.green(layer)}`);
    console.log(`Function: ${colors.yellow(funcName)}`);
    console.log(`---`);
  }
};

export const responseDB = (...params: unknown[]): void => {
  if (!NODE_ENV_IS_TEST) {
    console.log(`Response from DB:`);
    console.log(...params);
    console.log('---');
  }
};

export default { info, error, printStack, responseDB };
