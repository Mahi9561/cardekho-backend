export class ClientInputError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.status = 400;
    // keep the message passed in, set the error name for identification
    this.name = "ClientInputError";
  }
}

export default ClientInputError;