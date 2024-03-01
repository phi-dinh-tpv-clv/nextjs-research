import { Error } from "./error";

export class ApiReponse {
  errors: Error[];
  data: any;
  status: number;

  constructor() {
    this.data = null;
    this.errors = [new Error()];
    this.status = 200;
  }
}
