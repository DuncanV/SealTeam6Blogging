import { logUsers } from "../middleware/logger";

export class UserError extends Error {

    constructor(messsage: any, status: any, method:any) {
      super()
      logUsers(messsage, status, method);
      throw new Error(messsage);
    }
}

