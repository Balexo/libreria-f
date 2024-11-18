export class CustomError extends Error {
  type: string;
  constructor(type: "error" | "success", message: string) {
    super(message);
    this.type = type;
  }
}
