export class BadRequestException extends Error {
  private readonly _statusCode: number = 400;
  private readonly _errorCode: string;
  private readonly _field: string | null;
  private readonly _validationErrors: string[];

  constructor(message: string, field?: string, validationErrors?: string[]) {
    super(message);
    this.name = 'BadRequestException';
    this._errorCode = 'BAD_REQUEST';
    this._field = field ?? null;
    this._validationErrors = validationErrors ?? [];
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestException);
    }
  }

  static invalidPrice(price: number): BadRequestException {
    return new BadRequestException(
      `El precio no puede ser negativo. Valor proporcionado: ${price}`,
      'price',
      [`El precio debe ser mayor o igual a 0. Valor actual: ${price}`]
    );
  }

  static invalidStock(stock: number): BadRequestException {
    return new BadRequestException(
      `El stock no puede ser negativo. Valor proporcionado: ${stock}`,
      'stock',
      [`El stock debe ser mayor o igual a 0. Valor actual: ${stock}`]
    );
  }

  static missingRequiredField(fieldName: string): BadRequestException {
    return new BadRequestException(
      `El campo '${fieldName}' es requerido`,
      fieldName,
      [`El campo '${fieldName}' no puede estar vacío o indefinido`]
    );
  }

  static invalidFieldFormat(fieldName: string, expectedFormat: string): BadRequestException {
    return new BadRequestException(
      `El campo '${fieldName}' tiene un formato inválido. Se esperaba: ${expectedFormat}`,
      fieldName,
      [`El valor proporcionado para '${fieldName}' no coincide con el formato esperado: ${expectedFormat}`]
    );
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get errorCode(): string {
    return this._errorCode;
  }

  get field(): string | null {
    return this._field;
  }

  get validationErrors(): string[] {
    return [...this._validationErrors];
  }

  getStatus(): number {
    return this._statusCode;
  }

  getErrorCode(): string {
    return this._errorCode;
  }

  getField(): string | null {
    return this._field;
  }

  getValidationErrors(): string[] {
    return [...this._validationErrors];
  }

  toJSON(): Record<string, unknown> {
    const response: Record<string, unknown> = {
      error: this.name,
      message: this.message,
      statusCode: this._statusCode,
      errorCode: this._errorCode,
      timestamp: new Date().toISOString()
    };

    if (this._field) {
      response.field = this._field;
    }

    if (this._validationErrors.length > 0) {
      response.validationErrors = this._validationErrors;
    }

    return response;
  }

  toString(): string {
    return JSON.stringify(this.toJSON(), null, 2);
  }
}