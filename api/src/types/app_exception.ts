import { HttpStatus } from '@nestjs/common';
import { CheckErrorTypes } from './error_response';

export class AppException extends Error {
  constructor(
    message: string,
    readonly passfortErrorCode: CheckErrorTypes,
    readonly statusCode: HttpStatus = HttpStatus.OK,
  ) {
    super(message);
  }
}

export class ProviderConnectionError extends AppException {
  constructor() {
    super(
      'Could not connect to External API.',
      CheckErrorTypes.PROVIDER_CONNECTION,
    );
  }
}

export class UnsupportedDemoResult extends AppException {
  constructor() {
    super(
      'Demo result is not supported.',
      CheckErrorTypes.UNSUPPORTED_DEMO_RESULT,
    );
  }
}

export class ProviderError extends AppException {
  constructor(message: string) {
    super(message, CheckErrorTypes.PROVIDER_MESSAGE);
  }
}

export class InvalidCredentials extends AppException {
  constructor() {
    super(
      'External API credentials are invalid.',
      CheckErrorTypes.INVALID_CREDENTIALS,
    );
  }
}

export class InvalidResponse extends AppException {
  constructor() {
    super('Invalid check response.', CheckErrorTypes.INVALID_CHECK_RESPONSE);
  }
}

export class ResultNotFoundError extends AppException {
  constructor(message: string) {
    super(message, CheckErrorTypes.PROVIDER_MESSAGE, HttpStatus.NOT_FOUND);
  }
}

export class ValidationException extends AppException {
  constructor(message: string, passfortErrorCode: CheckErrorTypes) {
    super(message, passfortErrorCode);
  }
}
