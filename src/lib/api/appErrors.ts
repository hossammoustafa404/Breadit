import { StatusCodes } from "http-status-codes";

// Base Error Class
export class AppError extends Error {
  statusText: string;
  isOperational: boolean;
  constructor(public message: string, public status: number) {
    super(message);
    this.status = status;
    this.statusText = `${this.status}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Bad Request Error
export class BadRequestError extends AppError {
  constructor(public message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

// Conflict Error
export class ConflictError extends AppError {
  constructor(public message: string) {
    super(message, StatusCodes.CONFLICT);
  }
}

// UnAuthorized Error
export class UnAuthorizedError extends AppError {
  constructor(public message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}
