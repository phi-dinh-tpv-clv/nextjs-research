export class Error {
  message: string;
  errors?: string | string[];
  code?: string;
  statusCode?: number | null;
  error?: string;

  constructor() {
    this.message = "";
    this.code = "";
    this.errors = [];
    this.statusCode = null;
    this.error = "";
  }
}
