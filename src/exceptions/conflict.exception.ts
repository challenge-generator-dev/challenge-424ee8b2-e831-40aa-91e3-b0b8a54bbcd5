export class ConflictException extends Error {
  private readonly _statusCode: number = 409;
  private readonly _errorCode: string;
  private readonly _conflictingField: string;
  private readonly _conflictingValue: string | number;
  private readonly _resourceType: string;

  constructor(
    message: string,
    conflictingField: string,
    conflictingValue: string | number,
    resourceType: string = 'recurso'
  ) {
    super(message);
    this.name = 'ConflictException';
    this._errorCode = 'CONFLICT';
    this._conflictingField = conflictingField;
    this._conflictingValue = conflictingValue;
    this._resourceType = resourceType;
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConflictException);
    }
  }

  static duplicateName(name: string, resourceType: string = 'Producto'): ConflictException {
    return new ConflictException(
      `Ya existe un ${resourceType.toLowerCase()} con el nombre '${name}'`,
      'name',
      name,
      resourceType
    );
  }

  static duplicateCategory(category: string): ConflictException {
    return new ConflictException(
      `La categoría '${category}' ya existe en el sistema`,
      'category',
      category,
      'Categoría'
    );
  }

  static duplicateEmail(email: string): ConflictException {
    return new ConflictException(
      `El correo electrónico '${email}' ya está registrado`,
      'email',
      email,
      'Usuario'
    );
  }

  static resourceInUse(resourceType: string, identifier: number | string): ConflictException {
    return new ConflictException(
      `El ${resourceType.toLowerCase()} con ID '${identifier}' está siendo utilizado por otros recursos`,
      'id',
      identifier,
      resourceType
    );
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get errorCode(): string {
    return this._errorCode;
  }

  get conflictingField(): string {
    return this._conflictingField;
  }

  get conflictingValue(): string | number {
    return this._conflictingValue;
  }

  get resourceType(): string {
    return this._resourceType;
  }

  getStatus(): number {
    return this._statusCode;
  }

  getErrorCode(): string {
    return this._errorCode;
  }

  getConflictingField(): string {
    return this._conflictingField;
  }

  getConflictingValue(): string | number {
    return this._conflictingValue;
  }

  getResourceType(): string {
    return this._resourceType;
  }

  toJSON(): Record<string, unknown> {
    return {
      error: this.name,
      message: this.message,
      statusCode: this._statusCode,
      errorCode: this._errorCode,
      conflictingField: this._conflictingField,
      conflictingValue: this._conflictingValue,
      resourceType: this._resourceType,
      timestamp: new Date().toISOString()
    };
  }

  toString(): string {
    return JSON.stringify(this.toJSON(), null, 2);
  }
}