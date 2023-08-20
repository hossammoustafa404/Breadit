import { NextResponse } from "next/server";

const errorHandler = (err: any) => {
  // Need to handle mongodb errors
  const errObj = {
    status: err.status || 500,
    statusText: err.statusText || "error",
    message: err.message || "Something went wrong",
    stack: err.stack,
  };

  if (process.env.NODE_ENV === "development") {
    return NextResponse.json(
      {
        statusText: errObj.statusText,
        message: err.message,
        stack: errObj.stack,
      },
      { status: errObj.status }
    );
  } else if (process.env.NODE_ENV === "production") {
    if (!err?.isOperational) {
      return NextResponse.json(
        { statusText: "error", message: "Something Went Wrong" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { statusText: errObj.statusText, message: err.message },
      { status: errObj.status }
    );
  }
};

export default errorHandler;
