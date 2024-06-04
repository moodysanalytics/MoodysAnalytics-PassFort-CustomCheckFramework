import { CheckErrorTypes } from './error_response.types.js';

export class AppException extends Error {
  constructor(
    message: string,
    readonly passfortErrorCode: CheckErrorTypes,
    readonly statusCode: number = 200,
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
    super(message, CheckErrorTypes.PROVIDER_MESSAGE, 404);
  }
}

export class ValidationException extends AppException {
  constructor(message: string, passfortErrorCode: CheckErrorTypes) {
    super(message, passfortErrorCode);
  }
}

export class UnauthorizedAppException extends AppException {
  constructor(message: string) {
    super(message, CheckErrorTypes.SIGNATURE_ERROR, 404);
  }
}

export class ForbiddenAppException extends AppException {
  constructor() {
    super('Forbidden exception.', CheckErrorTypes.SIGNATURE_ERROR, 401);
  }
}

export class BadRequestAppException extends AppException {
  constructor(message: string) {
    super(message, CheckErrorTypes.SIGNATURE_ERROR, 400);
  }
}

export class UnknownAppException extends AppException {
  constructor(message: string) {
    super('Unknown error occurred. Here is Error message :' + message, CheckErrorTypes.UNKNOWN_ERROR, 200);
  }
}

export class HttpAppException extends AppException {
  constructor(message: string) {
    super('Http error occured, here is error message :' + message, CheckErrorTypes.PROVIDER_CONNECTION, 200);
  }
}