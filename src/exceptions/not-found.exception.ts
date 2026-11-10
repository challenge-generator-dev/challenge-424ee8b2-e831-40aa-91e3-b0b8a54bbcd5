export class NotFoundException extends Error {
  private readonly _statusCode: number = 404;
  private readonly _errorCode: string;
  private readonly _resourceType: string;
  private readonly _resourceIdentifier: string | number;

  constructor(resourceType: string, identifier: string | number, message?: string) {
    const defaultMessage = message || `El recurso '${resourceType}' con identificador '${identifier}' no fue encontrado`;
    super(defaultMessage);
    this.name = 'NotFoundException';
    this._errorCode = 'RESOURCE_NOT_FOUND';
    this._resourceType = resourceType;
    this._resourceIdentifier = identifier;
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundException);
    }
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get errorCode(): string {
    return this._errorCode;
  }

  get resourceType(): string {
    return this._resourceType;
  }

  get resourceIdentifier(): string | number {
    return this._resourceIdentifier;
  }

  getStatus(): number {
    return this._statusCode;
  }

  getErrorCode(): string {
    return this._errorCode;
  }

  toJSON(): object {
    return {
      error: this.name,
      message: this.message,
      statusCode: this._statusCode,
      errorCode: this._errorCode,
      resourceType: this._resourceType,
      identifier: this._resourceIdentifier,
      timestamp: new Date().toISOString()
    };
  }

  toString(): string {
    return JSON.stringify(this.toJSON(), null, 2);
  }
}