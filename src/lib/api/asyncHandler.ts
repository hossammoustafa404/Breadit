import errorHandler from "./errorHandler";

const asyncHandler =
  (handler: any) =>
  async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (err) {
      return errorHandler(err);
    }
  };

export default asyncHandler;
