import { CustomError } from 'ts-custom-error';

type ErrorType =
  | 'INVALID_ID'
  | 'ENTITY_NOT_FOUND'
  | 'UNKNOWN_ENDPOINT'
  | 'AUTHORIZATION_FAILED'
  | 'INTERNAL_SERVER_ERROR'
  | 'NOT_FOUND'
  | 'FAILED_DELETE_ENTITY'
  | 'FORBIDDEN'
  | 'ENTITY_EXISTS_ALREADY'
  | 'LOGIN_FAILED'
  | 'CONFLICT'
  | 'INVALID_REQUEST_BODY';

export default class ResponseError extends CustomError {
  public constructor(message: string, public errorType: ErrorType) {
    super(message);
  }
}
