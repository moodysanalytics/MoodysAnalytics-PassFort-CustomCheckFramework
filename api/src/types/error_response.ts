export enum CheckErrorTypes {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  INVALID_CONFIG = 'INVALID_CONFIG',
  INVALID_CHECK_INPUT = 'INVALID_CHECK_INPUT',
  MISSING_CHECK_INPUT = 'MISSING_CHECK_INPUT',
  INVALID_CHECK_RESPONSE = 'INVALID_CHECK_RESPONSE',
  UNSUPPORTED_COUNTRY = 'UNSUPPORTED_COUNTRY',
  PROVIDER_CONNECTION = 'PROVIDER_CONNECTION',
  PROVIDER_MESSAGE = 'PROVIDER_MESSAGE',
  UNSUPPORTED_DEMO_RESULT = 'UNSUPPORTED_DEMO_RESULT',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  HTTP_ERROR = 'HTTP_ERROR',
  SIGNATURE_ERROR = 'SIGNATURE_ERROR',
  MISSING_QUERY_PARAMS = 'MISSING_QUERY_PARAMS',
}

export class IntegrationError {
  type: CheckErrorTypes;
  subType?: string;
  message: string;
  data?: object;
}

export class ErrorResponse {
  public errors: Array<IntegrationError>;
  public warnings: Array<string>;
  public providerData: Error;
  public result?: any;

  constructor(
    errors: Array<IntegrationError>,
    warnings?: Array<any>,
    providerData?: Error,
    result?: any,
  ) {
    this.errors = errors;
    this.warnings = warnings;
    this.providerData = providerData;
    this.result = result;

    if (providerData instanceof Error) {
      this.providerData = Object.assign(
        {
          message: providerData.message,
          stack: providerData.stack,
        },
        providerData,
      );
    }
  }
}
