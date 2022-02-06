import { CustomError } from 'ts-custom-error';

type ErrorType =
  | 'INVALID_ID'
  | 'ENTITY_NOT_FOUND'
  | 'UNKNOWN_ENDPOINT'
  | 'AUTHORIZATION_FAILED'
  | 'INTERNAL_SERVER_ERROR'
  | 'NOT_FOUND';

export default class ResponseError extends CustomError {
  public constructor(
    message: string,
    public statusCode: number,
    public errorType: ErrorType
  ) {
    super(message);
  }
}
