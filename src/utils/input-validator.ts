import Schema from "validate";

class ClientInputError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.status = 400;
    // keep the passed message, set the error name for identification
    this.name = "ClientInputError";
  }
}

export const validateWithSchema = (schema: Schema, payload: any) => {
  const errors = schema.validate(payload, { strict: true });
  if (errors.length) {
    const missingParams = errors.map((error: any) => error.message);
    throw new ClientInputError(`${missingParams.join(", ")}`);
  }
};
